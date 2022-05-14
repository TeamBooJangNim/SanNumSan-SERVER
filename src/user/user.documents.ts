export class UserDocument {
  static collectionName = 'member';

  id: number;
  name: string;
  code: string;
  provider: string;
}
