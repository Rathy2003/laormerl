import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OKRUComponent } from './okru.component';

describe('OKRUComponent', () => {
  let component: OKRUComponent;
  let fixture: ComponentFixture<OKRUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OKRUComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OKRUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
