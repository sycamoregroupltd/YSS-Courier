import { Component, OnInit } from '@angular/core';
import { Store } from '../../store';
import { CasestudyService } from '../../services/casestudy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-case-study',
    templateUrl: './case-study.component.html',
    styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent implements OnInit {
    env = environment;
    user;
    user$ = this.store.select<any>('user');

    form: FormGroup;
    uploadConfig: any;
    resizeWidth: 500;


    caseStudy: any = { images: [] };
    newItem = true;
    otherCaseStudies = [];
    productRanges = [];

    params = {
        companyId: '',
        excludeId: '',
        limit: 5,
        limits: [5, 10, 15, 25],
        page: 0,
        pages: 0,
        pageArray: [],
        totalRecords: 0,
        sort: 'case_study.createdAt DESC',
        sorts: [],
    };

    rangeDropdownSettings: any = {};

    tinyInit = {
        height: 500,
        placeholder: 'Enter a detailed overview of the overall project, challenges, victories and how Yorkstone transformed this project',
        menubar: false,
        plugins: [
            'advlist autolink lists link charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'media paste'
        ],
        toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist | removeformat |visualblocks',
    };

    constructor(
        private store: Store,
        private casestudyService: CasestudyService,
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private fb: FormBuilder,
        private toastrService: ToastrService,
    ) {
        this.form = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            location: ['', [Validators.required, Validators.minLength(3)]],
            content: ['', [Validators.required, Validators.minLength(3)]],
            status: [false, []],
            productRanges: ['', []]
        });
    }

    ngOnInit(): void {
        this.rangeDropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true
        };


        this.user = this.store.selectForLocal('user');
        if (this.route.snapshot.params.id !== 'new') {
            this.params.excludeId = this.route.snapshot.params.id;
            this.newItem = false;
            this.get();
        } else {
            this.caseStudy.images = [];
            this.caseStudy.productRanges = [];
            this.caseStudy.company = this.user.company.id;
            this.caseStudy.status = 0;
        }
        this.search();
        this.getProductRanges();
        this.initUpload();

    }

    get() {
        this.casestudyService.get(this.route.snapshot.params.id).subscribe(data => {
            this.caseStudy = data.data;

            this.form.patchValue({
                title: this.caseStudy.title,
                content: this.caseStudy.content,
                location: this.caseStudy.location,
                status: this.caseStudy.status,
                productRanges: this.caseStudy.productRanges,
            });

        });
    }

    toggleStatus() {
        if (!this.form.value.status) {
            this.form.patchValue({ status: true });
        } else {
            this.form.patchValue({ status: false });
        }
    }

    initUpload() {
        this.uploadConfig = {
            url: this.env.imageUploadPath + 'cms/images/upload',
            acceptedFiles: 'image/*',
            parallelUploads: 1,
            resizeWidth: this.resizeWidth,
            maxFiles: 1,
            maxFilesize: 1024,
            params: {
                type: 'casestudy',
                ownerId: this.user.company.id
            },
        };
    }

    search() {
        this.casestudyService.search(this.params).subscribe(data => {
            this.otherCaseStudies = data.data.data;
            this.params.pages = Math.ceil(data.data.totalRecords / this.params.limit);
            this.params.totalRecords = data.data.totalRecords;
            this.params.pageArray = [];
            for (let i = 0; i < this.params.pages; i++) {
                this.params.pageArray.push(i);
            }
        });
    }

    getProductRanges() {
        this.productService.getProductRanges().subscribe(data => {
            this.productRanges = data.data;
        });
    }

    drop(e) {
        // moveItemInArray(this.images, event.previousIndex, event.currentIndex);
        // this.casestudyService.imageSortOrder(this.caseimages).subscribe();
    }

    onUploadError(e) {
        this.initUpload();
    }

    onUploadSuccess(e) {
        const newImage = e[1].data;
        newImage.comment = '';
        this.caseStudy.images.push(newImage);
        this.initUpload();
    }

    uploadprogress(e) {

    }

    deleteImage(idx) {
        this.caseStudy.images.splice(idx, 1);
    }

    save() {
        this.caseStudy.title = this.form.value.title;
        this.caseStudy.content = this.form.value.content;
        this.caseStudy.location = this.form.value.location;
        this.caseStudy.status = this.form.value.status;
        this.caseStudy.productRanges = this.form.value.productRanges;

        if (this.newItem) {
            this.casestudyService.create(this.caseStudy).subscribe(data => {
                this.toastrService.success('Your case study was submitted');
                this.back();
            });
        } else {
            this.casestudyService.update(this.caseStudy).subscribe(data => {
                this.toastrService.success('Your case study was saved');
                this.back();
            });
        }
    }

    back() {
        this.router.navigate(['/account', 'casestudies']);
    }

    findInvalidControls() {
        const invalid = [];
        const controls = this.form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }
}
