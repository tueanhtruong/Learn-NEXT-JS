export enum ItemStatus {
  _Available = '_AVAILABLE',
  _Not_Available = '_NOT_AVAILABLE',
}
export interface Item {
  id?: string;
  price: number | null;
  label: string;
  description: string;
  images: {
    [key: string]: string | File;
  };
  productId: string;
  status?: ItemStatus;
}
