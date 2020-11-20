export interface User {
    id: string;
    name: string;
}

export type Room = User[];

export enum NotificationEvents {
    CONNECTION = 'connection',
    JOIN = 'join',
    LEAVE = 'leave',
    MESSAGE = 'message',
    NEW_JOIN = 'new_join',
    NEW_LEAVE = 'new_leave',
    NEW_MESSAGE = 'new_message'
}




