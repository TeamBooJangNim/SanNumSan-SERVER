import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entities';
import fetch from 'cross-fetch';
import { KakaoIdDto, KakaoTokenDto } from './dto/auth.kakao.dto';

@Injectable()
export class AuthService {
  private users: User[] = [];

  async getKakaoAccessToken(
    code: string,
    client_id: string,
    redirect_uri: string,
  ): Promise<KakaoTokenDto> {
    return await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    ).then((res) => res.json());
  }

  async getKakaoUserCode(access_token: string): Promise<KakaoIdDto> {
    return await fetch('https://kapi.kakao.com/v2/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then((res) => res.json());
  }

  getUserByUserCode(usercode): User {
    const user: User = this.users.find((user) => user.code === usercode.id);
    if (!user) {
      throw new NotFoundException(
        `user code ${usercode.id} not found, register requested`,
      );
    }
    return user;
  }

  register(userData): User {
    this.users.push({
      id: this.users.length + 1,
      name: 'test',
      code: userData.id,
      provider: 'kakao',
    });
    return userData;
  }
}
