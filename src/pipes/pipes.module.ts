import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import {IonicModule} from "ionic-angular";
import {SearchStudentPipe} from "./search/searchStudent";
@NgModule({
  declarations: [SearchPipe, SearchStudentPipe],
  imports: [IonicModule],
  exports: [SearchPipe, SearchStudentPipe]
})
export class PipesModule {}
