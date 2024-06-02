import React, { useState } from 'react';
import MainDialog from '../../../../components/feature/MainDialog';
import successImage from '../../../../images/success.svg';
import {
  Autocomplete,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useAppSelector } from '../../../../hooks/store';
import { selectAuth } from '../../../../store/slice/authSlice';
import { useGetUserByIdQuery } from '../../../../store/api/userApi';
import { ITraining } from '../../../../interfaces/training';
import { useGetGroupTrainingsQuery } from '../../../../store/api/trainingApi';

interface IGroupSessionDialogProps {
  open: boolean;
  onCLose: () => void;
  onAccept: (trainingId: number, userId: number) => void;
}

const GroupSessionDialog = (props: IGroupSessionDialogProps) => {
  const { onCLose, open, onAccept } = props;
  const [isSessionListOpen, setSessionListOpen] = useState<boolean>(false);
  const [dateSelect, setDateSelect] = useState<string>('');
  const [timeSelect, setTimeSelect] = useState<string>('');
  const [selectedTraining, setSelectedTraining] = useState<ITraining>();

  const userAuthData = useAppSelector(selectAuth);
  const {
    data: user,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUserByIdQuery({
    userId: userAuthData.id ?? 0,
    token: userAuthData.token ?? '',
  });

  const {
    data: trainings,
    isSuccess: isTrainingsSuccess,
    isError: isTrainingsError,
  } = useGetGroupTrainingsQuery(userAuthData.token ?? '');

  return (
    <MainDialog
      open={open}
      dialogTitle={'Групповые занятия'}
      onClose={() => {
        onCLose();
      }}
      onAccept={() => {
        if (!selectedTraining || !user) return;

        onAccept(selectedTraining.id, user.id);
      }}
      maxWidth="md"
    >
      <Stack gap="1rem">
        <TextField
          label="ФИО"
          variant="standard"
          fullWidth
          value={user?.username}
          disabled
        />

        <TextField
          label="Почта"
          variant="standard"
          fullWidth
          value={user?.email}
          disabled
        />

        <Autocomplete
          value={selectedTraining ?? null}
          onChange={(event, value) => {
            setSelectedTraining(value ?? undefined);
          }}
          getOptionLabel={(option) => {
            return `${option.name} | ${option.type}`;
          }}
          open={isSessionListOpen}
          onOpen={() => setSessionListOpen(true)}
          onClose={() => setSessionListOpen(false)}
          size="small"
          options={trainings ?? []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Занятие"
              InputProps={{
                ...params.InputProps,
                endAdornment: params.InputProps.endAdornment,
              }}
            />
          )}
          renderOption={(props, option) => (
            <List disablePadding key={_.uniqueId()}>
              {trainings?.indexOf(option) === 0 && (
                <>
                  <ListItem>
                    {['Имя', 'Тип тренировки', 'Время'].map((keyOf, index) => (
                      <ListItemText
                        sx={{ width: '33%', overflow: 'auto' }}
                        key={_.uniqueId()}
                      >
                        <Typography fontWeight="bold">{keyOf}</Typography>
                      </ListItemText>
                    ))}
                  </ListItem>
                  <Divider />
                </>
              )}
              <ListItem {...props}>
                {(['name', 'type', 'date'] as (keyof ITraining)[]).map(
                  (keyOf, index) => (
                    <ListItemText
                      sx={{ width: '50%', overflow: 'auto' }}
                      key={_.uniqueId()}
                    >
                      {(keyOf as keyof ITraining) === 'date' &&
                        option['date'] &&
                        new Date(option['date']).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      {keyOf !== 'date' &&
                        option[keyOf as keyof ITraining]?.toString()}
                    </ListItemText>
                  ),
                )}
              </ListItem>
              <Divider />
            </List>
          )}
        />
      </Stack>
    </MainDialog>
  );
};

export default GroupSessionDialog;
