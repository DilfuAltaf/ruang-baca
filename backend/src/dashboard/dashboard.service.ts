import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class DashboardService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getOverviewStats(): Promise<{ totalBooks: number; activeLoans: number }> {
    const firestore = this.firebaseService.getFirestore();

    const booksSnapshot = await firestore.collection('books').count().get();
    const totalBooks = booksSnapshot.data().count;

    const loansSnapshot = await firestore
      .collection('loans')
      .where('status', '==', 'DIPINJAM')
      .count()
      .get();
    const activeLoans = loansSnapshot.data().count;

    return { totalBooks, activeLoans };
  }
}
