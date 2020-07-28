import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

export interface AuthorInterface {
    name: string;
    id: number;
}

const URL = 'http://localhost:3000/users/';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public authorList: AuthorInterface[] = [];

    public authorListChanged: Subject<AuthorInterface[]>;

    public userChanged: Subject<AuthorInterface>;

    private currentUser: AuthorInterface = {
        id: null,
        name: 'Anonyme'
    };


    constructor(private http: HttpClient) {
        this.userChanged = new Subject<AuthorInterface>();
        this.authorListChanged = new Subject<AuthorInterface[]>();
    }

    public loadAuthors() {
        this.http.get(URL).subscribe(
            (data: AuthorInterface[]) => {
                this.authorList = data;
                this.authorListChanged.next(data);
            }
        );
    }


    public register(userData) {
        console.log(userData);
        this.http.post(URL, userData).subscribe(
            (data: AuthorInterface) => {
                console.log(data);
                this.userChanged.next(data);
                this.currentUser = data;
                // Modif de la liste des auteurs et notification aux abonnés
                this.authorList.push(data);
                this.authorListChanged.next(this.authorList);

            }, (err) => console.log(err));
    }

    public getCurrentUser() {
        return this.currentUser;
    }

    public setCurrentUser(author: AuthorInterface){
      this.currentUser = author;
      this.userChanged.next(author);
    }
}
