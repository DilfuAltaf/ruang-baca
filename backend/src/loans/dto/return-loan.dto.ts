import { IsString, IsNotEmpty } from 'class-validator';

export class ReturnLoanDto {
  @IsString()
  @IsNotEmpty()
  loanId: string;
}
