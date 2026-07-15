import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    // Initialize the Firebase admin app only if there are no initialized apps
    if (getApps().length === 0) {
      let serviceAccountConfig: ServiceAccount;
      
      if (process.env.FIREBASE_CREDENTIALS) {
        serviceAccountConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS);
      } else {
        serviceAccountConfig = require('../../firebase-key.json');
      }

      initializeApp({
        credential: cert(serviceAccountConfig),
      });
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
