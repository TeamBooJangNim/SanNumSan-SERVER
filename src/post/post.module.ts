import { Module } from '@nestjs/common';
import { MountainDocument } from 'src/mountain/mountain.document';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PostModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
