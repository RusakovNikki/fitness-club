import { ETrainings } from '../enums/training';
import { IUser } from './user';

export interface ITraining {
  id: number;
  date?: Date;
  type?: ETrainings;
  name?: string;
  trainer?: IUser;
  users?: IUser[];
}
