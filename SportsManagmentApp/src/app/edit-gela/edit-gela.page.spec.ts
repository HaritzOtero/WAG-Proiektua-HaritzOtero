import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGelaPage } from './edit-gela.page';

describe('EditGelaPage', () => {
  let component: EditGelaPage;
  let fixture: ComponentFixture<EditGelaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGelaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
