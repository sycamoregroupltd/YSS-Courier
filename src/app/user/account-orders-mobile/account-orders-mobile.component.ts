import { Store } from "./../../store";
import { OrdersService } from "./../../services/orders.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import KeenSlider from "keen-slider";
import { debounce } from "lodash";

@Component({
    selector: "app-account-orders-mobile",
    templateUrl: "./account-orders-mobile.component.html",
    styleUrls: ["./account-orders-mobile.component.css"],
})
export class AccountOrdersMobileComponent implements OnInit {
    tiles = 1;
    spacing = 15;
    slidesPerView = 1;
    showDots = true;
    showNav = false;
    showExpandArrows = false;

    @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;

    currentSlide = 1;
    dotHelper: Array<number> = [];
    slider: any = null;
    fullScreen = false;

    orders = [];
    params = {
        customer: "",
        orderId: "",
        invoiceId: "",
        customerId: "",
        supplierId: "",
        supplier: "",
        status: "",
        dueDate: "",
        isSample: "",
        shippingStatus: "",
        freeText: "",
        all: true,
        thisWeek: false,
        thisMonth: false,
        limit: 10,
        limits: [10, 25, 50, 75, 100],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: "order_details.createdAt DESC",
        sorts: [],
    };

    constructor(private ordersService: OrdersService, private store: Store) {
        this.filterSearch = debounce(this.filterSearch, 350);
    }

    ngOnInit(): void {
        const user = this.store.selectForLocal("user");
        this.params.customerId = user.id;
        this.filterSearch();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.slider = new KeenSlider(this.sliderRef.nativeElement, {
                slidesPerView: this.slidesPerView,
                spacing: this.spacing,
                slideChanged: (s) => {
                    this.currentSlide = s.details().relativeSlide;
                },
            });
            this.dotHelper = [...Array(this.slider.details().size).keys()];
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.slider) {
            this.slider.destroy();
        }
    }

    filterSearch() {
        this.params.page = 0;
        this.search();
    }

    search() {
        this.ordersService.searchOrderDetails(this.params).subscribe((data) => {
            console.log(data.data);
            this.orders = data.data.data;

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
}
