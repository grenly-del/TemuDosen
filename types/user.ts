export type UserRole = 'student' | 'lecturer';

export interface User {
  id: string;
  username: string;
  noRegis: string;
  role: UserRole;
  nama?: string;
  email?: string;
  fakultas?: string;
  jurusan?: string;
  nim?: string;
  nidn?: string; // untuk dosen
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

