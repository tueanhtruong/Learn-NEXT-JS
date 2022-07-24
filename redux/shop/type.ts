export interface Item {
  id?: string;
  price: number | null;
  label: string;
  description: string;
  images: {
    [key: string]: string | File;
  };
  productId: string;
}
