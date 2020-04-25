import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewImagesPage } from './view-images.page';

describe('ViewImagesPage', () => {
  let component: ViewImagesPage;
  let fixture: ComponentFixture<ViewImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
