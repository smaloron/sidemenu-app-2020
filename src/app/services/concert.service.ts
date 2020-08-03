import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

const URL_BASE = 'http://localhost:3000/';

const URL_CONCERT = URL_BASE + 'concerts/?_expand=groupe&_expand=salle';

const URL_GROUPE = URL_BASE + 'groupes';

const URL_SALLE = URL_BASE + 'salles';

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
        this.http.get(URL_CONCERT).subscribe((data: any) => {
            this.listeConcert = data.map((concert) => {
                return this.hydrate(concert);
            });

            this.concertChange.next(this.listeConcert);
        });
    }

    insertConcert(concert){
        this.http.post(URL_CONCERT, concert).subscribe((data: any) => {
            console.log(data);
            this.chargementConcert();
        });
    }

    insertGroupe(groupe){
        this.http.post(URL_GROUPE, groupe).subscribe(() => {
            this.chargementGroupe();
        });
    }

    suppressionConcert(id: number){
        this.http.delete(URL_BASE + 'concerts/' + id).subscribe(() => {
            this.chargementConcert();
        });
    }

    calculMoyenneGroupe(groupe: string){
        // Filtrage de la liste
        const concertGroupe = this.listeConcert.filter( (item: ConcertInterface) => item.groupe === groupe);
        const nbConcerts = concertGroupe.length;
        const sommeNotes = concertGroupe.map( (item) => item.note)
            .reduce( (total, current) => total + current);

        return sommeNotes / nbConcerts;
    }
}
