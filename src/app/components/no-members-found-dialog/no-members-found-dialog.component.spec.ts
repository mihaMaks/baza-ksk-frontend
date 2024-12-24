import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMembersFoundDialogComponent } from './no-members-found-dialog.component';

describe('NoMembersFoundDialogComponent', () => {
  let component: NoMembersFoundDialogComponent;
  let fixture: ComponentFixture<NoMembersFoundDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoMembersFoundDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoMembersFoundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
