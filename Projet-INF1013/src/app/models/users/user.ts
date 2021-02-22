export interface User {
  interfaceName: 'User';
  id: number;
  email: string;
  password: string;
  role: 'A' |'I';
}
