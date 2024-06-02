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
import { useGetUsersQuery } from '../../../../../../store/api/userApi';
import { useAppSelector } from '../../../../../../hooks/store';
import { selectAuth } from '../../../../../../store/slice/authSlice';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface INewTrainingDialogProps {
  open: boolean;
  onCLose: () => void;
  onAccept: (trainingName: string, trainerId: number, dateTime: Date) => void;
}

const NewTrainingDialog = (props: INewTrainingDialogProps) => {
  const userAuthData = useAppSelector(selectAuth);

  const { onCLose, open, onAccept } = props;
  const [trainingName, setTrainingName] = useState<string>('');
  const [trainerId, setTrainerId] = useState<number>();
  const [dateTime, setDateTime] = useState<Dayjs | null>(null);

  const {
    data: trainers,
    isSuccess: isTrainersSuccessQuery,
    isError: isTrainersErrorQuery,
  } = useGetUsersQuery(userAuthData.token ?? '', {
    skip: !userAuthData.token,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MainDialog
        open={open}
        dialogTitle={'Добавить в расписание'}
        onClose={() => {
          onCLose();
        }}
        onAccept={() => {
          if (!trainerId || !trainingName || !dateTime) return;

          onAccept(trainingName, trainerId, dateTime.toDate());
        }}
        maxWidth="md"
      >
        <Stack gap="1rem" margin="1rem 0">
          <TextField
            size="small"
            label="Название тренировки"
            value={trainingName}
            onChange={(e) => setTrainingName(e.target.value)}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              Тренер
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={trainerId}
              label="Тренер"
              onChange={(event) => setTrainerId(event.target.value as number)}
              size="small"
            >
              {trainers?.map((trainer) => (
                <MenuItem value={trainer.id}>{trainer.username}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <DateTimeField
              label="Дата и время"
              value={dateTime}
              onChange={(value) => setDateTime(value)}
              format="DD/MM/YYYY HH:mm"
            />
          </FormControl>
        </Stack>
      </MainDialog>
    </LocalizationProvider>
  );
};

export default NewTrainingDialog;
