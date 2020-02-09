import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyReportPage } from './my-report.page';

describe('MyReportPage', () => {
  let component: MyReportPage;
  let fixture: ComponentFixture<MyReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
