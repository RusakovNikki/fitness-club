import React, { useEffect, useState } from 'react';
import Header from '../../components/feature/Header';
import { Alert, Container, Snackbar, Stack, Typography } from '@mui/material';
import groupTrainingImage from '../../images/group_training_sessions.jpg';
import personalTrainingImage from '../../images/personal_training_sessions.jpg';
import gymInventory from '../../images/gym_inventory.jpg';
import TrainingPlanning from './сomponents/TrainingPlanning';
import InventoryManagement from '../../components/feature/InventoryManagement';
import UserVisit from '../../components/feature/UserVisit';
import ServiceCard from '../../components/feature/ServiceCard';
import Footer from '../../components/feature/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logOut, selectAuth } from '../../store/slice/authSlice';
import { useGetUserByIdQuery } from '../../store/api/userApi';
import { useNavigate } from 'react-router-dom';
import { ERoles } from '../../enums/roles';

const TrainerPage = () => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const userAuthData = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const {
    data: trainer,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUserByIdQuery({
    userId: userAuthData.id ?? 0,
    token: userAuthData.token ?? '',
  });
  const navigate = useNavigate();

  const [isUserSuccess, setUserSuccess] = useState<boolean>(false);
  const [isUserError, setUserError] = useState<boolean>(false);

  useEffect(() => {
    setUserSuccess(isUserSuccessQuery);
  }, [isUserSuccessQuery]);

  useEffect(() => {
    setUserError(isUserErrorQuery);
  }, [isUserErrorQuery]);

  const role = trainer?.roles ? trainer?.roles[0] : undefined;

  useEffect(() => {
    if (
      isUserError ||
      (!trainer?.roles?.find((role) => role.name === ERoles.ROLE_TRAINER) &&
        isUserSuccess)
    ) {
      navigate('/login');
    }
  }, [isUserError, isUserSuccess, trainer?.roles]);

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
                image={personalTrainingImage}
                onCardClick={() => setCardIndex(0)}
                title="Планирование тренировок"
                subTitle=""
                selected={cardIndex === 0}
              />
              <ServiceCard
                image={gymInventory}
                onCardClick={() => setCardIndex(1)}
                title="Управление инвентарём"
                subTitle=""
                selected={cardIndex === 1}
              />
              <ServiceCard
                image={groupTrainingImage}
                onCardClick={() => setCardIndex(2)}
                title="Регистрация посещений"
                subTitle=""
                selected={cardIndex === 2}
              />
            </Stack>
            {cardIndex === 0 && <TrainingPlanning />}
            {cardIndex === 1 && <InventoryManagement />}
            {cardIndex === 2 && <UserVisit />}
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

export default TrainerPage;
