import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebImageUpload } from 'src/app/core/models/web-image-upload';
import { WebNavbar } from 'src/app/core/models/web-navbar.model';
import { WebBasicService } from 'src/app/core/services/web-basic.service';
import { ShareComponent } from '../share/share.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  // Carousel navigation arrow show
  showNavigationArrows: any;
  showNavigationIndicators: any;

  url: any; //Angular 11, for stricter type
  msg = "";
  selectedSchool: any = '';
  selectedPosition: any = '';

  public webNav: WebNavbar[] = [];

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/Dummy.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;

  positionImage: any = [
    { id: 1, position: 'Top Slider' },
    { id: 2, position: 'Middle' },
    { id: 3, position: 'Bottom' }
  ]
  public webImageUpload: WebImageUpload = new WebImageUpload;
  public imageUploader: WebImageUpload[] = [];

  constructor(
    private webBasicService: WebBasicService
  ) {
    this.getWebNavbarList();
  }

  ngOnInit(): void {
    this.selectedPosition = 'Select Image Position'
    this.selectedSchool = 'School/College Name'
    this.breadCrumbItems = [
      { label: 'Components' },
      { label: 'Carousel', active: true }
    ];
  }


  getWebNavbarList() {
    this.webBasicService.getWebNavList().subscribe((data: any) => {
      this.webNav = data;
    });

  }

  selectSchool(name: any) {
    this.webNav.forEach(element => {
      if (element.name == name) {
        this.selectedSchool = element.name;
      }
    })

  }
  selectImagePosition(position: any) {
    this.positionImage.forEach((element: { position: any; }) => {
      if (element.position == position) {
        this.selectedPosition = element.position;

      }
    })

  }
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
        this.webBasicService.uploadWebImage(formdata).subscribe((response) => {
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
  saveWebImageUpload() {
    this.webImageUpload.isactive = true;
    this.webImageUpload.name = this.selectedSchool;
    this.webImageUpload.position = this.selectedPosition;
    this.webImageUpload.image = this.materialImage;
    debugger
    this.webBasicService.saveWebImageUpload(this.webImageUpload).subscribe((data: any) => {
      this.imageUploader = data;
      this.getWebImage();

    })

  }
  getWebImage() {
    this.webImageUpload.position = this.selectedPosition;
    this.webImageUpload.name = this.selectedSchool;

    this.webBasicService.getWebImageList(this.webImageUpload).subscribe((data: any) => {
      this.imageUploader = data;
      debugger
    })
  }
}
