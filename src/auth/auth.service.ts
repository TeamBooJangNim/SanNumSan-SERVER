import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserDocument } from '../user/user.documents';
import fetch from 'cross-fetch';
import { KakaoIdDto, KakaoTokenDto } from './dto/auth.kakao.dto';
import { CollectionReference } from '@google-cloud/firestore';
import db from 'src/util/db';
import responseMessage from 'src/constants/responseMessage';

@Injectable()
export class AuthService {
  private users: UserDocument[] = [];
  private logger: Logger = new Logger(AuthService.name);
  // constructor(
  //   @Inject(UserDocument.collectionName)
  //   private memberCollection: CollectionReference<UserDocument>,
  // ) {}
  private memberCollection = db.collection('member');

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

  async getUserByUserCode(usercode): Promise<any> {
    let user: UserDocument;
    const code: number = usercode.id;
    const docs: any = await this.memberCollection
      .where('code', '==', code)
      .get();
    docs.forEach((doc) => {
      user = doc.data();
    });
    return user;
  }

  async register(userData): Promise<UserDocument> {
    const name = 'test';
    const newUser = {
      name: name,
      code: userData.id,
      provider: 'kakao',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    await this.memberCollection.add(newUser);
    return newUser;
  }
}
