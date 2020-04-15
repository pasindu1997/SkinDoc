import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsThirdPage } from './news-third.page';

describe('NewsThirdPage', () => {
  let component: NewsThirdPage;
  let fixture: ComponentFixture<NewsThirdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsThirdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsThirdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
