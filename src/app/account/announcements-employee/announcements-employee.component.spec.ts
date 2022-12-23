import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsEmployeeComponent } from './announcements-employee.component';

describe('AnnouncementsComponent', () => {
  let component: AnnouncementsEmployeeComponent;
  let fixture: ComponentFixture<AnnouncementsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
