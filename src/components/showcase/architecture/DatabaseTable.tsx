import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface DatabaseColumn {
  name: string;
  type: string;
  key?: boolean;
  foreign?: boolean;
}

interface DatabaseTableProps {
  name: string;
  columns: DatabaseColumn[];
  color: string;
}

export function DatabaseTable({ name, columns, color }: DatabaseTableProps) {
  return (
    <Card
      sx={{
        minWidth: 0,
        width: '100%',
        maxWidth: '100%',
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        border: `2px solid ${color}30`,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: { xs: '4px', md: 2 } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: { xs: '4px', md: 1 },
            color,
            fontSize: { xs: '0.85rem', md: '1.25rem' },
            wordBreak: 'break-word',
          }}
        >
          {name}
        </Typography>
        {columns.map((column, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: { xs: '2px', md: 1 },
              flexWrap: 'nowrap',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: column.key ? 700 : 400,
                color: column.key
                  ? 'primary.main'
                  : column.foreign
                    ? 'secondary.main'
                    : 'text.primary',
                fontSize: { xs: '0.7rem', md: '0.875rem' },
                minWidth: 0,
                flex: 1,
                mr: { xs: '2px', md: 1 },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {column.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.65rem', md: '0.75rem' },
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {column.type}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
