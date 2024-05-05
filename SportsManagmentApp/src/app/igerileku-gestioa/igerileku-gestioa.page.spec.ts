import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IgerilekuGestioaPage } from './igerileku-gestioa.page';

describe('IgerilekuGestioaPage', () => {
  let component: IgerilekuGestioaPage;
  let fixture: ComponentFixture<IgerilekuGestioaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IgerilekuGestioaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
