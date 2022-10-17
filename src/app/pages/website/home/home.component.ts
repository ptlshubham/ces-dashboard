import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public webNav: WebNavbar[] = [];

  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any = "assets/images/Dummy.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;
  cardImageBase64: any;
  materialImage: any;
  constructor(
    private webBasicService: WebBasicService
  ) {
    this.getWebNavbarList();
  }

  ngOnInit(): void {
    this.selectedSchool ='School/College Name'
      this.breadCrumbItems = [
        { label: 'Components' },
        { label: 'Carousel', active: true }
      ];
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
        debugger

        this.webBasicService.uploadMaterialImage(formdata).subscribe((response) => {
          this.materialImage = response;
          debugger
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
  //selectFile(event) { //Angular 8
  selectFile(event: any) { //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
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
  
}
