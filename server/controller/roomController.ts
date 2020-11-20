import {User, Room} from "../../common/types";

export class RoomController {
    private static room: Room = [];
    public static getUsers(): Room  {
        return this.room;
    }
    public static createUser(id: string, name: string): User {
        return {
            id,
            name
        }
    }
    public static getUser(id: string): User  {
        return this.room.find((u) => u.id === id) || this.createUser('-1', 'unknown');
    }
    public static addUser(user: User): User  {
        this.room.push(user);
        return user;
    }
    public static removeUser(id: string): User  {
        const user: User = this.getUser(id);
        this.room = this.room.filter((u) => u.id !== id);
        return user;
    }
}