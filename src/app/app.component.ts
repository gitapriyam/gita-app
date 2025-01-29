
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp, IonSplitPane, IonMenu, IonContent,
  IonList, IonListHeader, IonMenuToggle,
  IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { folderOutline, arrowForwardCircleOutline, arrowBackCircleOutline } from 'ionicons/icons';
import { environment } from '../environments/environment';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane,
    IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle,
    IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet,
    FooterComponent],
})
export class AppComponent {
  public appPages = environment.appPages;

  constructor() {
    addIcons({ folderOutline, arrowForwardCircleOutline, arrowBackCircleOutline });
  }
}
