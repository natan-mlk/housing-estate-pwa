import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutScrollableComponent } from './layout-scrollable.component';

describe('LayoutScrollableComponent', () => {
  let component: LayoutScrollableComponent;
  let fixture: ComponentFixture<LayoutScrollableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutScrollableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutScrollableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
