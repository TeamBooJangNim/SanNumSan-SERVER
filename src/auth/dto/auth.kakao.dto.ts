import { TimestampProvider } from 'rxjs';

export class KakaoIdDto {
  id: number;
  connected_at: TimestampProvider;
}

export class KakaoCodeDto {
  code: string;
}

export class KakaoTokenDto {
  access_token: string;
}
