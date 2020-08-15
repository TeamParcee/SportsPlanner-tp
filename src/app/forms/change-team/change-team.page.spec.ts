import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeTeamPage } from './change-team.page';

describe('ChangeTeamPage', () => {
  let component: ChangeTeamPage;
  let fixture: ComponentFixture<ChangeTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTeamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
