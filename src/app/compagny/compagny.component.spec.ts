import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagnyComponent } from './compagny.component';

describe('CompagnyComponent', () => {
  let component: CompagnyComponent;
  let fixture: ComponentFixture<CompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
