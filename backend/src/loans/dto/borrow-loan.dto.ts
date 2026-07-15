import { IsString, IsNotEmpty } from 'class-validator';

export class BorrowLoanDto {
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @IsString()
  @IsNotEmpty()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  memberName: string;

  @IsString()
  @IsNotEmpty()
  bookTitle: string;
}
