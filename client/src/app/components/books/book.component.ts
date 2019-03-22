import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  books: Book[] = null;
  submitted = false;
  bookFormModel: Book = new Book();
  maxLength = 30;
  categories = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Sport' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, this.noWhitespaceValidator]],
      category: [this.categories[0].name, Validators.required],
      description: ['', [Validators.required, this.noWhitespaceValidator]],
    });
    this.getBooks();
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get f() { return this.bookForm.controls; }

  saveBook() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    this.bookService.createBook(this.bookForm.value).subscribe(res => {
      if (res['success']) {
        this.books.push(res['data']);
        this.resetBookForm();
      } else {
        alert(res['message']);
      }
    });
  }

  getBooks() {
    this.bookService.getBooks().subscribe(res => {
      res['success'] ? this.books = res['data'] : alert(res['message']);
    });
  }

  resetBookForm() {
    this.bookForm.reset();
    this.bookForm.get('category').setValue(this.categories[0].name);
    this.submitted = false;
  }
}
