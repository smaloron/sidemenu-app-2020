export interface ResponseJson {
    totalPages: number;
    currentPage: number;
    data: BookJson[];
}

export interface BookJson {
    _id: number;
    title: string;
    isbn: string;
    pageCount: number;
    pubishedDate: Date;
    thumbnailUrl: string;
    longDescription: string;
    status: string;
    authors: string[];
    categories: string[];
}


export class Book {

    id: number;
    title: string;
    isbn: string;
    pageCount: number;
    pubishedDate: Date;
    thumbnailUrl: string;
    longDescription: string;
    status: string;
    authors: string[] = [];
    categories: string[] = [];

    public hydrate(data: BookJson) {

        this.id = data._id;
        this.title = data.title;
        this.isbn = data.isbn;
        this.pageCount = data.pageCount;
        this.pubishedDate = new Date(data.pubishedDate);
        this.thumbnailUrl = data.thumbnailUrl;
        this.longDescription = data.longDescription;
        this.status = data.status;
        this.authors = data.authors;
        this.categories = data.categories;
    }

}
