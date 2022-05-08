import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutForPostsComponent } from './layout-for-posts.component';

describe('LayoutForPostsComponent', () => {
  let component: LayoutForPostsComponent;
  let fixture: ComponentFixture<LayoutForPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutForPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutForPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
