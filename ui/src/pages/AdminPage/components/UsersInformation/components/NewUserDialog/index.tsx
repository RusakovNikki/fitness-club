import React, { useState } from 'react';
import MainDialog from '../../../../../../components/feature/MainDialog';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import successImage from '../../../../../../images/success.svg';
import { ERoles } from '../../../../../../enums/roles';

interface INewUserDialogProps {
  open: boolean;
  onCLose: () => void;
  onAccept: (obj: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: ERoles;
  }) => void;
}

const NewUserDialog = (props: INewUserDialogProps) => {
  const { onCLose, open, onAccept } = props;
  const [isSubmittedSubscription, setSubmittedSubscription] =
    useState<boolean>(false);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<ERoles>();

  return (
    <MainDialog
      open={open}
      dialogTitle={
        isSubmittedSubscription
          ? 'Логин и пароль отправлены пользователю'
          : 'Регистрация пользователя'
      }
      onClose={() => {
        setSubmittedSubscription(false);
        onCLose();
      }}
      onAccept={() => {
        setSubmittedSubscription(true);
        onAccept({
          username,
          firstName,
          lastName,
          email,
          role,
        });
      }}
      maxWidth="md"
    >
      {isSubmittedSubscription ? (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <img src={successImage} height="400px" alt="successImage" />
        </Stack>
      ) : (
        <Stack gap="1rem">
          {/* <TextField
            label="Фамилия"
            variant="standard"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Имя"
            variant="standard"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          /> */}
          <TextField
            label="Фамилия Имя"
            variant="standard"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Почта"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              Роль
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={role}
              label="Роль"
              onChange={(event) => setRole(event.target.value as ERoles)}
              size="small"
            >
              <MenuItem value={ERoles.ROLE_USER}>Посетитель</MenuItem>
              <MenuItem value={ERoles.ROLE_TRAINER}>Тренер</MenuItem>
              <MenuItem value={ERoles.ROLE_ADMIN}>Админ</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}
    </MainDialog>
  );
};

export default NewUserDialog;
