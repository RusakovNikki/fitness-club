import { EStatuses } from '../enums/statuses';

export interface IInventory {
  id: number;
  name: string;
  status?: EStatuses;
  pickedAt?: Date;
  returnAt?: Date;
}
