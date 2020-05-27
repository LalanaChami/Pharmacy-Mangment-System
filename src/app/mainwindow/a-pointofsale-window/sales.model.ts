import {SalesInformationArray} from './salesInformationArray.model';
export interface Sales {
  id: string;
  drugName: SalesInformationArray[];
  totalPrice: number;
  tax: number;
  paidAmount: number;
  balance: number;
  dateTime: any;
}
