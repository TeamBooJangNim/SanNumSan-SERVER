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
import {
  KakaoAuthDto,
  KakaoCodeDto,
  KakaoIdDto,
  KakaoRegDto,
  KakaoTokenDto,
} from '../dto/auth.kakao.dto';
import statusCode from 'src/constants/statusCode';
import util from 'src/util/util';
import message from 'src/constants/responseMessage';
import jwtHandlers from 'src/util/jwtHandlers';
import { user } from 'firebase-functions/v1/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/kakaologin')
  loginkakao(@Res() res: any): void {
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_KEY}&redirect_uri=${process.env.KAKAO_URI}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakao/callback')
  async kakaoLogin(
    @Query() query: KakaoCodeDto,
    @Res() response: any,
  ): Promise<any> {
    const code: string = query.code;
    const token: KakaoTokenDto = await this.authService.getKakaoAccessToken(
      code,
      process.env.KAKAO_KEY,
      process.env.KAKAO_URI,
    );
    const usercode: KakaoIdDto = await this.authService.getKakaoUserCode(
      token.access_token,
    );
    const result: Promise<UserDocument> =
      await this.authService.getUserByUserCode(usercode);
    if (!result) {
      return response
        .status(statusCode.OK)
        .send(
          util.fail(statusCode.OK, message.NEED_REGISTER, token.access_token),
        );
    } else {
      const usercode: number = result['code'];
      const username: string = result['name'];
      const accessToken = jwtHandlers.sign({
        code: usercode,
        name: username,
      });
      return response
        .status(statusCode.OK)
        .send(util.fail(statusCode.OK, message.LOGIN_SUCCESS, { accessToken }));
    }
  }

  @Post('/kakao/register')
  async kakaoRegister(
    @Body() body: KakaoAuthDto,
    @Res() response: any,
  ): Promise<any> {
    const kakaoProfile: KakaoIdDto = await this.authService.getKakaoUserCode(
      body.access_token,
    );
    const targetUser: KakaoRegDto = {
      name: body.name,
      code: kakaoProfile.id,
      provider: body.provider,
    };

    const newUser: Promise<UserDocument> = await this.authService.register(
      targetUser,
    );
    const usercode: number = newUser['code'];
    const username: string = newUser['name'];
    const accessToken = jwtHandlers.sign({
      code: usercode,
      name: username,
    });
    return response.status(statusCode.OK).send(
      util.fail(statusCode.OK, message.REGISTER_SUCCESS, {
        newUser: user,
        accessToken,
      }),
    );
  }
}
