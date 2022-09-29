import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBottomHeaderComponent } from './layout-bottom-header.component';

describe('LayoutBottomHeaderComponent', () => {
  let component: LayoutBottomHeaderComponent;
  let fixture: ComponentFixture<LayoutBottomHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutBottomHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBottomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
