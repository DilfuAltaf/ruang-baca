import { Controller, Get, Post, Body, UseGuards, Query, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.booksService.getAllBooks(search, category);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createBook(@Body() data: CreateBookDto) {
    return this.booksService.createBook(data);
  }
}
