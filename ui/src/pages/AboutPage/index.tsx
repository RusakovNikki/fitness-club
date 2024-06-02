import {
  Button,
  Card,
  CardMedia,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import Header from '../../components/feature/Header';
import strongMan from '../../images/buy_subscription.jpg';
import comingClient from '../../images/coming_client.jpg';
import groupSessions from '../../images/group_training_sessions.jpg';
import gymInventory from '../../images/gym_inventory.jpg';
import infoVisitors from '../../images/info_about_visitors.jpg';
import inventory from '../../images/inventory.jpg';
import personalTraining from '../../images/personal_training_sessions.jpg';
import registrationMember from '../../images/registration_member.jpg';
import schedule from '../../images/schedule.jpg';
import users from '../../images/users.jpg';
import strongMan2 from '../../images/strongMan2.jpg';
import strongWoman from '../../images/strongWoman.jpg';
import Footer from '../../components/feature/Footer';

const AboutPage = () => {
  const itemData = [
    {
      img: strongMan,
      title: 'Breakfast',
    },
    {
      img: comingClient,
      title: 'Burger',
    },
    {
      img: groupSessions,
      title: 'Camera',
    },
    {
      img: gymInventory,
      title: 'Coffee',
    },
    {
      img: infoVisitors,
      title: 'Hats',
    },
    {
      img: inventory,
      title: 'Honey',
    },
    {
      img: personalTraining,
      title: 'Basketball',
    },
    {
      img: registrationMember,
      title: 'Fern',
    },
    {
      img: schedule,
      title: 'Mushrooms',
    },
    {
      img: users,
      title: 'Tomato basil',
    },
    {
      img: strongMan2,
      title: 'Sea star',
    },
    {
      img: strongWoman,
      title: 'Bike',
    },
  ];
  return (
    <Stack>
      <Header
        headerLogo={{
          title: 'Главная',
          onClick() {},
        }}
        navItems={[
          {
            title: 'О нас',
            onClick() {},
          },
          {
            title: 'Мой профиль',
            onClick() {},
          },
          {
            title: 'выйти',
            onClick() {},
          },
        ]}
      />
      <Stack marginTop="1rem">
        <Container>
          <Stack gap="1rem">
            <Typography variant="h5" fontWeight="bold">
              О нас
            </Typography>
            <Stack direction="row" gap="1rem" justifyContent="space-between">
              <Stack>
                <ImageList
                  sx={{ width: 500, height: 450 }}
                  cols={3}
                  rowHeight={164}
                >
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Stack>
              <Stack gap="1rem">
                <Typography variant="h5" align="center">
                  Добро пожаловать в наш фитнес-клуб!
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  sx={{ textIndent: '25px' }}
                >
                  Мы - команда профессионалов, которая стремится помочь вам
                  достичь ваших спортивных целей.
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  sx={{ textIndent: '25px' }}
                >
                  Мы предлагаем широкий спектр услуг, включая тренажерный зал,
                  групповые занятия и персональные тренировки.
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  sx={{ textIndent: '25px' }}
                >
                  Наша цель - создать комфортную атмосферу для всех, кто
                  стремится к здоровому образу жизни. Здесь вы найдете поддержку
                  и мотивацию, чтобы продвигаться вперед и достигать новых
                  высот.
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="justify"
                  sx={{ textIndent: '25px' }}
                >
                  Присоединяйтесь к нам сегодня и начните свой путь к здоровой и
                  сильной фигуре! Мы с нетерпением ждем вас!
                </Typography>
                <Button variant="contained" color="success">
                  Присоединиться сейчас!
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default AboutPage;
