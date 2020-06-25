import { Profile } from './profile.model';

export interface User {
    id?: string;
    email: string;
    password: string;
    role?: string;
    photo?: string;
    createdAt?: Date;
    hasPhoto?: boolean;
    hasProfile?: boolean;
    profile?: Profile;
}
