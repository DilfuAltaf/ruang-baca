import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BooksService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Fetches all books from the Firestore 'books' collection
   * and maps the document ID along with its data.
   */
  async getAllBooks(): Promise<any[]> {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await firestore.collection('books').get();
    
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }

  /**
   * Creates a new book in the Firestore 'books' collection
   */
  async createBook(data: any) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = await firestore.collection('books').add(data);
    return {
      id: docRef.id,
      ...data,
    };
  }
}
