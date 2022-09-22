import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBottomFooterComponent } from './layout-bottom-footer.component';

describe('LayoutBottomFooterComponent', () => {
  let component: LayoutBottomFooterComponent;
  let fixture: ComponentFixture<LayoutBottomFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutBottomFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBottomFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
