import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDrillPage } from './view-drill.page';

describe('ViewDrillPage', () => {
  let component: ViewDrillPage;
  let fixture: ComponentFixture<ViewDrillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDrillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
