import { ERoles } from '../enums/roles';

export interface IUser {
  id: number;
  email: string;
  enteredAt?: Date;
  leftAt?: Date;
  password: string;
  status?: string;
  username: string;
  firstName: string;
  lastName: string;
  roles?: {
    id: number;
    name: ERoles;
  }[];
  subscription?: {
    id: number;
    name: string;
    price: number;
  };
  inventoryList?: {
    id: number;
    name: string;
    pickedAt?: Date;
    returnAt?: Date;
    status?: string;
  }[];
}
