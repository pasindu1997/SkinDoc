import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsSecondPage } from './news-second.page';

describe('NewsSecondPage', () => {
  let component: NewsSecondPage;
  let fixture: ComponentFixture<NewsSecondPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSecondPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsSecondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
