import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancerUpdatesPage } from './cancer-updates.page';

describe('CancerUpdatesPage', () => {
  let component: CancerUpdatesPage;
  let fixture: ComponentFixture<CancerUpdatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancerUpdatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancerUpdatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
