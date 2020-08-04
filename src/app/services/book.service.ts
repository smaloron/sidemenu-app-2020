import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Book, BookJson, ResponseJson} from '../models/book';

const BASE_URL = 'http://localhost:3000/';
const BOOK_URL = BASE_URL + 'books/';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    public bookChanged: Subject<Book[]>;

    private bookList: Book[] = [];

    private currentPage = 0;

    private totalPages: number = null;

    constructor(private http: HttpClient) {
        this.bookChanged = new Subject<Book[]>();
    }

    public loadBooks(callback = null) {
        if (this.hasMoreBooks()) {
            this.getBooks(callback);
        }
    }

    public hasMoreBooks() {
        return this.currentPage < this.totalPages || this.currentPage === 0;
    }

    private getBooks(callback = null) {
        this.currentPage++;
        this.http.get(BOOK_URL + '?page=' + this.currentPage).subscribe(
            (response: ResponseJson) => {

                this.totalPages = response.totalPages;
                let bookList: Book[];

                bookList = response.data.map(item => {
                    const book = new Book();
                    book.hydrate(item);
                    return book;
                });

                this.bookList = this.bookList.concat(bookList);

                this.bookChanged.next(this.bookList);

                if (callback) {
                    callback();
                }
            }
        );
    }

    public getOneBookById(id: number) {
        return this.bookList.find(item => item.id === id);
    }


}
