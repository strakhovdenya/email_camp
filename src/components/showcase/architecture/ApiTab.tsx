import React from 'react';
import { Typography, Box, Card, Paper, Chip } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
}

const apiEndpoints: ApiEndpoint[] = [
  { method: 'GET', path: '/api/letters', description: 'Получить список писем' },
  { method: 'POST', path: '/api/letters', description: 'Добавить новое письмо' },
  { method: 'POST', path: '/api/letters/deliver', description: 'Отметить письмо как выданное' },
  { method: 'GET', path: '/api/rooms', description: 'Получить список комнат' },
  {
    method: 'GET',
    path: '/api/rooms/[roomNumber]/users',
    description: 'Получить жильцов комнаты',
  },
  { method: 'GET', path: '/api/users', description: 'Получить список пользователей' },
  { method: 'POST', path: '/api/users/invite', description: 'Пригласить пользователя' },
  { method: 'GET', path: '/api/auth/me', description: 'Получить текущего пользователя' },
];

const getMethodChipStyles = (method: string) => {
  const colors = {
    GET: { bgcolor: '#059669', color: 'white' },
    POST: { bgcolor: '#2563eb', color: 'white' },
    PUT: { bgcolor: '#ea580c', color: 'white' },
    DELETE: { bgcolor: '#dc2626', color: 'white' },
  };
  return colors[method as keyof typeof colors] || { bgcolor: '#6b7280', color: 'white' };
};

export function ApiTab() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 1, md: 4 },
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '1rem', md: '2.125rem' },
          px: { xs: '2px', md: 0 },
          wordBreak: 'break-word',
        }}
      >
        API Структура
      </Typography>

      <Box sx={{ mb: { xs: 1, md: 6 } }}>
        {apiEndpoints.map((endpoint, index) => (
          <Card
            key={index}
            sx={{
              p: { xs: '4px', md: 2 },
              mb: { xs: '4px', md: 2 },
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              border: '1px solid #e2e8f0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: '4px', md: 2 },
                flexWrap: { xs: 'wrap', md: 'nowrap' },
              }}
            >
              <Chip
                label={endpoint.method}
                size="small"
                sx={{
                  ...getMethodChipStyles(endpoint.method),
                  fontWeight: 700,
                  fontSize: { xs: '0.6rem', md: '0.75rem' },
                  minWidth: { xs: '45px', md: '60px' },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  flex: 1,
                  minWidth: 0,
                  wordBreak: 'break-all',
                }}
              >
                {endpoint.path}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.7rem', md: '0.875rem' },
                  flex: { xs: '1 1 100%', md: 'none' },
                  mt: { xs: '2px', md: 0 },
                }}
              >
                {endpoint.description}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Paper sx={{ p: { xs: '4px', md: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 1, md: 2 },
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Пример использования API
        </Typography>
        <SyntaxHighlighter
          language="typescript"
          style={oneDark}
          customStyle={{
            borderRadius: 8,
            fontSize: '0.75rem',
            overflow: 'auto',
          }}
        >
          {`// Получение списка писем
const response = await fetch('/api/letters', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const letters = await response.json();

// Добавление нового письма
const newLetter = await fetch('/api/letters', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: 'user-uuid',
    status: 'pending'
  })
});`}
        </SyntaxHighlighter>
      </Paper>
    </>
  );
}
