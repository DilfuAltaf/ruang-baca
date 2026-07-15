import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BooksService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Fetches all books from the Firestore 'books' collection
   * and maps the document ID along with its data.
   */
  async getAllBooks(search?: string, category?: string): Promise<any[]> {
    const firestore = this.firebaseService.getFirestore();
    let query: FirebaseFirestore.Query = firestore.collection('books');

    if (category) {
      query = query.where('category', '==', category);
    }

    if (search) {
      query = query
        .where('title', '>=', search)
        .where('title', '<=', search + '\uf8ff');
    }

    const snapshot = await query.get();
    
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }

  /**
   * Fetches a single book by ID
   */
  async getBookById(id: string) {
    const firestore = this.firebaseService.getFirestore();
    const doc = await firestore.collection('books').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Book with ID ${id} not found.`);
    }
    return {
      id: doc.id,
      ...doc.data(),
    };
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
