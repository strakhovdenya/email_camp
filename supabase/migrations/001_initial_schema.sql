-- Create rooms table first (because letters will reference it)
CREATE TABLE rooms (
    id BIGSERIAL PRIMARY KEY,
    room_number TEXT NOT NULL UNIQUE,
    telegram_chat_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create letters table with foreign key
CREATE TABLE letters (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'delivered')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    delivered_at TIMESTAMPTZ,
    sync_status TEXT NOT NULL DEFAULT 'pending' CHECK (sync_status IN ('pending', 'synced', 'failed')),
    barcode_id TEXT NOT NULL UNIQUE,
    recipient_notified BOOLEAN NOT NULL DEFAULT false
);

-- Create indexes for faster lookups
CREATE INDEX idx_letters_room_id ON letters(room_id);
CREATE INDEX idx_letters_status ON letters(status);
CREATE INDEX idx_letters_sync_status ON letters(sync_status);
CREATE INDEX idx_rooms_room_number ON rooms(room_number);

-- Enable Row Level Security
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON letters FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON letters FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON letters FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON rooms FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON rooms FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON rooms FOR UPDATE USING (auth.role() = 'authenticated');

-- Create view for letters with room information
CREATE VIEW letters_with_rooms AS
SELECT 
    l.*,
    r.room_number,
    r.telegram_chat_id
FROM letters l
JOIN rooms r ON l.room_id = r.id; 