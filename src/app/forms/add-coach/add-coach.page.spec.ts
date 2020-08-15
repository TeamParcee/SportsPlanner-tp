import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCoachPage } from './add-coach.page';

describe('AddCoachPage', () => {
  let component: AddCoachPage;
  let fixture: ComponentFixture<AddCoachPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoachPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCoachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
