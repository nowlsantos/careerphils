import { User } from './user.model';

export interface Profile {
    _id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    location?: string;
    position?: string;
    birthdate?: string;
    userId?: string;
    createdAt?: Date;
    user?: User;
}
