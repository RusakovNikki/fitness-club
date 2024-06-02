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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import NewScheduleDialog from './components/NewScheduleDialog';
import { useAppSelector } from '../../../../hooks/store';
import { selectAuth } from '../../../../store/slice/authSlice';
import {
  useCreateNewTrainingMutation,
  useDeleteTrainingMutation,
  useGetGroupTrainingsQuery,
} from '../../../../store/api/trainingApi';
import UserCard from '../../../../components/feature/UserCard';
import { stringAvatar } from '../../../../utils/stringAvatar';
import NewTrainingDialog from './components/NewTrainingDialog';
import { Delete } from '@mui/icons-material';

const WeeklySchedule = () => {
  const [isAddSchedule, setAddSchedule] = useState<boolean>(false);
  const [isExpandUsers, setExpandUsers] = useState<boolean>(false);
  const [isAddTraining, setAddTraining] = useState<boolean>(false);

  const userAuthData = useAppSelector(selectAuth);
  const {
    data: trainings,
    isError: isTrainingsErrorQuery,
    isSuccess: isTrainingsSuccessQuery,
  } = useGetGroupTrainingsQuery(userAuthData.token ?? '', {
    skip: !userAuthData.token,
  });

  const [
    createNewTraining,
    { isError: isCreateErrorQuery, isSuccess: isCreateSuccessQuery },
  ] = useCreateNewTrainingMutation();

  const [
    deleteTraining,
    { isError: isDeleteErrorQuery, isSuccess: isDeleteSuccessQuery },
  ] = useDeleteTrainingMutation();

  const [isTrainingsError, setTrainingsError] = useState<boolean>(false);
  const [isTrainingsSuccess, setTrainingsSuccess] = useState<boolean>(false);

  const [isCreateError, setCreateError] = useState<boolean>(false);
  const [isCreateSuccess, setCreateSuccess] = useState<boolean>(false);

  const [isDeleteError, setDeleteError] = useState<boolean>(false);
  const [isDeleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  useEffect(() => {
    setTrainingsError(isTrainingsErrorQuery);
    setTrainingsSuccess(isTrainingsSuccessQuery);
  }, [isTrainingsErrorQuery, isTrainingsSuccessQuery]);

  useEffect(() => {
    setCreateError(isCreateErrorQuery);
    setCreateSuccess(isCreateSuccessQuery);
  }, [isCreateErrorQuery, isCreateSuccessQuery]);

  useEffect(() => {
    setDeleteError(isDeleteErrorQuery);
    setDeleteSuccess(isDeleteSuccessQuery);
  }, [isDeleteErrorQuery, isDeleteSuccessQuery]);

  const createNewTrainingHandler = (
    trainingName: string,
    trainerId: number,
    dateTime: Date,
  ) => {
    if (!userAuthData.token) return;

    createNewTraining({
      trainerId,
      trainingName,
      date: dateTime,
      token: userAuthData.token,
    });

    setAddTraining(false);
  };

  return (
    <>
      <Stack direction="row" gap="1rem" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          Расписание на неделю
        </Typography>
        <Stack direction="row" gap="1rem">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setAddTraining(true)}
          >
            Добавить тренировку
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Занятие</TableCell>
                <TableCell align="center">Тренер</TableCell>
                <TableCell align="center">Время</TableCell>
                <TableCell align="right">Кто придёт</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainings?.map((training, index) => (
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
                      ? new Date(training.date).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
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
                            {...stringAvatar(user.username + ' U')}
                          />
                        ))}
                      </AvatarGroup>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        deleteTraining({
                          trainingId: training.id,
                          token: userAuthData.token ?? '',
                        })
                      }
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NewScheduleDialog
          open={isAddSchedule}
          onCLose={() => setAddSchedule(false)}
        />
        <NewTrainingDialog
          open={isAddTraining}
          onCLose={() => setAddTraining(false)}
          onAccept={createNewTrainingHandler}
        />
      </Box>
      <Snackbar
        open={isCreateError || isDeleteError || isTrainingsError}
        autoHideDuration={3000}
        onClose={() => {
          setCreateError(false);
          setDeleteError(false);
          setTrainingsError(false);
        }}
      >
        <Alert severity="error" variant="filled">
          Ошибка
        </Alert>
      </Snackbar>
      <Snackbar
        open={isCreateSuccess || isDeleteSuccess || isTrainingsSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setCreateSuccess(false);
          setDeleteSuccess(false);
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

export default WeeklySchedule;
