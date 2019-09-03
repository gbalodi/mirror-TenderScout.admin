import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClaimedComponent } from './list-claimed.component';

describe('ListClaimedComponent', () => {
  let component: ListClaimedComponent;
  let fixture: ComponentFixture<ListClaimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClaimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
