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
import { UserDocument } from '../user/user.documents';
import 'dotenv/config';
import { KakaoCodeDto, KakaoIdDto, KakaoTokenDto } from './dto/auth.kakao.dto';
import statusCode from 'src/constants/statusCode';
import util from 'src/util/util';
import message from 'src/constants/responseMessage';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/kakaologin')
  loginkakao(@Res() res: any): void {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_KEY}&redirect_uri=${process.env.KAKAO_URI}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakao/callback')
  async kakaologin(
    @Query() query: KakaoCodeDto,
    @Res() response: any,
  ): Promise<any> {
    const code: string = query.code;
    const res: KakaoTokenDto = await this.authService.getKakaoAccessToken(
      code,
      process.env.KAKAO_KEY,
      process.env.KAKAO_URI,
    );
    const usercode: KakaoIdDto = await this.authService.getKakaoUserCode(
      res.access_token,
    );
    const result: Promise<any> = await this.authService.getUserByUserCode(
      usercode,
    );
    if (!result)
      return response
        .status(statusCode.OK)
        .send(util.fail(statusCode.OK, message.NEED_REGISTER, usercode.id));
    else
      return response
        .status(statusCode.OK)
        .send(util.fail(statusCode.OK, message.LOGIN_SUCCESS, result));
  }

  @Post('/kakao/register')
  kakaoregister(@Body() body: KakaoIdDto): Promise<UserDocument> {
    return this.authService.register(body);
  }
}
