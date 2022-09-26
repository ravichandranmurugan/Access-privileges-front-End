import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevilegesAccessComponent } from './previleges-access.component';

describe('PrevilegesAccessComponent', () => {
  let component: PrevilegesAccessComponent;
  let fixture: ComponentFixture<PrevilegesAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevilegesAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevilegesAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
