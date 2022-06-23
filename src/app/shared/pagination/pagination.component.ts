import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() params;
    @Input() term;
    @Output() update = new EventEmitter<any>();

    public show:boolean = false;
  public buttonName:any = 'Show';

    constructor() {
    }

    ngOnInit() {
    }

    setPage(page) {
        this.params.page = page;
        this.update.emit(this.params);
    }

    first() {
        this.params.page = 0;
        this.update.emit(this.params);
    }

    last() {
        this.params.page = this.params.pages - 1;
        this.update.emit(this.params);
    }

    previous() {
        if (this.params.page !== 0) {
            this.params.page--;
            this.update.emit(this.params);
        }
    }

    next() {
        if (this.params.page + 1 !== this.params.pages) {
            this.params.page++;
            this.update.emit(this.params);
        }
    }

    showPageNumber(pageNo) {
        let canShow = false;
        const backLimit = this.params.page - 3;
        const forwardLimit = this.params.page + 3;

        if (this.params.page < 3 && pageNo < 5) {
            canShow = true;
        } else {
            if (pageNo > backLimit && pageNo < forwardLimit ) {
                canShow = true;
            } else {
                if (pageNo + 6 > this.params.pages && this.params.page + 6 > this.params.pages && pageNo < forwardLimit) {
                    canShow = true;
                }
            }
        }
        return canShow;
    }

    changeLimit(limit) {

        this.params.limit = limit;
        this.params.page = 0;
        this.update.emit(this.params);
    }

    showDropDown(){
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if(this.show)  
          this.buttonName = "Hide";
        else
          this.buttonName = "Show";
      }


}
