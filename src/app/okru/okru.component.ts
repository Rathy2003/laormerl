import { Component, Input, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-okru',
  imports: [],
  templateUrl: './okru.component.html',
  styleUrl: './okru.component.css'
})
export class OKRUComponent implements OnInit,OnChanges{
  @Input() url:string|null = ""
  videoUrl: SafeResourceUrl = "";

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['url']){
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(changes['url'].currentValue)
      }
  }

  ngOnInit(): void {
     this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url||"");
  }
}
