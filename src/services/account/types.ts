import { PayloadData } from '../types';

export interface User extends PayloadData {
  firstname: string;
  lastname: string;
  username: string;
  email?: string;
  avatar: string | null;
  updatedAt: string;
  createdAt: string;
}
