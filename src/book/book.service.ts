import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async CreateBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async UpdateBook(id: string, book: Book): Promise<Book> {
    const updateBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    return updateBook;
  }

  async deleteBook(id: string): Promise<Book> {
    const delBook = await this.bookModel.findByIdAndDelete(id);
    return delBook;
  }
}
