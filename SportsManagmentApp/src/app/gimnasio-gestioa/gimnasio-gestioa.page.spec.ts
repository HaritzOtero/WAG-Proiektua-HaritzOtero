import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GimnasioGestioaPage } from './gimnasio-gestioa.page';

describe('GimnasioGestioaPage', () => {
  let component: GimnasioGestioaPage;
  let fixture: ComponentFixture<GimnasioGestioaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GimnasioGestioaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
