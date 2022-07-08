import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "../../store";
import { OrdersService } from "../../services/orders.service";
import { AlertService } from "../../services/alert.service";
import { OverlayService } from "../../services/overlay.service";
import { MenuService } from "../../services/menu.service";
import { UserService } from "../../services/user.service";
import { AddressData, AddressType, DefaultAddressData } from "../../data-types/user-data";
import { ToastrService } from "ngx-toastr";
import { AddressService } from "../../services/address.service";
import { OrderOverviewLineComponent } from "../order-overview-line/order-overview-line.component";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})


export class OrderOverviewComponent implements OnInit {

    @Input() orderId = undefined;
    @Input() order = undefined;
    @Input() orderDetail = undefined;
    @Input() isModal = false;

    overlays$ = this.store.select<any>('overlays');
    edittingInstructions = false;
    instructions = '';

    addressType: AddressType = null;
    addNewAddress: boolean = null;
    addressModalShowHide = false;
    address: AddressData = { ...DefaultAddressData };

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private ordersService: OrdersService,
        private alertService: AlertService,
        private overlayService: OverlayService,
        private menuService: MenuService,
        private userService: UserService,
        private toastrService: ToastrService,
        private addressService: AddressService,
       
    ) { }

    ngOnInit(): void {
        if (!this.orderId) {
            // it's coming in from the router
            this.route.params.subscribe(params => {
                this.orderId = params.id;
                this.findOne();
            });
        }

        console.log('order',this.order);
    }

    findOne() {
        this.ordersService.findOne(this.orderId).subscribe(data => this.order = data.data);
    }

    update() {
        this.ordersService.update(this.order).subscribe(data => {
            this.alertService.notification(['Order details updated'], 3000);
        });
    }

    triggerAddressAdd(type) {
        this.addNewAddress = true;
        this.addressType = type;
        this.address = null;
        this.addressModalShowHide = true;
    }

    triggerAddressAmend(type) {
        this.addNewAddress = false;
        this.addressType = type;

        switch (this.addressType){
            case (AddressType.Invoice):
            case (AddressType.Billing):
                this.address = { ...this.order.invoiceAddress };
                break;
            case (AddressType.Delivery):
                this.address = { ...this.order.deliveryAddress };
                break;
        }
        this.addressModalShowHide = true;
    }

    async addressAdded(address) {
        if (this.addNewAddress === true) {
            // This was original call, but can't get it to work for now only 500
            // this.addressService.create({ userId: this.order.customer.id, ...address }).subscribe(data => this.setAddress(data.data));
            const resultAddress = await this.userService.createAddressNew({ userId: this.order.customer.id, ...address }, this.order.customer);
            this.setAddress(resultAddress);
        } else {
            this.addressService.update({ ...this.address, ...address }).subscribe(data => this.setAddress(data.data));
        }
    }

    private setAddress(address) {
        if (this.addressType === AddressType.Invoice) {
            this.order.invoiceAddress = address;
        }
        if (this.addressType === AddressType.Delivery) {
            this.order.deliveryAddress = address;
        }

        this.ordersService.updateAddress(this.order.id, address, this.addressType).subscribe(data => {
            this.toastrService.success('Address updated');
            this.overlayService.closeAll();
        });
    }

    editInstructions() {
        if (!this.edittingInstructions) {
            this.instructions = this.order.deliveryInstructions;
            this.edittingInstructions = true;
        } else {
            this.edittingInstructions = false;
            this.instructions = '';
        }
    }

    updateDeliveryInstructions() {
        const dataToSend = {
            deliveryInstructions: this.instructions,
            id: this.order.id
        };
        this.ordersService.updateDeliveryInstructions(dataToSend).subscribe(data => {
            this.order.deliveryInstructions = this.instructions;
            this.edittingInstructions = false;
        });
    }

    get addressTypeType(): typeof AddressType
    {
        return AddressType;
    }

}
