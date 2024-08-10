import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NavComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(public auth: AuthService) {
    
  }
  
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  
  title = 'vaca';
  links = [
    { text: 'Trips', link: 'trips', icon: 'lightbulb' },
    { text: 'Activities', link: 'activities', icon: 'hiking'},
    { text: 'Flights', link: 'flights', icon: 'flights_and_hotels'}
  ];
  loginProgress = false;

  credentials = {
    username: '',
    password: ''
  };

  attemptLogin() {
    this.loginProgress = true;
    this.auth.login(this.credentials).subscribe(payload => {
      this.loginProgress = false;
      this.trigger.toggleMenu();
      console.log(payload);
    }, error => {
      this.loginProgress = false;
      console.log(error);
    });
  }

}
