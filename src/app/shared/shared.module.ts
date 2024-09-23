import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/homePage/homePage.component';
import { AboutPageComponent } from './pages/aboutPage/aboutPage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactComponent } from './pages/contact/contact/contact-page.component';
import { SearchBoxComponent } from './components/searchBox/searchBox.component';
import { LoadingSpinnerComponent } from './components/loadingSpinner/loadingSpinner.component';




@NgModule({
  declarations: [
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
