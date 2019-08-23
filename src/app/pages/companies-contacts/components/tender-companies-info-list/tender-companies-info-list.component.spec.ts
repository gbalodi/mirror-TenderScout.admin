import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderCompaniesInfoListComponent } from './tender-companies-info-list.component';

describe('TenderCompaniesInfoListComponent', () => {
  let component: TenderCompaniesInfoListComponent;
  let fixture: ComponentFixture<TenderCompaniesInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderCompaniesInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderCompaniesInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
