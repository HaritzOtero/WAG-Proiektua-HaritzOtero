import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KaleaGehituPage } from './kalea-gehitu.page';

describe('KaleaGehituPage', () => {
  let component: KaleaGehituPage;
  let fixture: ComponentFixture<KaleaGehituPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KaleaGehituPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
