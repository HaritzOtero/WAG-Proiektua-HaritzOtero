import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GelaGehituPage } from './gela-gehitu.page';

describe('GelaGehituPage', () => {
  let component: GelaGehituPage;
  let fixture: ComponentFixture<GelaGehituPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GelaGehituPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
