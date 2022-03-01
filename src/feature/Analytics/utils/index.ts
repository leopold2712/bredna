import type { ClientDTO } from '../../../shared/dtos/client.dto';

export type DataGraphType = {
  x: string;
  y: number;
};

export enum GraphName {
  customer,
  order,
}

export type DataType = ClientDTO;

export const getAmount = (data: DataGraphType[]) =>
  data
    .map((order) => order.y)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    .toString();
