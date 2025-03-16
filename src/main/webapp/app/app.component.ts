import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './layouts/navbar.component';
import { FooterComponent } from './layouts/footer.component';

@Component({
  selector: 'jhi-root',
  templateUrl: './app.component.html',
  imports: [RouterModule, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule, NgOptimizedImage, NavBarComponent, FooterComponent],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  appName = signal('');

  ngOnInit(): void {
    this.appName.set('jhipsterSampleApplication');
  }
}
