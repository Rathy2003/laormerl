import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-js',
  imports: [],
  templateUrl: './video-js.component.html',
  styleUrl: './video-js.component.css'
})
export class VideoJSComponent implements OnInit,OnDestroy{
  @Input() url:string|null = ""
  @ViewChild('target', { static: true }) target!: ElementRef;
  //@ts-ignore
  player!: videojs.Player;
  ngOnInit(): void {    
    this.player = videojs(this.target.nativeElement, {
      techOrder: ['html5'],
      sources: [{
        src: this.url,
        type: 'video/mp4' // or video/webm, video/ogg depending on your file
      }],
      controls: true,
      responsive: true,
      fluid: true
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
