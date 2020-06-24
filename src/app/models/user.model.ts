export interface User {
    id?: string;
    email: string;
    password: string;
    role?: string;
    photo?: string;
    createdAt?: Date;
    hasPhoto?: boolean;
    hasProfile?: boolean;
    profileId?: string;
}
