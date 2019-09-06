import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjestorsListComponent } from './injestors-list.component';

describe('InjestorsListComponent', () => {
  let component: InjestorsListComponent;
  let fixture: ComponentFixture<InjestorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjestorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjestorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
