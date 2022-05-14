import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserDocument } from './user.documents';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): UserDocument[] {
    return this.userService.getAll();
  }

  // @Get('/:id')
  // getOne(@Param('id') userId: number): UserDocument {
  //   return this.userService.getOne(userId);
  // }

  // @Post()
  // create(@Body() userData: any) {
  //   return this.userService.create(userData);
  // }

  // @Delete('/:id')
  // remove(@Param('id') userId: number) {
  //   return this.userService.deleteOne(userId);
  // }

  // @Patch('/:id')
  // patch(@Param('id') userId: number, @Body() updateData: any) {
  //   return this.userService.update(userId, updateData);
  // }
}
