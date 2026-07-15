import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { LoansService } from './loans.service';
import { BorrowLoanDto } from './dto/borrow-loan.dto';
import { ReturnLoanDto } from './dto/return-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post('borrow')
  async borrowBook(@Body() dto: BorrowLoanDto) {
    return this.loansService.borrowBook(dto.bookId, dto.memberId, dto.memberName, dto.bookTitle);
  }

  @Post('return')
  async returnBook(@Body() dto: ReturnLoanDto) {
    return this.loansService.returnBook(dto.loanId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllLoans() {
    return this.loansService.getAllLoans();
  }

  @Get('student/:nis')
  async getStudentActiveLoans(@Param('nis') nis: string) {
    return this.loansService.getStudentActiveLoans(nis);
  }
}
