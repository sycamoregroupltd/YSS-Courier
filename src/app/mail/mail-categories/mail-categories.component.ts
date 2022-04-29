import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OverlayService} from '../../services/overlay.service';
import {Store} from '../../store';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-mail-categories',
    templateUrl: './mail-categories.component.html',
    styleUrls: ['./mail-categories.component.css']
})
export class MailCategoriesComponent implements OnInit {
    @Input() group;
    @Output() updateCategory = new EventEmitter();

    categories = [];

    constructor(
        private overlayService: OverlayService,
        private store: Store,
        private chatService: ChatService,
    ) {
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.chatService.getCategories().subscribe(data => {
            this.categories = data.data;
        });
    }

    setCategory(category) {
        const user = this.store.selectForLocal('user');
        this.chatService.setCategory(this.group.id, user.id, category.id).subscribe(data => {
            this.group.category = category;
           this.close();
           // this.updateCategory.emit()
        });
    }

    close() {
        this.overlayService.closeAll();
    }

}
