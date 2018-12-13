import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestUpgradeComponent } from './request-upgrade.component';

describe('RequestAssistanceComponent', () => {
  let component: RequestUpgradeComponent;
  let fixture: ComponentFixture<RequestUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
