import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleaccessComponent } from './moduleaccess.component';

describe('ModuleaccessComponent', () => {
  let component: ModuleaccessComponent;
  let fixture: ComponentFixture<ModuleaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleaccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
