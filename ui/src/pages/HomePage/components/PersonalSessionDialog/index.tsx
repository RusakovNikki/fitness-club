import React, { useState } from 'react';
import MainDialog from '../../../../components/feature/MainDialog';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import successImage from '../../../../images/success.svg';

interface IPersonalSessionDialogProps {
  open: boolean;
  onCLose: () => void;
}

const PersonalSessionDialog = (props: IPersonalSessionDialogProps) => {
  const { onCLose, open } = props;
  const [isSubmittedSubscription, setSubmittedSubscription] =
    useState<boolean>(false);
  const [trainer, setTrainer] = useState<string>('');
  const [dateSelect, setDateSelect] = useState<string>('');
  const [timeSelect, setTimeSelect] = useState<string>('');

  return (
    <MainDialog
      open={open}
      dialogTitle={
        isSubmittedSubscription
          ? 'Ваша заявка принята'
          : 'Персональные тренировки'
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
        <Stack gap="1rem">
          <TextField
            label="Фамилия"
            variant="standard"
            fullWidth
            value="Русаков"
            disabled
          />
          <TextField
            label="Имя"
            variant="standard"
            fullWidth
            value="Никита"
            disabled
          />
          <TextField
            label="Отчество"
            variant="standard"
            fullWidth
            value="Станиславович"
            disabled
          />
          <TextField
            label="Почта"
            variant="standard"
            fullWidth
            value="nikitos@mail.ru"
            disabled
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              Выбор тренера
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={trainer}
              label="Выбор тренера"
              onChange={(event) => setTrainer(event.target.value)}
              size="small"
            >
              <MenuItem value={10}>Ляйсан Шахмаметова</MenuItem>
              <MenuItem value={20}>Владимир Штангин</MenuItem>
              <MenuItem value={30}>Яна Петрова</MenuItem>
              <MenuItem value={40}>Валентин Кротов</MenuItem>
              <MenuItem value={50}>Дмитрий Каневский</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              Дата
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={dateSelect}
              label="Дата"
              onChange={(event) => setDateSelect(event.target.value)}
              size="small"
            >
              <MenuItem value={10}>Понедельник</MenuItem>
              <MenuItem value={30}>Среда</MenuItem>
              <MenuItem value={50}>Пятница</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" size="small">
              время
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={timeSelect}
              label="время"
              onChange={(event) => setTimeSelect(event.target.value)}
              size="small"
            >
              <MenuItem value={10}>13:00</MenuItem>
              <MenuItem value={20}>14:00</MenuItem>
              <MenuItem value={30}>18:00</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}
    </MainDialog>
  );
};

export default PersonalSessionDialog;
