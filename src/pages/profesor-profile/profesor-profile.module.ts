import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesorProfilePage } from './profesor-profile';

@NgModule({
  declarations: [
    ProfesorProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesorProfilePage),
  ],
})
export class ProfesorProfilePageModule {}
