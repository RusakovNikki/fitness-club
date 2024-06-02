import {
  Alert,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import TabPanel from '../../../../components/core/TabPanel';
import UserCard from '../../../../components/feature/UserCard';
import { useAppSelector } from '../../../../hooks/store';
import { selectAuth } from '../../../../store/slice/authSlice';
import { useGetTrainingsByTrainerIdQuery } from '../../../../store/api/trainingApi';
import { stringAvatar } from '../../../../utils/stringAvatar';

const TrainingPlanning = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isExpandUsers, setExpandUsers] = useState<boolean>(false);
  const userAuthData = useAppSelector(selectAuth);

  const {
    data: trainings,
    isError: isTrainingsErrorQuery,
    isSuccess: isTrainingsSuccessQuery,
  } = useGetTrainingsByTrainerIdQuery(
    {
      trainerId: userAuthData?.id ?? 0,
      token: userAuthData.token ?? '',
    },
    {
      skip: !userAuthData.token && !userAuthData?.id,
    },
  );

  const [isTrainingsSuccess, setTrainingsSuccess] = useState<boolean>(false);
  const [isTrainingsError, setTrainingsError] = useState<boolean>(false);

  useEffect(() => {
    setTrainingsSuccess(isTrainingsSuccessQuery);
  }, [isTrainingsSuccessQuery]);

  useEffect(() => {
    setTrainingsError(isTrainingsErrorQuery);
  }, [isTrainingsErrorQuery]);
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Планирование тренировок
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tabIndex}
          onChange={(_, index) => setTabIndex(index)}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Групповые тренировки" />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <Stack width="100%" height="100%">
            <TableContainer component={Paper}>
              <Table aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: 'bold' }}
                      align="left"
                      width="25%"
                    >
                      Дата
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold' }}
                      align="center"
                      width="25%"
                    >
                      Тренер
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold' }}
                      align="center"
                      width="25%"
                    >
                      Дата
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold' }}
                      align="right"
                      width="25%"
                    >
                      Пользователи
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainings?.map((training) => (
                    <TableRow
                      key={training.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell width={'25%'} align="left">
                        {training.name}
                      </TableCell>
                      <TableCell width={'25%'} align="center">
                        {training.trainer?.username}
                      </TableCell>
                      <TableCell width={'25%'} align="center">
                        {training.date
                          ? new Date(training.date).toLocaleDateString(
                              'ru-RU',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )
                          : ''}
                      </TableCell>
                      <TableCell width={'25%'} align="right">
                        {isExpandUsers ? (
                          <Stack
                            bgcolor="background.paper"
                            direction="column"
                            gap="1.5rem"
                          >
                            <Button onClick={() => setExpandUsers(false)}>
                              Свернуть
                            </Button>
                            {training?.users?.map((user) => (
                              <UserCard user={user} />
                            ))}
                          </Stack>
                        ) : (
                          <AvatarGroup
                            max={3}
                            onClick={() => setExpandUsers(true)}
                            sx={{
                              cursor: 'pointer',
                              '.MuiAvatar-root:hover': {
                                background: 'red',
                              },
                            }}
                          >
                            {training?.users?.map((user) => (
                              <Avatar
                                key={user.id}
                                {...stringAvatar(user.username + ' ')}
                              />
                            ))}
                          </AvatarGroup>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </TabPanel>
      </Box>
      <Snackbar
        open={isTrainingsError}
        autoHideDuration={3000}
        onClose={() => {
          setTrainingsError(false);
        }}
      >
        <Alert severity="error" variant="filled">
          Ошибка
        </Alert>
      </Snackbar>
      <Snackbar
        open={isTrainingsSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setTrainingsSuccess(false);
        }}
      >
        <Alert severity="success" variant="filled">
          Успех!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TrainingPlanning;
