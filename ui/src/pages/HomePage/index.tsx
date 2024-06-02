import React, { useEffect, useState } from 'react';
import Header from '../../components/feature/Header';
import {
  Alert,
  Box,
  Container,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import buySubscriptionImage from '../../images/buy_subscription.jpg';
import groupTrainingImage from '../../images/group_training_sessions.jpg';
import personalTrainingImage from '../../images/personal_training_sessions.jpg';
import TabPanel from '../../components/core/TabPanel';
import ServiceCard from '../../components/feature/ServiceCard';
import SubscriptionTab from './components/SubscriptionTab';
import SubscriptionDialog from './components/SubscriptionDialog';
import GroupSessionDialog from './components/GroupSessionDialog';
import PersonalSessionDialog from './components/PersonalSessionDialog';
import Footer from '../../components/feature/Footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logOut, selectAuth } from '../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserByIdQuery,
  useJoinUserToGroupTrainingMutation,
} from '../../store/api/userApi';
import {
  useAddUserToSubscriptionMutation,
  useGetSubscriptionsQuery,
} from '../../store/api/subscription';
import { ERoles } from '../../enums/roles';

const HomePage = () => {
  const navigate = useNavigate();
  const userAuthData = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const {
    data: user,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUserByIdQuery({
    userId: userAuthData.id ?? 0,
    token: userAuthData.token ?? '',
  });
  const { data: subscriptions } = useGetSubscriptionsQuery(
    userAuthData.token ?? '',
    {
      skip: !userAuthData.token,
    },
  );
  const [
    addUserToSubscription,
    { isError: isSubErrorQuery, isSuccess: isSubSuccessQuery },
  ] = useAddUserToSubscriptionMutation();

  const [
    joinUserToGroupTraining,
    { isError: isJoinErrorQuery, isSuccess: isJoinSuccessQuery },
  ] = useJoinUserToGroupTrainingMutation();

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isOpenSubscriptionDialog, setOpenSubscriptionDialog] =
    useState<boolean>(false);
  const [isOpenGroupSessionDialog, setOpenGroupSessionDialog] =
    useState<boolean>(false);
  const [isOpenPersonalSessionDialog, setOpenPersonalSessionDialog] =
    useState<boolean>(false);

  const [isUserSuccess, setUserSuccess] = useState<boolean>(false);
  const [isUserError, setUserError] = useState<boolean>(false);
  const [isSubSuccess, setSubSuccess] = useState<boolean>(false);
  const [isSubError, setSubError] = useState<boolean>(false);
  const [isJoinError, setJoinError] = useState<boolean>(false);
  const [isJoinSuccess, setJoinSuccess] = useState<boolean>(false);

  const logOutHandler = () => {
    dispatch(logOut());
    navigate('/login');
  };

  useEffect(() => {
    setUserSuccess(isUserSuccessQuery);
  }, [isUserSuccessQuery]);

  useEffect(() => {
    setJoinError(isJoinErrorQuery);
    setJoinSuccess(isJoinSuccessQuery);
  }, [isJoinErrorQuery, isJoinSuccessQuery]);

  useEffect(() => {
    setUserError(isUserErrorQuery);
  }, [isUserErrorQuery]);

  useEffect(() => {
    setSubError(isSubErrorQuery);
  }, [isSubErrorQuery]);

  useEffect(() => {
    setSubSuccess(isSubSuccessQuery);
  }, [isSubSuccessQuery]);

  useEffect(() => {
    if (
      isUserError ||
      (!user?.roles?.find((role) => role.name === ERoles.ROLE_USER) &&
        isUserSuccess)
    ) {
      navigate('/login');
    }
  }, [isUserError, isUserSuccess, user?.roles]);

  const joinToGroupSessionHandler = (trainingId: number, userId: number) => {
    joinUserToGroupTraining({
      trainingId,
      userId,
      token: userAuthData.token ?? '',
    });

    setOpenGroupSessionDialog(false);
  };

  return (
    <Stack>
      <Header
        headerLogo={{
          title: 'Главная',
          onClick() {
            navigate('/');
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
            onClick: logOutHandler,
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
                image={buySubscriptionImage}
                onCardClick={() => setOpenSubscriptionDialog(true)}
                title="Купить абонемент"
                subTitle="Станьте членом нашего клуба, занимайтесь на лучших
                тренировочных аппаратах"
              />
              <ServiceCard
                image={groupTrainingImage}
                onCardClick={() => setOpenGroupSessionDialog(true)}
                title="Групповые занятия"
                subTitle="Тренировки с единомышленниками"
              />
              <ServiceCard
                image={personalTrainingImage}
                onCardClick={() => setOpenPersonalSessionDialog(true)}
                title="Персональные тренировки"
                subTitle="Станьте сильнее с нашими специалистами"
              />
            </Stack>

            <Typography variant="h5" fontWeight="bold">
              Прайс-лист
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
                <Tab label="КУПИТЬ АБОНЕМЕНТ" />
                <Tab label="ГРУППОВЫЕ ЗАНЯТИЯ" />
                <Tab label="ПЕРСОНАЛЬНЫЕ ТРЕНИРОВКИ" />
              </Tabs>
              <TabPanel value={tabIndex} index={0}>
                <SubscriptionTab />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <SubscriptionTab />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <SubscriptionTab />
              </TabPanel>
            </Box>
          </Stack>
        </Container>
      </Stack>
      <SubscriptionDialog
        open={isOpenSubscriptionDialog}
        onCLose={() => setOpenSubscriptionDialog(false)}
        onAccept={(subscriptionId) => {
          addUserToSubscription({
            token: userAuthData.token ?? '',
            subscriptionId,
            userId: userAuthData.id ?? 0,
          });
          setOpenSubscriptionDialog(false);
        }}
        user={user}
        subscriptions={subscriptions}
      />
      <GroupSessionDialog
        open={isOpenGroupSessionDialog}
        onCLose={() => setOpenGroupSessionDialog(false)}
        onAccept={joinToGroupSessionHandler}
      />
      <PersonalSessionDialog
        onCLose={() => setOpenPersonalSessionDialog(false)}
        open={isOpenPersonalSessionDialog}
      />
      <Footer />
      <Snackbar
        open={isUserError || isSubError || isJoinError}
        autoHideDuration={3000}
        onClose={() => {
          setUserError(false);
          setSubError(false);
          setJoinError(false);
        }}
      >
        <Alert severity="error" variant="filled">
          Ошибка
        </Alert>
      </Snackbar>
      <Snackbar
        open={isUserSuccess || isSubSuccess || isJoinSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setUserSuccess(false);
          setSubSuccess(false);
          setJoinSuccess(false);
        }}
      >
        <Alert severity="success" variant="filled">
          Успех!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default HomePage;
