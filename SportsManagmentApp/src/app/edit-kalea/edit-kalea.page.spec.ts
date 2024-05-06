import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditKaleaPage } from './edit-kalea.page';

describe('EditKaleaPage', () => {
  let component: EditKaleaPage;
  let fixture: ComponentFixture<EditKaleaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKaleaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
