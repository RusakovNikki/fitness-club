import { Add } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

const SubscriptionTab = () => {
  const contentRows = [
    {
      title: 'Разовое посещение',
      price: 250,
    },
    {
      title: 'Безлимитная карта на 1 месяц (ДНЕВНАЯ)',
      price: 1200,
    },
    {
      title: 'Безлимитная карта на 1 месяц (ВЕСЬ ДЕНЬ)',
      price: 1700,
    },
    {
      title: 'Безлимитная карта на 3 месяца',
      price: 4200,
    },
    {
      title: 'Безлимитная карта на 6 месяцев',
      price: 7800,
    },
    {
      title: 'Безлимитная карта на 12 месяцев',
      price: 14000,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Услуга</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              Цена
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentRows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="1rem"
                  justifyContent="flex-end"
                >
                  <Stack>{row.price} р.</Stack>
                  <Stack>
                    <IconButton>
                      <Add />
                    </IconButton>
                  </Stack>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionTab;
