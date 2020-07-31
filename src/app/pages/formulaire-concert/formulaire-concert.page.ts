import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ConcertService} from '../../services/concert.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-formulaire-concert',
    templateUrl: './formulaire-concert.page.html',
    styleUrls: ['./formulaire-concert.page.scss'],
})
export class FormulaireConcertPage implements OnInit {

    note: number;

    constructor(public concertService: ConcertService,
                private router: Router,
                private alertCtrl: AlertController) {
    }

    ngOnInit() {
        this.concertService.chargementGroupe();
        this.concertService.chargementSalle();
    }

    onSubmit(form: NgForm) {
        console.log(this.note);
        const userInput = form.value;
        userInput.note = this.note;
        // console.log(userInput);

        console.log(form);
        if (!form.errors && form.touched) {
            this.concertService.insertConcert(userInput);
            this.router.navigateByUrl('/liste-concert');
        }
    }

    async ajoutGroupe() {
        const saisie = await this.alertCtrl.create({
            header: 'Saisir le nom du nouveau groupe',
            inputs: [
                {name: 'nom', type: 'text', placeholder: 'Faut taper ici'}
            ],
            buttons: [
                {text: 'Annuler', role: 'cancel'},
                {
                    text: 'Valider', handler: (userInput) => {
                        console.log(userInput);
                        this.concertService.insertGroupe(userInput);
                    }
                }
            ]
        });

        await saisie.present();
    }

}
