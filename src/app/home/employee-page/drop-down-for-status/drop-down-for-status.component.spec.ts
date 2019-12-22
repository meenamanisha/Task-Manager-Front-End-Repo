import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownForStatusComponent } from './drop-down-for-status.component';

describe('DropDownForStatusComponent', () => {
  let component: DropDownForStatusComponent;
  let fixture: ComponentFixture<DropDownForStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownForStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownForStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
