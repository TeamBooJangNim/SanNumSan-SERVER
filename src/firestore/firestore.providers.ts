import { MountainDocument } from 'src/mountain/mountain.document';
import { PostDocument } from 'src/post/post.documents';
import { UserDocument } from 'src/user/user.documents';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  PostDocument.collectionName,
  MountainDocument.collectionName,
  UserDocument.collectionName,
];
