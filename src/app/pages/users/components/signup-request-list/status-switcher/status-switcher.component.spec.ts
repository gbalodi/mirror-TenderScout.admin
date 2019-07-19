import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StatusSwitcherComponent} from './status-switcher.component';

describe('HistoryModalComponent', () => {
    let component: StatusSwitcherComponent;
    let fixture: ComponentFixture<StatusSwitcherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusSwitcherComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
