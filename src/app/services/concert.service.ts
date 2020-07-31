import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

const URL = 'http://localhost:3000/concerts/?_expand=groupe&_expand=salle';

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

    constructor(private http: HttpClient) {
        this.concertChange = new Subject<ConcertInterface[]>();
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

    public chargementConcert() {
        this.http.get(URL).subscribe((data: any) => {
            this.listeConcert = data.map ( (concert) => {
              return this.hydrate(concert);
            });

            this.concertChange.next(this.listeConcert);
        });
    }
}
