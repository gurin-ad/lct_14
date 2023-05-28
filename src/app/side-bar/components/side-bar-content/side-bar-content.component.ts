import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-bar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarContentComponent implements OnInit {

  @Output() onRedirect: EventEmitter<number> = new EventEmitter<number>()
  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const wrapper = this.elRef.nativeElement.shadowRoot.querySelector('.theory')
    const innerLinks = wrapper?.querySelectorAll('app-redirect-topic');
    innerLinks.forEach((innerLink: HTMLElement) => innerLink?.addEventListener('click', (e: Event) => {
      let topicId = innerLink?.getAttribute('topic');
      if (topicId) {
        this.onRedirect.emit(+topicId);
      }
    }));
  }
}
