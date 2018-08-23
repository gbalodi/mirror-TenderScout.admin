import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqsListComponent } from './reqs-list.component';

describe('ReqsListComponent', () => {
  let component: ReqsListComponent;
  let fixture: ComponentFixture<ReqsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
