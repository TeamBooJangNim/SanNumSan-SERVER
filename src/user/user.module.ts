import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
})
export class UserModule {}
