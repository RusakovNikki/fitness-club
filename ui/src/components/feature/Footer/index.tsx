import React from 'react';
import './index.css';
import { Container } from '@mui/material';

const Footer = () => {
  return (
    <footer className="site-footer" style={{ marginTop: '1rem' }}>
      <Container>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>О нас</h6>
            <p className="text-justify">
              Мы - команда профессионалов, которая стремится помочь вам достичь
              ваших спортивных целей. Мы предлагаем широкий спектр услуг,
              включая тренажерный зал, групповые занятия и персональные
              тренировки. Наша цель - создать комфортную атмосферу для всех, кто
              стремится к здоровому образу жизни. Здесь вы найдете поддержку и
              мотивацию, чтобы продвигаться вперед и достигать новых высот.
              Присоединяйтесь к нам сегодня и начните свой путь к здоровой и
              сильной фигуре! Мы с нетерпением ждем вас!
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Категории</h6>
            <ul className="footer-links">
              <li>
                <a href="#">О нас</a>
              </li>
              <li>
                <a href="#">Мой профиль</a>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Быстрые ссылки</h6>
            <ul className="footer-links">
              <li>
                <a href="#">Адрес: г.Уфа, ул. Айская, д. 15</a>
              </li>
              <li>
                <a href="#">Телефон: +7 (917) 234-32-13</a>
              </li>
              <li>
                <a href="#">Почта: only-sport.ufa@mail.ru</a>
              </li>
              <li>
                <a href="#">Обработка персональных данных</a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </Container>
      <Container>
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2024 All Rights Reserved by{' '}
              <a href="#">Only Sport</a>.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
