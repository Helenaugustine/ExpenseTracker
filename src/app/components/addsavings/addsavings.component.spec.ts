import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsavingsComponent } from './addsavings.component';

describe('AddsavingsComponent', () => {
  let component: AddsavingsComponent;
  let fixture: ComponentFixture<AddsavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddsavingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
