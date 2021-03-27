export interface User {
  interfaceName: 'User';
  id: number;
  username: string;
  password: string;
  role: 'A' |'I';
}
