import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  Menu,
} from '@mui/material';
import React, { useState } from 'react';
import { stringAvatar } from '../../../utils/stringAvatar';
import { IUser } from '../../../interfaces/user';

interface IUserCardProps {
  user: IUser;
}

const UserCard = (props: IUserCardProps) => {
  const { user } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            {...stringAvatar(user.username + ' User')}
          />
        }
        action={
          <>
            <IconButton
              aria-controls="menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <Button>Перейти к странице</Button>
            </Menu>
          </>
        }
        title={`${user.username}`}
        subheader={user.enteredAt?.toString() ?? user.leftAt?.toString() ?? ''}
      />
    </Card>
  );
};

export default UserCard;
