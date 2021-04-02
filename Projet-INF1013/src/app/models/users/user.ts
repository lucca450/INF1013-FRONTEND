export interface User {
  interfaceName: 'User';
  id: number;
  lname: string;
  fname: string;
  email: string;
  phone: string;
  address: string;
  organism: string;
  username: string;
  password: string;
  role: 'A' |'I';
  active: boolean;
}
