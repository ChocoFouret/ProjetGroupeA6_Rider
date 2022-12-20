import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompaniesComponent } from './management-companies.component';

describe('ManagementCompaniesComponent', () => {
  let component: ManagementCompaniesComponent;
  let fixture: ComponentFixture<ManagementCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
