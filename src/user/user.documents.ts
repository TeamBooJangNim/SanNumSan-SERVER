export class UserDocument {
  static collectionName = 'member';

  name: string;
  code: string;
  provider: string;
  created: string;
  updated: string;
}
