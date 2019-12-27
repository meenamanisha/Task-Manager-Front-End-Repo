import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManHistComponent } from './man-hist.component';

describe('ManHistComponent', () => {
  let component: ManHistComponent;
  let fixture: ComponentFixture<ManHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
