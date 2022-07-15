export interface AdminAccount {
  userId?: string;
  uid: string;
  email: string;
  isAdmin?: boolean;
}
export interface Banner {
  id?: string;
  order: number | null;
  label: string;
  description: string;
  image: string | File;
  productId: string;
}
