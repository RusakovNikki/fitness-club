import {
  Alert,
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
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
import Header from '../../components/feature/Header';
import { stringAvatar } from '../../utils/stringAvatar';
import Footer from '../../components/feature/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logOut, selectAuth } from '../../store/slice/authSlice';
import { useGetUserByIdQuery } from '../../store/api/userApi';
import { useNavigate } from 'react-router-dom';
import { ERoles } from '../../enums/roles';
import { useGetTrainingsByUserIdQuery } from '../../store/api/trainingApi';
import UserCard from '../../components/feature/UserCard';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isExpandUsers, setExpandUsers] = useState<boolean>(false);
  const userAuthData = useAppSelector(selectAuth);
  const {
    data: user,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUserByIdQuery({
    userId: userAuthData.id ?? 0,
    token: userAuthData.token ?? '',
  });

  const { data: trainings } = useGetTrainingsByUserIdQuery(
    {
      userId: user?.id ?? 0,
      token: userAuthData.token ?? '',
    },
    {
      skip: !userAuthData.token && !user?.id,
    },
  );
  const role = user?.roles ? user?.roles[0] : undefined;
  const [isUserError, setUserError] = useState<boolean>(false);
  const [isUserSuccess, setUserSuccess] = useState<boolean>(false);

  useEffect(() => {
    setUserError(isUserErrorQuery);
  }, [isUserErrorQuery]);

  useEffect(() => {
    setUserSuccess(isUserSuccessQuery);
  }, [isUserSuccessQuery]);

  useEffect(() => {
    if (isUserError) {
      navigate('/login');
    }
  }, [isUserError]);

  return (
    <Stack>
      <Header
        headerLogo={{
          title: 'Главная',
          onClick() {
            if (role?.name === ERoles.ROLE_USER) {
              navigate('/');
            } else if (role?.name === ERoles.ROLE_ADMIN) {
              navigate('/admin');
            } else if (role?.name === ERoles.ROLE_TRAINER) navigate('/trainer');
          },
        }}
        navItems={[
          {
            title: 'О нас',
            onClick() {
              navigate('/about');
            },
          },
          {
            title: 'Мой профиль',
            onClick() {
              navigate('/profile');
            },
          },
          {
            title: 'выйти',
            onClick() {
              dispatch(logOut());
              navigate('/login');
            },
          },
        ]}
      />
      <Stack marginTop="1rem">
        <Container>
          <Card>
            <CardHeader
              sx={{ alignItems: 'flex-start', gap: '2rem' }}
              avatar={
                <Avatar
                  sx={{
                    ...stringAvatar('Никита Русаков').sx,
                    width: '270px',
                    height: '270px',
                  }}
                />
              }
              title={<Typography variant="h3">{user?.username}</Typography>}
              subheader={
                <Stack gap="0.5rem">
                  <Typography>
                    Последний визит:{' '}
                    {new Date(
                      user?.enteredAt ?? user?.leftAt ?? '',
                    ).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                  <Typography>{user?.email}</Typography>
                  <Typography>
                    Роль:{' '}
                    {user?.roles?.map((role, index) => (
                      <span key={index}>{role.name}</span>
                    )) ?? <></>}
                  </Typography>
                  <Typography>Абонемент: {user?.subscription?.name}</Typography>
                  <Typography>
                    Взятый инвентарь:{' '}
                    {user?.inventoryList?.map((inventory) => (
                      <span key={inventory.id}>{inventory.name}</span>
                    ))}
                  </Typography>
                  <Typography>Ваши тренировки:</Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Занятие</TableCell>
                          <TableCell align="center">Тренер</TableCell>
                          <TableCell align="center">Время</TableCell>
                          <TableCell align="right">Кто придёт</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trainings?.map((training, index) => (
                          <TableRow
                            key={training.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
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
              }
            />
          </Card>
        </Container>
      </Stack>
      <Footer />
      <Snackbar
        open={isUserError}
        autoHideDuration={3000}
        onClose={() => {
          setUserError(false);
        }}
      >
        <Alert severity="error" variant="filled">
          Ошибка
        </Alert>
      </Snackbar>
      <Snackbar
        open={isUserSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setUserSuccess(false);
        }}
      >
        <Alert severity="success" variant="filled">
          Успех!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ProfilePage;
