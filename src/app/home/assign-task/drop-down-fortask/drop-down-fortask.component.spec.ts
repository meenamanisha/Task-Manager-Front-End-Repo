import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownFortaskComponent } from './drop-down-fortask.component';

describe('DropDownFortaskComponent', () => {
  let component: DropDownFortaskComponent;
  let fixture: ComponentFixture<DropDownFortaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownFortaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownFortaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
