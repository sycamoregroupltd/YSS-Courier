import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AwesomeTooltipDirective} from './tooltip/tooltip.directive';
import {AwesomeTooltipComponent} from './tooltip/tooltip.component';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
    declarations: [
        AwesomeTooltipDirective,
        AwesomeTooltipComponent,
    ],
    imports: [
        CommonModule,
        OverlayModule,
    ],
    exports: [
        AwesomeTooltipDirective,
    ],
    entryComponents: [
        AwesomeTooltipComponent,
    ],
})
export class DirectivesModule {
}
