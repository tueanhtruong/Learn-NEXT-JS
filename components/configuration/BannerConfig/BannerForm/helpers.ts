import { Banner } from '../../../../redux/configuration/type';
import { Yup } from '../../../../services';

export const FormSchema = Yup.object().shape({
  description: Yup.string().required(),
  image: Yup.mixed().required(),
  label: Yup.string().required(),
  order: Yup.mixed().required(),
});

export const getInitialFormValue = (value: Banner | undefined): Banner => {
  return {
    description: value?.description || '',
    image: value?.image || '',
    label: value?.label || '',
    order: value?.order || null,
    id: value?.id || '',
    productId: value?.productId || '',
  };
};
