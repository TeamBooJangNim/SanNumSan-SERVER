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

export class KakaoAuthDto {
  name: string;
  access_token: string;
  provider: string;
}

export class KakaoRegDto {
  name: string;
  code: number;
  provider: string;
}
