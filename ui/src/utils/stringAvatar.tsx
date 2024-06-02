import { stringToColor } from './stringToColor';

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ') ? name.split(' ')[0][0] : name}${name.split(' ')[1][0]}`,
  };
};
