import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as serviceAccount from '../../firebase-key.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    // Initialize the Firebase admin app only if there are no initialized apps
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
      });
    }
  }

  /**
   * Returns the Firestore instance
   */
  getFirestore(): Firestore {
    return getFirestore();
  }
}
