import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import KeenSlider from 'keen-slider';

@Component({
  selector: 'app-image-slider-keen',
  templateUrl: './image-slider-keen.component.html',
  styleUrls: ['./image-slider-keen.component.css']
})
export class ImageSliderKeenComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() images;
    @Input() showMainImage = true;
    @Input() loop = false;
    @Input() border = 6;
    @Input() margin = '5px 0';
    @Input() arrowColour = '#202020';
    @Input() height = 250;
    @Input() spacing = 15;
    @Input() slidesPerView = 4;
    @Input() showDots = true;
    @Input() showNav = true;
    @Input() showExpandArrows = true;

    @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

    currentSlide = 1;
    dotHelper: Array<number> = [];
    slider: any = null;
    fullScreen = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      setTimeout(() => {
          this.slider = new KeenSlider(this.sliderRef.nativeElement, {
              slidesPerView: this.slidesPerView,
              spacing: this.spacing,
              loop: this.loop,
              slideChanged: s => {
                  this.currentSlide = s.details().relativeSlide;
              }
          });
          this.dotHelper = [...Array(this.slider.details().size).keys()];
      }, 1000);

  }

    ngOnDestroy(): void {
        if (this.slider) {
            this.slider.destroy();
        }
  }

  goFullScreen() {
      this.fullScreen = true;
  }
  closeFullScreen() {
      this.fullScreen = false;
  }
}
