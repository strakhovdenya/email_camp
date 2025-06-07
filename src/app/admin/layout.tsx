import Link from 'next/link';
import Button from '@mui/material/Button';

const navItems = [
  {
    href: '/admin/users',
    label: 'Пользователи',
    icon: '👥',
  },
  {
    href: '/admin/rooms',
    label: 'Комнаты',
    icon: '🏠',
  },
  {
    href: '/admin/letters',
    label: 'Письма',
    icon: '✉️',
  },
];

function AdminNav() {
  // usePathname нельзя использовать в серверном компоненте, поэтому делаем простую проверку через window.location (SSR-safe fallback)
  let pathname = '';
  if (typeof window !== 'undefined') {
    pathname = window.location.pathname;
  }
  return (
    <nav className="flex flex-wrap gap-2 sm:gap-3 mb-8">
      {navItems.map((item) => {
        const isActive = typeof window !== 'undefined' ? pathname.startsWith(item.href) : false;
        return (
          <Link key={item.href} href={item.href} passHref legacyBehavior>
            <Button
              component="a"
              variant={isActive ? 'contained' : 'outlined'}
              color={isActive ? 'primary' : 'primary'}
              size="small"
              sx={{
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: isActive ? 2 : undefined,
                textTransform: 'none',
                px: 1.5,
                py: 0.5,
                minHeight: 32,
                minWidth: 0,
                bgcolor: isActive ? 'primary.main' : 'white',
                color: isActive ? 'white' : 'primary.main',
                borderColor: isActive ? 'primary.main' : 'grey.300',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'grey.100',
                  borderColor: 'primary.main',
                },
                gap: 1,
                fontSize: '0.98rem',
              }}
              disableElevation
              startIcon={<span style={{ fontSize: '1.1em' }}>{item.icon}</span>}
            >
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="mx-auto max-w-5xl px-2 sm:px-6 py-8">
        <div className="rounded-3xl bg-white/70 backdrop-blur-lg shadow-2xl p-4 sm:p-8">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          <AdminNav />
          {children}
        </div>
      </div>
    </div>
  );
}
