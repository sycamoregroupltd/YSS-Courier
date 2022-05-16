import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwesomeTooltipDirective } from './tooltip/tooltip.directive';
import { AwesomeTooltipComponent } from './tooltip/tooltip.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropdownDirective } from './dropdown/dropdown.directive';

@NgModule({
    declarations: [
        AwesomeTooltipDirective,
        AwesomeTooltipComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule,
        OverlayModule,
    ],
    exports: [
        AwesomeTooltipDirective,
        DropdownDirective
    ]
})
export class DirectivesModule {
}
