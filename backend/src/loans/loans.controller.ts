import { Controller, Post, Body } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('borrow')
  async borrowBook(
    @Body('bookId') bookId: string,
    @Body('memberId') memberId: string,
    @Body('memberName') memberName: string,
    @Body('bookTitle') bookTitle: string,
  ) {
    return this.loansService.borrowBook(bookId, memberId, memberName, bookTitle);
  }

  @Post('return')
  async returnBook(@Body('loanId') loanId: string) {
    return this.loansService.returnBook(loanId);
  }
}
