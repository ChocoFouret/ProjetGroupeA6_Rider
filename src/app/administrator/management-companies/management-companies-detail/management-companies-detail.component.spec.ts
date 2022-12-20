import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCompaniesDetailComponent } from './management-companies-detail.component';

describe('ManagementCompaniesDetailComponent', () => {
  let component: ManagementCompaniesDetailComponent;
  let fixture: ComponentFixture<ManagementCompaniesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCompaniesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementCompaniesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
