import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

const URL = 'http://localhost:3000/concerts/?_expand=groupe&_expand=salle';

const URL_GROUPE = 'http://localhost:3000/groupes';

const URL_SALLE = 'http://localhost:3000/salles';

export interface ConcertInterface {
    id: number;
    groupe: string;
    salle: string;
    note: number;
    date: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ConcertService {

    public listeConcert: ConcertInterface[];

    public concertChange: Subject<ConcertInterface[]>;

    public salleChange: Subject<{id: number, nom: string}>;

    public groupeChange: Subject<{ id: number, nom: string }>;

    constructor(private http: HttpClient) {
        this.concertChange = new Subject<ConcertInterface[]>();
        this.groupeChange = new Subject<{ id: number, nom: string }>();
        this.salleChange = new Subject<{id: number, nom: string}>();
    }

    public hydrate(data) {
        const concert: ConcertInterface = {
            id: data.id,
            groupe: data.groupe.nom,
            salle: data.salle.nom,
            note: data.note,
            date: new Date(data.date)
        };

        return concert;
    }

    public chargementGroupe() {
        this.http.get(URL_GROUPE).subscribe((data: { id: number, nom: string }) => {
            this.groupeChange.next(data);
        });
    }

    public chargementSalle(){
        this.http.get(URL_SALLE).subscribe((data:{ id: number, nom: string }) => {
            this.salleChange.next(data);
        });
    }

    public chargementConcert() {
        this.http.get(URL).subscribe((data: any) => {
            this.listeConcert = data.map((concert) => {
                return this.hydrate(concert);
            });

            this.concertChange.next(this.listeConcert);
        });
    }

    insertConcert(concert){
        this.http.post(URL, concert).subscribe((data: any) => {
            console.log(data);
            this.chargementConcert();
        });
    }

    insertGroupe(groupe){
        this.http.post(URL_GROUPE, groupe).subscribe(() => {
            this.chargementGroupe();
        });
    }
}
