import { Alert, Container, Snackbar, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../components/feature/Header';
import ServiceCard from '../../components/feature/ServiceCard';
import usersImage from '../../images/users.jpg';
import inventoryImage from '../../images/inventory.jpg';
import weeklySchedule from '../../images/schedule.jpg';
import personalTrainingImage from '../../images/coming_client.jpg';
import UsersInformation from './components/UsersInformation';
import InventoryManagement from '../../components/feature/InventoryManagement';
import WeeklySchedule from './components/WeeklySchedule';
import UserVisit from '../../components/feature/UserVisit';
import Footer from '../../components/feature/Footer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logOut, selectAuth } from '../../store/slice/authSlice';
import { useGetUserByIdQuery } from '../../store/api/userApi';
import { ERoles } from '../../enums/roles';

const AdminPAge = () => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userAuthData = useAppSelector(selectAuth);
  const {
    data: user,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUserByIdQuery({
    userId: userAuthData.id ?? 0,
    token: userAuthData.token ?? '',
  });
  const role = user?.roles ? user?.roles[0] : undefined;

  const [isUserSuccess, setUserSuccess] = useState<boolean>(false);
  const [isUserError, setUserError] = useState<boolean>(false);

  useEffect(() => {
    setUserSuccess(isUserSuccessQuery);
  }, [isUserSuccessQuery]);

  useEffect(() => {
    setUserError(isUserErrorQuery);
  }, [isUserErrorQuery]);

  useEffect(() => {
    if (
      isUserError ||
      (!user?.roles?.find((role) => role.name === ERoles.ROLE_ADMIN) &&
        isUserSuccess)
    ) {
      navigate('/login');
    }
  }, [isUserError, isUserSuccess, user?.roles]);

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
          <Stack gap="1rem">
            <Typography variant="h5" fontWeight="bold">
              Виды услуг и направления
            </Typography>
            <Stack direction="row" gap="1rem" justifyContent="space-between">
              <ServiceCard
                image={usersImage}
                onCardClick={() => setCardIndex(0)}
                title="Пользователи"
                width="260px"
                selected={cardIndex === 0}
              />
              <ServiceCard
                image={inventoryImage}
                onCardClick={() => setCardIndex(1)}
                title="Управление инвентарём"
                width="260px"
                selected={cardIndex === 1}
              />
              <ServiceCard
                image={personalTrainingImage}
                onCardClick={() => setCardIndex(2)}
                title="Регистрация посещения"
                width="260px"
                selected={cardIndex === 2}
              />
              <ServiceCard
                image={weeklySchedule}
                onCardClick={() => setCardIndex(3)}
                title="Расписание на неделю"
                width="260px"
                selected={cardIndex === 3}
              />
            </Stack>
            {cardIndex === 0 && <UsersInformation />}
            {cardIndex === 1 && <InventoryManagement />}
            {cardIndex === 2 && <UserVisit />}
            {cardIndex === 3 && <WeeklySchedule />}
          </Stack>
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

export default AdminPAge;
