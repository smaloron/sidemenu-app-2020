import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteListPage } from './note-list.page';

describe('NoteListPage', () => {
  let component: NoteListPage;
  let fixture: ComponentFixture<NoteListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
