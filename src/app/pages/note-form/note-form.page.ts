import {Component, OnInit} from '@angular/core';
import {NoteInterface, NoteService} from '../../services/note.service';

import {Router} from '@angular/router';

@Component({
    selector: 'app-note-form',
    templateUrl: './note-form.page.html',
    styleUrls: ['./note-form.page.scss'],
})
export class NoteFormPage implements OnInit {

    public note: NoteInterface = {
        title: '',
        id: null,
        userId: null,
        image: null
    };

    constructor(private noteService: NoteService, private router: Router) {
    }

    ngOnInit() {
    }

    validate(){
      this.noteService.addNote(this.note);
      this.router.navigateByUrl('/note-list');
    }

}
