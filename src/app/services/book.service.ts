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

    public search: string;

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

    private getURL() {
        let url = BOOK_URL + '?page=' + this.currentPage;
        if (this.search) {
            url += '&search=' + this.search;
        }

        return url;
    }

    public reset(){
        this.bookList = [];
        this.currentPage = 0;
        this.totalPages = null;
    }

    private getBooks(callback = null) {
        this.currentPage++;
        this.http.get(this.getURL()).subscribe(
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
