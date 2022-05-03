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
import { AuthService } from './auth.service';
import { User } from '../user/user.entities';
import 'dotenv/config';
import { KakaoCodeDto, KakaoIdDto, KakaoTokenDto } from './dto/auth.kakao.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAll(): User[] {
    return this.authService.getAll();
  }

  @Get('/kakaologin')
  loginkakao(@Res() res: any): void {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_KEY}&redirect_uri=${process.env.KAKAO_URI}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakao/callback')
  async kakaologin(@Query() query: KakaoCodeDto): Promise<User> {
    const code: string = query['code'];
    const res: KakaoTokenDto = await this.authService.getKakaoAccessToken(
      code,
      process.env.KAKAO_KEY,
      process.env.KAKAO_URI,
    );
    const usercode: KakaoIdDto = await this.authService.getKakaoUserCode(
      res.access_token,
    );
    return this.authService.getUserByUserCode(usercode);
  }

  @Post('/kakao/register')
  kakaoregister(@Body() body: KakaoIdDto): User {
    return this.authService.register(body);
  }
}
