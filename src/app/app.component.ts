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
import { LoadingProgressBarComponent } from "./loading-progress-bar/loading-progress-bar.component";
import { NavigationService } from './services/navigation.service';

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
    FormsModule,
    LoadingProgressBarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  
  title = '';
  links = [
    { text: 'Trips', link: 'trips', icon: 'your_trips' },
    { text: 'Inspiration', link: 'inspiration', icon: 'lightbulb'},
    { text: 'Accommodations', link: 'accommodations', icon: 'flights_and_hotels'}
  ];
  loginProgress = false;

  credentials = {
    username: '',
    password: ''
  };

  constructor(
    public auth: AuthService,
    private nav: NavigationService
  ) {
    nav.title$.subscribe({
      next: (title) => this.title = title
    })
  }

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
