import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NavbarComponent } from './shared/navbar/navbar.component'
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ShareComponent } from './share/share.component';


const routes: Routes = [
    {
        path: 'navbar',
        component: NavbarComponent
      },
      {
        path: 'footer',
        component: FooterComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'share',
        component: ShareComponent
      }
      

      
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
