import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersideComponent } from './headerside.component';

describe('HeadersideComponent', () => {
  let component: HeadersideComponent;
  let fixture: ComponentFixture<HeadersideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadersideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadersideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
