import { Injectable, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class LoansService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async borrowBook(bookId: string, memberId: string, memberName: string, bookTitle: string) {
    const firestore = this.firebaseService.getFirestore();
    const bookRef = firestore.collection('books').doc(bookId);
    const loanRef = firestore.collection('loans').doc();

    await firestore.runTransaction(async (transaction) => {
      const bookDoc = await transaction.get(bookRef);

      if (!bookDoc.exists) {
        throw new BadRequestException('Book does not exist.');
      }

      const bookData = bookDoc.data();
      const stokTersedia = bookData?.stok_tersedia || 0;

      if (stokTersedia <= 0) {
        throw new BadRequestException('Book is out of stock.');
      }

      // Decrement stock
      transaction.update(bookRef, {
        stok_tersedia: stokTersedia - 1,
      });

      // Create loan document
      transaction.set(loanRef, {
        bookId,
        bookTitle,
        memberId,
        memberName,
        status: 'DIPINJAM',
        tanggal_pinjam: new Date().toISOString(),
      });
    });

    return { message: 'Book borrowed successfully', loanId: loanRef.id };
  }

  async returnBook(loanId: string) {
    const firestore = this.firebaseService.getFirestore();
    const loanRef = firestore.collection('loans').doc(loanId);

    await firestore.runTransaction(async (transaction) => {
      const loanDoc = await transaction.get(loanRef);

      if (!loanDoc.exists) {
        throw new BadRequestException('Loan record does not exist.');
      }

      const loanData = loanDoc.data();
      if (loanData?.status === 'DIKEMBALIKAN') {
        throw new BadRequestException('Book has already been returned.');
      }

      const bookRef = firestore.collection('books').doc(loanData?.bookId);
      const bookDoc = await transaction.get(bookRef);

      if (!bookDoc.exists) {
        throw new BadRequestException('Associated book does not exist.');
      }

      const bookData = bookDoc.data();
      const stokTersedia = bookData?.stok_tersedia || 0;

      // Increment stock
      transaction.update(bookRef, {
        stok_tersedia: stokTersedia + 1,
      });

      // Update loan status
      transaction.update(loanRef, {
        status: 'DIKEMBALIKAN',
        tanggal_dikembalikan: new Date().toISOString(),
      });
    });

    return { message: 'Book returned successfully', loanId };
  }
}
