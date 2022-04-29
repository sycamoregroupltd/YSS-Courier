import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { GrowlerComponent } from './growler/growler.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { AlertComponent } from './alert/alert.component';
import { RatingIconsComponent } from './rating-icons/rating-icons.component';
import { ProcessingComponent } from './processing/processing.component';
import { NotificationsListComponent } from '../notifications/notifications-list/notifications-list.component';
import { ImageSliderKeenComponent } from './image-slider-keen/image-slider-keen.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { TileSliderKeenComponent } from './tile-slider-keen/tile-slider-keen.component';

@NgModule({
    declarations: [
        PaginationComponent,
        GrowlerComponent,
        ConfirmationComponent,
        AlertComponent,
        RatingIconsComponent,
        ProcessingComponent,
        NotificationsListComponent,
        ImageSliderKeenComponent,
        BreadcrumbComponent,
        TileSliderKeenComponent,
    ],
    imports: [
        CommonModule,
        EditorModule,
        RouterModule,
    ],
    exports: [
        PaginationComponent,
        GrowlerComponent,
        ConfirmationComponent,
        AlertComponent,
        RatingIconsComponent,
        ProcessingComponent,
        NotificationsListComponent,
        ImageSliderKeenComponent,
        EditorModule,
        BreadcrumbComponent,
        TileSliderKeenComponent,
    ],
    // providers: [
    //     Store,
    // ],
})
export class SharedModule {
}
