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
      title: 'Тип занятия',
      description: 'Групповое',
    },
    {
      title: 'Длительность',
      description: '1 час',
    },
    {
      title: 'Направление',
      description: 'Стретчинг',
    },
    {
      title: 'Общее Количество',
      description: '8',
    },
    {
      title: 'Список клиентов',
      description: ' ',
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Услуга</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
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
                  <Stack>{row.description}</Stack>
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
