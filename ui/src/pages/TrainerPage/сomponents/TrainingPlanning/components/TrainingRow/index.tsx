import {
  Avatar,
  AvatarGroup,
  Button,
  Stack,
  TableCell,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import UserCard from '../../../../../../components/feature/UserCard';
import { stringAvatar } from '../../../../../../utils/stringAvatar';
import _ from 'lodash';

interface ITrainingRowProps {
  row: {
    name: string;
    date: string;
    users: string[];
  };
}

const TrainingRow = (props: ITrainingRowProps) => {
  const { row } = props;
  const [isExpandUsers, setExpandUsers] = useState<boolean>(false);

  return (
    <TableRow
      key={row.name}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell width={'33%'} align="left">
        {row.name}
      </TableCell>
      <TableCell width={'33%'} align="center">
        {row.date}
      </TableCell>
      <TableCell width={'33%'} align="right">
        {isExpandUsers ? (
          <Stack bgcolor="background.paper" direction="column" gap="1.5rem">
            <Button onClick={() => setExpandUsers(false)}>Свернуть</Button>
            {row.users.map((user) => (
              // <UserCard userName={user} />
              <></>
            ))}
          </Stack>
        ) : (
          <AvatarGroup
            max={3}
            onClick={() => setExpandUsers(true)}
            sx={{
              cursor: 'pointer',
              '.MuiAvatar-root:hover': {
                background: 'red',
              },
            }}
          >
            {row.users.map((user) => (
              <Avatar key={_.uniqueId()} {...stringAvatar(user)} />
            ))}
          </AvatarGroup>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TrainingRow;
