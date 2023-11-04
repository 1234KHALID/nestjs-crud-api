import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createDTO } from './dto/create-book.dto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async GetAllBook(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  async createBook(@Body() book: createDTO): Promise<Book> {
    return await this.bookService.CreateBook(book);
  }

  @Get(':id')
  async findBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findBook(id);
  }
}
