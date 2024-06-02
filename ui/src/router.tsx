import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AdminPAge from './pages/AdminPage';
import TrainerPage from './pages/TrainerPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import { useAppDispatch } from './hooks/store';
import { IAuthLoginResponse } from './interfaces/auth';
import { setUserAuthData } from './store/slice/authSlice';
const RouterWrapper = () => {
  const dispatch = useAppDispatch();
  const user: IAuthLoginResponse | {} = JSON.parse(
    localStorage.getItem('user') ?? '{}',
  );

  useEffect(() => {
    dispatch(setUserAuthData(user));
  }, []);

  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/login" Component={LoginPage} />
      <Route path="/admin" Component={AdminPAge} />
      <Route path="/trainer" Component={TrainerPage} />
      <Route path="/profile" Component={ProfilePage} />
      <Route path="/about" Component={AboutPage} />
    </Routes>
  );
};

export default RouterWrapper;
