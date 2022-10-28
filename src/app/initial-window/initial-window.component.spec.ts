import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialWindowComponent } from './initial-window.component';

describe('InitialWindowComponent', () => {
  let component: InitialWindowComponent;
  let fixture: ComponentFixture<InitialWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
