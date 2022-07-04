import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-board-swap-supplier',
  templateUrl: './order-board-swap-supplier.component.html',
  styleUrls: ['./order-board-swap-supplier.component.scss']
})
export class OrderBoardSwapSupplierComponent implements OnInit {

  @Input() orderDetail;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();


  primarySearch = true;

  suppliers = [];
  supplierParams = {
      company: '',
      postcode: '',
      telephone: '',
      companyNumber: '',
      vatNumber: '',
      status: '',
      freeText: '',
      accountType: 'supplier',
      limit: 5,
      limits: [5, 10, 25, 50],
      page: 0,
      pages: 0,
      pageArray: [],
      totalRecords: 0,
      sort: 'companies.name',
      sorts: [],
  };
  searchSubmitted = false;

  confirmationData = {
      open: false,
      buttonText: 'Confirm',
      cancelButtonText: 'Cancel',
      title: '',
      detail: '',
      data: undefined,
  };

  constructor(
      private ordersService: OrdersService,
      private companyService: CompanyService,
  ) {
  }

  ngOnInit(): void {
      this.searchSuppliers();
  }

  searchSuppliers() {
      this.companyService.search(this.supplierParams).subscribe(data => {
          this.suppliers = data.data.data;

          this.supplierParams.pages = Math.ceil(data.data.totalRecords / this.supplierParams.limit);
          this.supplierParams.totalRecords = data.data.totalRecords;
          this.supplierParams.pageArray = [];
          for (let i = 0; i < this.supplierParams.pages; i++) {
              this.supplierParams.pageArray.push(i);
          }
          this.searchSubmitted = true;
          this.primarySearch = false;
      });
  }

  locateDefaultSupplier() {
      this.companyService.findOne(this.orderDetail.supplier.id).subscribe(data => {
          if (data.data) {
              this.orderDetail.supplier = data.data;
              this.searchSubmitted = false;
          }
      });

  }

  setSupplier(s) {
      this.orderDetail.supplier = s;
      this.searchSubmitted = false;
      this.save();
  }

  searchAgain() {
      this.searchSubmitted = false;
      this.orderDetail.supplier = undefined;
  }



  save() {
      this.ordersService.updateSupplier(this.orderDetail).subscribe(data => {
          const dataToEmit = {
              updated: true,
          };
          this.closeModal.emit(dataToEmit);
      })
  }

  confirmSubmit(supplier) {
      this.confirmationData.title = `Are you sure you would like to change supplier to ${supplier.name}`;
      this.confirmationData.data = supplier;
      this.confirmationData.detail = 'This order will be moved back to awaiting confirmation';
      this.confirmationData.open = true;
  }
  confirmAction(e) {
      this.confirmationData.open = false;
      if (e.action) {
          this.setSupplier(this.confirmationData.data);
      }
      this.confirmationData.open = false;
  }


  cancel() {
      const dataToEmit = {
          updated: false,
      };
      this.closeModal.emit(dataToEmit);
  }


}
