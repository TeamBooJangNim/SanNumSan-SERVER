import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entities";

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getOne(id: number): User {
    const user = this.users.find(user => user.id === Number(id));
    if (!user) {
      // 클라이언트는 error.message에 user id ${id} not found이 값이 들어갑니다. status-code는 nest가 정해준 값으로 들어갑니다
      throw new NotFoundException(`user id ${id} not found`);
    }
    return user;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.users = this.users.filter(user => user.id !== Number(id));
    return true;
  }

  create(userData: any) {
    this.users.push({
      id: this.users.length + 1,
      ...userData
    });
  }

  update(id: number, updateData: any) {
    const user = this.getOne(id);
    this.deleteOne(id);
    this.users.push({ ...user, ...updateData });
  }
}