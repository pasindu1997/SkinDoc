import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicRatePage } from './clinic-rate.page';

describe('ClinicRatePage', () => {
  let component: ClinicRatePage;
  let fixture: ComponentFixture<ClinicRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicRatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
