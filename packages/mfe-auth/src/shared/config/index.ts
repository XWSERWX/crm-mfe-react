export interface LoginFormData {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

export const emptyForm: LoginFormData = {
  username: '',
  email: '',
  password: '',
  rememberMe: false,
};
