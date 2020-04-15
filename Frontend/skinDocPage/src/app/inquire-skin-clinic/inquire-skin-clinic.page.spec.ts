import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InquireSkinClinicPage } from './inquire-skin-clinic.page';

describe('InquireSkinClinicPage', () => {
  let component: InquireSkinClinicPage;
  let fixture: ComponentFixture<InquireSkinClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquireSkinClinicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InquireSkinClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
