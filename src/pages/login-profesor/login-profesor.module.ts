import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginProfesorPage } from './login-profesor';

@NgModule({
  declarations: [
    LoginProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginProfesorPage),
  ],
})
export class LoginProfesorPageModule {}
