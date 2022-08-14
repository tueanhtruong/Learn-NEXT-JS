import { Item } from '@/redux/shop/type';
import { Yup } from '@/services';

export const FormSchema = Yup.object().shape({
  description: Yup.string().max(150).required(),
  images: Yup.mixed().required(),
  label: Yup.string().required(),
  price: Yup.mixed().required(),
});

export const getInitialFormValue = (value: Item | undefined): Item => {
  return {
    description: value?.description || '',
    images: value?.images || {},
    label: value?.label || '',
    price: value?.price || null,
    id: value?.id || '',
    productId: value?.productId || '',
  };
};
