import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrillPage } from './drill.page';

describe('DrillPage', () => {
  let component: DrillPage;
  let fixture: ComponentFixture<DrillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
