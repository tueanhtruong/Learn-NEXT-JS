import { Profile } from '@/redux/profile/type';
import { Yup } from '@/services';
export type FormType = {
  email: string;
  displayName: string;
  fullName: string;
  phoneNumber: string;
  uid: string;
};
export const getInitialFormValue = (value: Profile | undefined): FormType => {
  return {
    displayName: value?.displayName || '',
    email: value?.email || '',
    fullName: value?.fullName || '',
    phoneNumber: value?.phoneNumber || '',
    uid: value?.uid || '',
  };
};

export const FormSchema = Yup.object().shape({
  phoneNumber: Yup.string().phone(),
});
