import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { WebNavbar } from 'src/app/core/models/web-navbar.model';
import { WebFooter } from 'src/app/core/models/web-footer.model';
import { WebBasicService } from 'src/app/core/services/web-basic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],

})
export class ShareComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/Dummy.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;

  isNavbarOpen: boolean = false;
  isFooterOpen: boolean = false;
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  public webNavModel: WebNavbar = new WebNavbar;
  public webNav: WebNavbar[] = [];

  public webFootModel: WebFooter = new WebFooter;
  public webFoot: WebFooter[] = [];

  // Form submition
  submit!: boolean;
  submitted = false;
  rangesubmit!: boolean;

  //  Validation form
  validationForm!: FormGroup;
  rangeValidationForm!: any;

  selectValue = ['Schools', 'Colleges', 'Hostels', 'Others', 'Projects', 'Home', 'About', 'History', 'Management', 'Gallery', 'Alumni', 'Funds',];


  constructor(
    public formBuilder: FormBuilder,
    private webBasicService: WebBasicService,
  ) {
  }

  ngOnInit(): void {
    this.getWebNavbarList();
    this.getWebFooterList();
    this.webNavModel.color = '#5156be'

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

    this.rangeValidationForm = this.formBuilder.group({
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      links: ['', [Validators.required]],
      logo: ['', [Validators.required]],
    });
    this.submit = false;
    this.rangesubmit = false;


  }
  get f() { return this.validationForm.controls; }

  saveWebNavbarDetails() {
    this.submitted = true;

    if (this.validationForm.invalid) {
      this.webNavModel.name = this.validationForm.value.name;
      this.webNavModel.email = this.validationForm.value.email;
      this.webNavModel.contact = this.validationForm.value.number;
      this.webNavModel.logo = this.materialImage;


      if (this.webNavModel.name != "" && this.webNavModel.email != "" && this.webNavModel.contact != "") {
        this.webBasicService.saveWebNavbarList(this.webNavModel).subscribe((data: any) => {
          if (data == 'SUCESS') {
            Swal.fire(
              {
                position: 'top-end',
                icon: 'success',
                title: 'Navbar Data added sucessfully!',
                showConfirmButton: false,
                timer: 1500,
              });
            this.getWebNavbarList();
          }
        })
      }

    }

  }
  get range() {
    return this.rangeValidationForm.controls;
  }
  saveWebFooterDetails() {
    this.rangesubmit = true;

    this.webFootModel.phone = this.rangeValidationForm.value.phone;
    this.webFootModel.email = this.rangeValidationForm.value.email;
    this.webFootModel.address = this.rangeValidationForm.value.address;
    this.webFootModel.links = this.rangeValidationForm.value.links;
    this.webFootModel.logo = this.rangeValidationForm.value.logo;
    if (this.webFootModel.phone != "" && this.webFootModel.email != "" && this.webFootModel.address != "" && this.webFootModel.links != "") {
      this.webBasicService.saveWebFooterList(this.webFootModel).subscribe((data: any) => {
        if (data == 'SUCESS') {
          Swal.fire(
            {
              position: 'top-end',
              icon: 'success',
              title: 'Footer Data added sucessfully!',
              showConfirmButton: false,
              timer: 1500,
            });
          this.getWebFooterList();
        }
      })
    }

    if (this.rangeValidationForm.invalid) {
      return;
    }

  }



  getWebNavbarList() {
    this.webBasicService.getWebNavList().subscribe((data: any) => {
      if (data.length > 0) {
        this.webNav = data;
        debugger
      }

    });

  }

  getWebFooterList() {
    this.webBasicService.getWebFootList().subscribe((data: any) => {
      if (data.length > 0) {
        this.webFoot = data;
        debugger
      }

    });

  }
  /**
   * range validation submit data
   */
  // rangeSubmit() {
  //   this.rangesubmit = true;
  // }
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        const imgBase64Path = reader.result;
        this.cardImageBase64 = imgBase64Path;
        const formdata = new FormData();
        formdata.append('file', file);
        this.webBasicService.uploadWebLogo(formdata).subscribe((response) => {
          this.materialImage = response;
          //   this.isImageSaved = true;
          this.editFile = false;
          this.removeUpload = true;
        })
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();

    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'assets/images/Dummy.jpg';
    this.editFile = true;
    this.removeUpload = false;

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

