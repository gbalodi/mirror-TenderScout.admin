import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingRequestComponent } from './rating-request.component';

describe('RatingRequestComponent', () => {
  let component: RatingRequestComponent;
  let fixture: ComponentFixture<RatingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
