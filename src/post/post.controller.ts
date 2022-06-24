import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Res,
    Query,
    UseGuards,
    Redirect,
  } from '@nestjs/common';
  import { PostService } from './post.service';
  import 'dotenv/config';
  
  @Controller('post')
  export class PostController {
    constructor(private postService: PostService) {}

    @Post('/test')
    test(@Req() req: any, @Res() res: any): void {
        
        var test = this.postService.writePost(req.body); 
        console.log("/test");
        // this.postService.getMountain();
        console.log(req.body);
        return res.status(200).send();
    }
    
    @Post('/create')
    createPost(@Req() req: any, @Res() res: any): void {
        
        this.postService.findAll();
        console.log("/create");
        console.log(req.body);
        return res.status(200).send();
    }

    @Post('/update')
    updatePost(@Res() res: any): void {
        console.log("/update");
        return res.status(200).send();
    }

    @Post('/delete')
    deletePost(@Res() res: any): void {
        console.log("/delete");
        return res.status(200).send();
    }
  }
  