import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OverlayService } from "../../services/overlay.service";
import { Store } from "../../store";
import { ChatService } from "../../services/chat.service";
import { debounce } from "lodash";

@Component({
    selector: "app-mail-user-search",
    templateUrl: "./mail-user-search.component.html",
    styleUrls: ["./mail-user-search.component.css"],
})
export class MailUserSearchComponent implements OnInit {
    @Input() usersSelected;
    @Output() addUser = new EventEmitter();
    @Output() removeUser = new EventEmitter();

    users = [];

    params = {
        userCompanyId: "",
        freeText: "",
        company: "",
        name: "",
        accountType: "",
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: "contacts.firstname",
        sorts: [],
    };

    constructor(
        private overlayService: OverlayService,
        private store: Store,
        private chatService: ChatService
    ) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        const user = this.store.selectForLocal("user");
        this.params.accountType = user.accountType;
        if (user.accountType === "supplier" || user.accountType === "trade") {
            this.params.userCompanyId = user.company.id;
        }

        this.filterSearch();
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.chatService.searchUsers(this.params).subscribe((data) => {
            this.users = data.data.data;

            this.params.pages = Math.ceil(
                data.data.totalRecords / this.params.limit
            );
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    userSelected(user) {
        for (let i = 0; i < this.usersSelected.length; i++) {
            if (
                this.usersSelected[i].userId === user.id ||
                this.usersSelected[i].id === user.id
            ) {
                return true;
            }
        }
        return false;
    }

    toggleUser(user) {
        let userFound = false;
        for (let i = 0; i < this.usersSelected.length; i++) {
            if (this.usersSelected[i].id === user.id) {
                userFound = true;
            }
        }
        if (userFound) {
            this.removeUser.emit(user);
        } else {
            this.addUser.emit(user);
        }
    }

    close() {
        this.overlayService.closeAll();
    }
}
