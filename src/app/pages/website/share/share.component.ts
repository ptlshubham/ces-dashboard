import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { WebNavbar } from 'src/app/core/models/web-navbar.model';
import { WebBasicService } from 'src/app/core/services/web-basic.service';



@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  isNavbarOpen: boolean = false;
  isFooterOpen: boolean = false;
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  public webNavModel: WebNavbar = new WebNavbar;
  public webNav: WebNavbar[] = [];

  // Form submition
  submit!: boolean;
  submitted = false;

  //  Validation form
  validationForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private webBasicService: WebBasicService
  ) {
  }

  ngOnInit(): void {
    this.getWebNavbarList();

    /**
     * BreadCrumb Set
     */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Validation', active: true }
    ];
    this.validationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      logo: ['', Validators.required],
    });
    this.submit = false;
  }
  get f() { return this.validationForm.controls; }

  saveWebNavbarDetails() {
    this.submitted = true;

    this.webNavModel.name = this.validationForm.value.name;
    this.webNavModel.email = this.validationForm.value.email;
    this.webNavModel.contact = this.validationForm.value.number;
    this.webNavModel.logo = this.validationForm.value.logo;
    debugger
    this.webBasicService.saveWebNavbarList(this.webNavModel).subscribe((data: any) => {
      this.webNav = data;
    })
    if (this.validationForm.invalid) {
      return;
    }

  }
  getWebNavbarList() {
    debugger
    this.webBasicService.getWebNavList().subscribe((data: any) => {
      this.webNav = data;
      debugger
    });

  }





  openNavbar() {
    this.isNavbarOpen = true;
    this.isFooterOpen = false;
  }
  openFooter() {
    this.isNavbarOpen = false;
    this.isFooterOpen = true;
  }
}

