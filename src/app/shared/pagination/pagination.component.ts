import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() params;
    @Input() term;
    @Output('update')

    change: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    setPage(page) {
        this.params.page = page;
        this.change.emit(this.params);
    }

    first() {
        this.params.page = 0;
        this.change.emit(this.params);
    }

    next() {
        this.params.page++;
        this.change.emit(this.params);
    }

    showPageNumber(pageNo) {
        let canShow = false;

        const backLimit = this.params.page - 3;
        const forwardLimit = this.params.page + 3;

        if (this.params.page < 5 && pageNo < 4) {
            canShow = true;
        } else {
            if (pageNo > backLimit && pageNo < forwardLimit) {
                canShow = true;
            }
        }

        return canShow;
    }


}
