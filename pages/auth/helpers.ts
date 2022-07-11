import { Yup } from '../../services';

export const SigninSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});
