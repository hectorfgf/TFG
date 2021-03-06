import { Component } from '@angular/core';

import {EncuestasPage} from '../encuestas/encuestas';
import {AutorizacionesPage} from '../autorizacion/autorizaciones';
import {CircularesPage} from '../circulares/circulares';
import {CitasPadrePage} from "../citas-padre/citas-padre";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CircularesPage;
  tab2Root = EncuestasPage;
  tab3Root = AutorizacionesPage;
  tab4Root = CitasPadrePage;

  constructor() {

  }
}
