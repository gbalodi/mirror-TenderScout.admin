import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScraperListsComponent } from './scraper-lists.component';

describe('ScraperListsComponent', () => {
  let component: ScraperListsComponent;
  let fixture: ComponentFixture<ScraperListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScraperListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScraperListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
