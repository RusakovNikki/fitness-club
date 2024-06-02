import React, { useEffect, useState } from 'react';
import VisitRegistrationDialog from './components/VisitRegistrationDialog';
import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material';
import UserCard from '../UserCard';
import { useAppSelector } from '../../../hooks/store';
import { selectAuth } from '../../../store/slice/authSlice';
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '../../../store/api/userApi';
import { EStatuses } from '../../../enums/statuses';

const UserVisit = () => {
  const [isVisitRegistration, setVisitRegistration] = useState<boolean>(false);
  const userAuthData = useAppSelector(selectAuth);
  const {
    data: users,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUsersQuery(userAuthData.token ?? '');
  const [
    updateUserStatus,
    { isError: isStatusErrorQuery, isSuccess: isStatusSuccessQuery },
  ] = useUpdateUserStatusMutation();

  const [isUserSuccess, setUserSuccess] = useState<boolean>(false);
  const [isUserError, setUserError] = useState<boolean>(false);

  const [isStatusSuccess, setStatusSuccess] = useState<boolean>(false);
  const [isStatusError, setStatusError] = useState<boolean>(false);

  useEffect(() => {
    setUserSuccess(isUserSuccessQuery);
  }, [isUserSuccessQuery]);

  useEffect(() => {
    setUserError(isUserErrorQuery);
  }, [isUserErrorQuery]);

  useEffect(() => {
    setStatusSuccess(isStatusSuccessQuery);
  }, [isStatusSuccessQuery]);

  useEffect(() => {
    setStatusError(isStatusErrorQuery);
  }, [isStatusErrorQuery]);

  return (
    <>
      <Stack direction="row" gap="1rem" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          Вошедшие пользователи
        </Typography>
        <Button variant="contained" onClick={() => setVisitRegistration(true)}>
          Управление
        </Button>
      </Stack>
      {users?.map(
        (user) => user.status === EStatuses.COME && <UserCard user={user} />,
      )}
      <Stack direction="row" gap="1rem" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          Ушедшие пользователи
        </Typography>
      </Stack>
      {users?.map(
        (user) => user.status === EStatuses.LEAVE && <UserCard user={user} />,
      )}
      <VisitRegistrationDialog
        open={isVisitRegistration}
        onCLose={() => setVisitRegistration(false)}
        users={users}
        onAccept={(selectedUserId, userStatus) => {
          updateUserStatus({
            status: userStatus,
            userId: selectedUserId,
            token: userAuthData.token ?? '',
          });
          setVisitRegistration(false);
        }}
      />
      <Snackbar
        open={isUserError || isStatusError}
        autoHideDuration={3000}
        onClose={() => {
          setUserError(false);
          setStatusError(false);
        }}
      >
        <Alert severity="error" variant="filled">
          Ошибка
        </Alert>
      </Snackbar>
      <Snackbar
        open={isUserSuccess || isStatusSuccess}
        autoHideDuration={3000}
        onClose={() => {
          setUserSuccess(false);
          setStatusSuccess(false);
        }}
      >
        <Alert severity="success" variant="filled">
          Успех!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserVisit;
