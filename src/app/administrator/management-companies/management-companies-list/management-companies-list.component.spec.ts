import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompaniesListComponent } from './management-companies-list.component';

describe('ManagementCompaniesListComponent', () => {
  let component: ManagementCompaniesListComponent;
  let fixture: ComponentFixture<ManagementCompaniesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompaniesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompaniesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
