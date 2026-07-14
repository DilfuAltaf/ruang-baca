import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Post()
  async createBook(@Body() data: any) {
    return this.booksService.createBook(data);
  }
}
