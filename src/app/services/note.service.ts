import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

export interface NoteInterface {
    id: number;
    title: string;
    image: string;
    userId: number;
}

const URL = 'http://localhost:3000/notes/';

@Injectable({
    providedIn: 'root'
})
export class NoteService {

    // Stockage de la liste des notes
    public noteList: NoteInterface[] = [];

    // Emetteur de notification
    public noteListChanged: Subject<NoteInterface[]>;

    constructor(private userService: UserService,
                private http: HttpClient) {
        this.noteListChanged = new Subject<NoteInterface[]>();

        this.userService.userChanged.subscribe((user) => {
            this.loadNotes();
        });
    }

    // Chargement des données
    public loadNotes() {

        this.http.get(`${URL}?userId=${this.userService.getCurrentUser().id}`)
            .subscribe(
                (data: NoteInterface[]) => {
                    this.noteList = data;
                    this.noteListChanged.next(data);
                }
            );
    }

    public addNote(note: NoteInterface) {
        note.userId = this.userService.getCurrentUser().id;
        this.http.post(URL, note).subscribe(
            (data: NoteInterface) => {
                this.noteList.push(data);
                this.noteListChanged.next(this.noteList);
            }
        );
    }

}
