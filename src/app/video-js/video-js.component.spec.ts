import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoJSComponent } from './video-js.component';

describe('VideoJSComponent', () => {
  let component: VideoJSComponent;
  let fixture: ComponentFixture<VideoJSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoJSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
