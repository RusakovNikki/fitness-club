import {
  Alert,
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MainDialog from '../MainDialog';
import { Remove } from '@mui/icons-material';
import {
  useAssignUserToInventoryMutation,
  useCreateNewInventoryMutation,
  useGetInventoryQuery,
  useRemoveUserFromInventoryMutation,
} from '../../../store/api/inventoryApi';
import { useAppSelector } from '../../../hooks/store';
import { selectAuth } from '../../../store/slice/authSlice';
import { useGetUsersQuery } from '../../../store/api/userApi';
import { EStatuses } from '../../../enums/statuses';

const InventoryManagement = () => {
  const [isOpenDialog, setOpenDialog] = useState<boolean>(false);
  const userAuthData = useAppSelector(selectAuth);
  const [inventoryName, setInventoryName] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [
    assignUserToInventory,
    { isError: isAssignErrorQuery, isSuccess: isAssignSuccessQuery },
  ] = useAssignUserToInventoryMutation();

  const [
    removeUserFromInventory,
    { isError: isRemoveErrorQuery, isSuccess: isRemoveSuccessQuery },
  ] = useRemoveUserFromInventoryMutation();

  const [
    createNewInventory,
    { isError: isCreateErrorQuery, isSuccess: isCreateSuccessQuery },
  ] = useCreateNewInventoryMutation();

  const {
    data: inventoryList,
    isSuccess: isInvSuccessQuery,
    isError: isInvErrorQuery,
  } = useGetInventoryQuery(userAuthData.token ?? '');
  const {
    data: users,
    isError: isUserErrorQuery,
    isSuccess: isUserSuccessQuery,
  } = useGetUsersQuery(userAuthData.token ?? '');

  const [isUserSuccess, setUserSuccess] = useState<boolean>(false);
  const [isUserError, setUserError] = useState<boolean>(false);

  const [isInvSuccess, setInvSuccess] = useState<boolean>(false);
  const [isInvError, setInvError] = useState<boolean>(false);

  const [isCreateError, setCreateError] = useState<boolean>(false);
  const [isCreateSuccess, setCreateSuccess] = useState<boolean>(false);

  const [isRemoveError, setRemoveError] = useState<boolean>(false);
  const [isRemoveSuccess, setRemoveSuccess] = useState<boolean>(false);

  const [isAssignError, setAssignError] = useState<boolean>(false);
  const [isAssignSuccess, setAssignSuccess] = useState<boolean>(false);

  useEffect(() => {
    setUserSuccess(isUserSuccessQuery);
    setUserError(isUserErrorQuery);
  }, [isUserSuccessQuery, isUserErrorQuery]);

  useEffect(() => {
    setInvSuccess(isInvSuccessQuery);
    setInvError(isInvErrorQuery);
  }, [isInvSuccessQuery, isInvErrorQuery]);

  useEffect(() => {
    setCreateSuccess(isCreateSuccessQuery);
    setCreateError(isCreateErrorQuery);
  }, [isCreateErrorQuery, isCreateSuccessQuery]);

  useEffect(() => {
    setRemoveError(isRemoveErrorQuery);
    setRemoveSuccess(isRemoveSuccessQuery);
  }, [isRemoveErrorQuery, isRemoveSuccessQuery]);

  useEffect(() => {
    setAssignError(isAssignErrorQuery);
    setAssignSuccess(isAssignSuccessQuery);
  }, [isAssignErrorQuery, isAssignSuccessQuery]);

  const updateInventoryStatus = (
    event: SelectChangeEvent<number>,
    inventoryId: number,
    userId: number,
  ) => {
    assignUserToInventory({
      inventoryId,
      token: userAuthData.token ?? '',
      userId,
    });
  };

  const removeUserFromInventoryHandler = (inventoryId: number) => {
    removeUserFromInventory({
      inventoryId,
      token: userAuthData.token ?? '',
    });
  };

  const createInventoryHandler = () => {
    createNewInventory({
      inventoryName,
      token: userAuthData.token ?? '',
    });
    setOpenDialog(false);
  };

  return (
    <>
      <Stack direction="row" gap="1rem" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          Управление инвентарём
        </Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Добавить инвентарь
        </Button>
      </Stack>
      <Typography variant="h4">Свободный инвентарь</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Позиция
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Статус
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryList?.map(
              (row) =>
                (row.status === EStatuses.LEAVE || !row.status) && (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell width={'50%'} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell width={'50%'} align="right">
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap="1rem"
                        justifyContent="flex-end"
                      >
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel
                            id="demo-simple-select-helper-label"
                            size="small"
                          >
                            Пользователь
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedUserId}
                            label="Пользователь"
                            onChange={(e) =>
                              updateInventoryStatus(
                                e,
                                row.id,
                                Number(e.target.value) ?? 0,
                              )
                            }
                            size="small"
                          >
                            {users?.map((usr) => (
                              <MenuItem key={usr.id} value={usr.id}>
                                {usr.username}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4">Занятый инвентарь</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Позиция
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Статус
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryList?.map((row) => (
              <Stack key={row.id}>
                {row.status === EStatuses.COME && (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell width={'50%'} align="left">
                      {row.name}
                    </TableCell>
                    <TableCell width={'50%'} align="right">
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap="1rem"
                        justifyContent="flex-end"
                      >
                        <IconButton
                          onClick={() => removeUserFromInventoryHandler(row.id)}
                        >
                          <Remove />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </Stack>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MainDialog
        open={isOpenDialog}
        dialogTitle={'Добавление инвентаря'}
        onClose={() => {
          setOpenDialog(false);
        }}
        onAccept={createInventoryHandler}
        maxWidth="md"
      >
        <Stack gap="1rem">
          <TextField
            label="Название позиции"
            variant="standard"
            fullWidth
            value={inventoryName}
            onChange={(e) => setInventoryName(e.target.value)}
          />
        </Stack>
      </MainDialog>
      <Snackbar
        open={
          isAssignError ||
          isCreateError ||
          isInvError ||
          isRemoveError ||
          isUserError
        }
        autoHideDuration={3000}
        onClose={() => {
          setUserError(false);
          setAssignError(false);
          setCreateError(false);
          setInvError(false);
          setRemoveError(false);
        }}
      >
        <Alert severity="error" variant="filled">
          Ошибка
        </Alert>
      </Snackbar>
      <Snackbar
        open={
          isUserSuccess ||
          isAssignSuccess ||
          isCreateSuccess ||
          isInvSuccess ||
          isRemoveSuccess
        }
        autoHideDuration={3000}
        onClose={() => {
          setUserSuccess(false);
          setAssignSuccess(false);
          setCreateSuccess(false);
          setInvSuccess(false);
          setRemoveSuccess(false);
        }}
      >
        <Alert severity="success" variant="filled">
          Успех!
        </Alert>
      </Snackbar>
    </>
  );
};

export default InventoryManagement;
