import React, { useState } from 'react';
import MainDialog from '../../../MainDialog';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IUser } from '../../../../../interfaces/user';
import { EStatuses } from '../../../../../enums/statuses';

interface IVisitRegistrationDialogProps {
  open: boolean;
  onCLose: () => void;
  users?: IUser[];
  onAccept: (selectedUserId: number, status: EStatuses) => void;
}

const VisitRegistrationDialog = (props: IVisitRegistrationDialogProps) => {
  const { onCLose, open, users, onAccept } = props;
  const [userStatus, setUserStatus] = useState<EStatuses>();
  const [selectedUserId, setSelectedUserId] = useState<number>();

  return (
    <MainDialog
      open={open}
      dialogTitle={'Регистрация посещения'}
      onClose={() => {
        onCLose();
      }}
      onAccept={() => {
        if (!selectedUserId || !userStatus) return;

        onAccept(selectedUserId, userStatus);
      }}
      maxWidth="md"
    >
      <Stack gap="1rem" margin="1rem 0">
        <TextField
          size="small"
          label="Время"
          value={new Date().toLocaleString()}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" size="small">
            Пользователь
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedUserId}
            label="Пользователь"
            onChange={(event) => setSelectedUserId(Number(event.target.value))}
            size="small"
          >
            {users?.map((usr) => (
              <MenuItem key={usr.id} value={usr.id}>
                {usr.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" size="small">
            Статус
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={userStatus}
            label="Статус"
            onChange={(event) => setUserStatus(event.target.value as EStatuses)}
            size="small"
          >
            <MenuItem value={EStatuses.COME}>Пришёл</MenuItem>
            <MenuItem value={EStatuses.LEAVE}>Ушёл</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </MainDialog>
  );
};

export default VisitRegistrationDialog;
