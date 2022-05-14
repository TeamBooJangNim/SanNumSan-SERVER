import { PassportStrategy } from '@nestjs/passport';
import {
    Injectable,
    Inject,
    Logger,
    InternalServerErrorException,
  } from '@nestjs/common';

import admin from 'firebase-admin';
import fetch from 'cross-fetch';
import * as dayjs from 'dayjs';
import { CollectionReference, DocumentReference, Timestamp } from '@google-cloud/firestore';
import { PostDocument } from './post.documents';
import { MountainDocument } from 'src/mountain/mountain.document';
import db from '../util/db';

@Injectable()
export class PostService {
   private logger: Logger = new Logger(PostService.name);
   constructor(
    @Inject(PostDocument.collectionName)
    private postCollection: CollectionReference<PostDocument>,
    // @Inject(MountainDocument.collectionName)
    // private mountainCollection: CollectionReference<MountainDocument>,
  ) {}
  
    async writePost(body) {
        // const name = body.name;

        const title = body.title; 
        console.log("title123: " + body.title);
        console.log(body.title);
        db.collection('post').add({
            title: title,
            created: new Date().toISOString(),
        })
        
        const desc = body.desc;
        const img = body.img;

        return 0;
    }

  async findAll(): Promise<PostDocument[]> {
    const snapshot = await this.postCollection.get();
    const posts: PostDocument[] = [];
    snapshot.forEach(doc => posts.push(doc.data()));
    return posts;
  }

  

//   async create({ id, dueDate }): Promise<PostDocument> {
//     const docRef = this.postCollection.doc(id);
//     const dueDateMillis = dayjs(dueDate).valueOf();
//     await docRef.set({
//       id: 1,
//       dueDate: Timestamp.fromMillis(dueDateMillis),
//     });
//     const todoDoc = await docRef.get();
//     const todo = todoDoc.data();
//     return todo;
//   }
// async fineOne(id: string): Promise<PostDocument> {
//     return await this.postCollection.findOne({_id: id});
// }

//    async getMountain() {
//         return this.mountainCollection.get();
//    }
}
