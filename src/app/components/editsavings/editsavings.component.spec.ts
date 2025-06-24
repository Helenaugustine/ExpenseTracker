import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsavingsComponent } from './editsavings.component';

describe('EditsavingsComponent', () => {
  let component: EditsavingsComponent;
  let fixture: ComponentFixture<EditsavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditsavingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
