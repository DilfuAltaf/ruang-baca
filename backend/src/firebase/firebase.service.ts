import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
      const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
      let privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

      if (projectId && clientEmail && privateKey) {
        // Fix newline characters mapping from Vercel env
        privateKey = privateKey.replace(/\\n/g, '\n');
        
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });
        console.log('Firebase initialized via .env variables!');
      } else {
        // Fallback to local json for local development
        try {
          const serviceAccount = require('../../firebase-key.json');
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
          console.log('Firebase initialized via local firebase-key.json');
        } catch (error) {
          console.error('FIREBASE INIT ERROR: Missing env variables and local JSON not found.');
        }
      }
    }
  }

  /**
   * Returns the Firestore instance
   */
  getFirestore(): Firestore {
    return getFirestore();
  }

  /**
   * Returns the Firebase Auth instance
   */
  getAuth(): Auth {
    return getAuth();
  }
}
