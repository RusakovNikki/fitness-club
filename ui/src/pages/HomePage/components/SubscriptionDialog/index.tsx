import React, { useState } from 'react';
import MainDialog from '../../../../components/feature/MainDialog';
import successImage from '../../../../images/success.svg';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IUser } from '../../../../interfaces/user';
import { ISubscription } from '../../../../interfaces/subscription';

interface ISubscriptionDialogProps {
  open: boolean;
  onCLose: () => void;
  user?: IUser;
  subscriptions?: ISubscription[];
  onAccept: (subscription: number) => void;
}

const SubscriptionDialog = (props: ISubscriptionDialogProps) => {
  const { open, onCLose, user, subscriptions, onAccept } = props;

  const [subscription, setSubscription] = useState<string>('');

  return (
    <MainDialog
      open={open}
      dialogTitle={'Выбор абонемента'}
      onClose={() => {
        onCLose();
      }}
      onAccept={() => {
        onAccept(Number(subscription));
      }}
      maxWidth="md"
    >
      <Stack gap="1rem">
        <TextField
          label="Фамилия"
          variant="standard"
          fullWidth
          value={user?.lastName}
          disabled
        />
        <TextField
          label="Имя"
          variant="standard"
          fullWidth
          value={user?.firstName}
          disabled
        />
        <TextField
          label="Почта"
          variant="standard"
          fullWidth
          value={user?.email}
          disabled
        />
        <TextField
          label="Ваш текущий тариф"
          variant="standard"
          fullWidth
          value={user?.subscription?.name}
          disabled
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" size="small">
            Абонемент
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={subscription}
            label="Абонемент"
            onChange={(event) => setSubscription(event.target.value)}
            size="small"
          >
            {subscriptions?.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </MainDialog>
  );
};

export default SubscriptionDialog;
