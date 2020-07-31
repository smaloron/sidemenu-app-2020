import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyMapPage } from './my-map.page';

describe('MyMapPage', () => {
  let component: MyMapPage;
  let fixture: ComponentFixture<MyMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
