import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarRoutingModule } from './side-bar-routing.module';
import { SideBarContainerComponent } from './containers/side-bar-container/side-bar-container.component';
import { SideBarHeaderComponent } from './components/side-bar-header/side-bar-header.component';
import { SideBarContentComponent } from './components/side-bar-content/side-bar-content.component';
import { SideBarNavigationComponent } from './components/side-bar-navigation/side-bar-navigation.component';
import { PrivateOfficeBlockModule } from '../shared/private-office-block/private-office-block.module';
import { MetadoorLabelComponent } from '../shared/metadoor-label/metadoor-label.component';

import { ButtonModule, TabsModule } from '../shared';


@NgModule({
  declarations: [
    SideBarContainerComponent,
    SideBarHeaderComponent,
    SideBarContentComponent,
    SideBarNavigationComponent,
    MetadoorLabelComponent,
  ],
  imports: [
    CommonModule,
    SideBarRoutingModule,
    PrivateOfficeBlockModule,
    TabsModule,
    ButtonModule,
  ],
  exports: [
    SideBarContainerComponent,
  ]
})
export class SideBarModule { }
