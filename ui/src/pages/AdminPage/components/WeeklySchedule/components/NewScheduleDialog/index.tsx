import React, { useState } from 'react';
import MainDialog from '../../../../../../components/feature/MainDialog';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import successImage from '../../../../../../images/success.svg';

interface INewScheduleDialogProps {
  open: boolean;
  onCLose: () => void;
}

const NewScheduleDialog = (props: INewScheduleDialogProps) => {
  const { onCLose, open } = props;
  const [isSubmittedSubscription, setSubmittedSubscription] =
    useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [day, setDay] = useState<string>('');

  const trainers = [
    'Ляйсан Шахмаметова',
    'Владимир Штангин',
    'Яна Петрова',
    'Валентин Кротов',
    'Дмитрий Каневский',
  ];

  return (
    <MainDialog
      open={open}
      dialogTitle={
        isSubmittedSubscription ? 'Подтверждено' : 'Добавить в расписание'
      }
      onClose={() => {
        setSubmittedSubscription(false);
        onCLose();
      }}
      onAccept={() => setSubmittedSubscription(true)}
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
        <Stack gap="1rem" margin="1rem 0">
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              Время
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={time}
              label="Время"
              onChange={(event) => setTime(event.target.value)}
              size="small"
            >
              <MenuItem value={9}>9:00</MenuItem>
              <MenuItem value={10}>10:00</MenuItem>
              <MenuItem value={11}>11:00</MenuItem>
              <MenuItem value={12}>12:00</MenuItem>
              <MenuItem value={13}>13:00</MenuItem>
              <MenuItem value={14}>14:00</MenuItem>
              <MenuItem value={15}>15:00</MenuItem>
              <MenuItem value={16}>16:00</MenuItem>
              <MenuItem value={17}>17:00</MenuItem>
              <MenuItem value={18}>18:00</MenuItem>
              <MenuItem value={19}>19:00</MenuItem>
              <MenuItem value={20}>20:00</MenuItem>
              <MenuItem value={21}>21:00</MenuItem>
              <MenuItem value={22}>22:00</MenuItem>
              <MenuItem value={23}>23:00</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              День недели
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={day}
              label="День недели"
              onChange={(event) => setDay(event.target.value)}
              size="small"
            >
              <MenuItem value={9}>Понедельник</MenuItem>
              <MenuItem value={10}>Вторник</MenuItem>
              <MenuItem value={11}>Среда</MenuItem>
              <MenuItem value={11}>Четверг</MenuItem>
              <MenuItem value={11}>Пятница</MenuItem>
              <MenuItem value={11}>Суббота</MenuItem>
              <MenuItem value={11}>Воскресенье</MenuItem>
            </Select>
          </FormControl>
          <TextField size="small" label="Занятие" />
          <Autocomplete
            size="small"
            fullWidth
            id="combo-box-demo"
            options={trainers}
            renderInput={(params) => (
              <TextField {...params} fullWidth label="Тренер" />
            )}
          />
        </Stack>
      )}
    </MainDialog>
  );
};

export default NewScheduleDialog;
