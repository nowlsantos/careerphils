import { Profile } from './profile.model';

export interface User {
    id?: string;
    email?: string;
    currentPassword?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    photo?: string;
    createdAt?: Date;
    hasPhoto?: boolean;
    hasProfile?: boolean;
    profile?: Profile;
}
