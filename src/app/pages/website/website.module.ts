import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {
  NgbAlertModule,
  NgbCarouselModule, NgbProgressbarModule,
  NgbCollapseModule,
  NgbAccordionModule, NgbPopoverModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebsiteRoutingModule } from './website-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { HomeComponent } from './home/home.component';
import { ShareComponent } from './share/share.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [

    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ShareComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebsiteRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCarouselModule,
    DropzoneModule,
    NgbPaginationModule,
    SimplebarAngularModule,
    CKEditorModule,
    NgbTypeaheadModule,
    NgbDatepickerModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})

export class WebsiteModule { }
