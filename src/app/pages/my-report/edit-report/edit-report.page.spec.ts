import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditReportPage } from './edit-report.page';

describe('EditReportPage', () => {
  let component: EditReportPage;
  let fixture: ComponentFixture<EditReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
