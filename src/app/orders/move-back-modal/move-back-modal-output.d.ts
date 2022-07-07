import { OrderLineStatus } from 'src/app/models/order-line-status';

export interface MoveBackModalOutput {
    confirmed: boolean;
    newStatus?: OrderLineStatus;
}