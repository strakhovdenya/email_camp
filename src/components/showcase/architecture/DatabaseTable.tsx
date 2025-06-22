import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as styles from './DatabaseTable.styles';

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
    <Card sx={styles.getCardStyles(color)}>
      <CardContent sx={styles.cardContentStyles}>
        <Typography variant="h6" sx={styles.getTableNameStyles(color)}>
          {name}
        </Typography>
        {columns.map((column, index) => (
          <Box key={index} sx={styles.columnRowStyles}>
            <Typography
              variant="body2"
              sx={styles.getColumnNameStyles(column.key || false, column.foreign || false)}
            >
              {column.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={styles.columnTypeStyles}>
              {column.type}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
