import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import KeenSlider from 'keen-slider';

@Component({
    selector: 'app-tile-slider-keen',
    templateUrl: './tile-slider-keen.component.html',
    styleUrls: ['./tile-slider-keen.component.scss']
})
export class TileSliderKeenComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() tiles;
    @Input() spacing = 15;
    @Input() slidesPerView = 4;
    @Input() showDots = true;
    @Input() showNav = true;
    @Input() showExpandArrows = false;

    @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

    currentSlide = 1;
    dotHelper: Array<number> = [];
    slider: any = null;
    fullScreen = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement, {
                slidesPerView: this.slidesPerView,
                spacing: this.spacing,
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
