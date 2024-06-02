import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material';
import React, { ReactNode } from 'react';

interface IMainDialogProps {
  open: boolean;
  dialogTitle: string;
  onClose: () => void;
  onAccept: () => void;
  maxWidth?: DialogProps['maxWidth'];
  children?: ReactNode | ReactNode[];
}

const MainDialog = (props: IMainDialogProps) => {
  const { onClose, open, onAccept, children, dialogTitle, maxWidth } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth ?? 'sm'}>
      <DialogTitle fontWeight="bold">{dialogTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="contained" color="success" onClick={onAccept}>
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MainDialog;
