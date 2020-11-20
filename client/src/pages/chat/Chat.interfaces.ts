export interface ChatProps {}
export interface ChatState {
    messages: string[],
    isActive: boolean
}

// Duplicate  for  ./common/types*/
// https://github.com/facebook/create-react-app/issues/8785
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