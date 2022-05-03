import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entities';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    const user = this.users.find((user) => user.id === Number(id));
    if (!user) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    return user;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.users = this.users.filter((user) => user.id !== Number(id));
    return true;
  }

  create(userData: any) {
    this.users.push({
      id: this.users.length + 1,
      ...userData,
    });
  }

  update(id: number, updateData: any) {
    const user = this.getOne(id);
    this.deleteOne(id);
    this.users.push({ ...user, ...updateData });
  }
}
