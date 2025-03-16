import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  imports: [RouterModule],
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  appName = signal('');

  ngOnInit(): void {
    this.appName.set('jhipsterSampleApplication');
  }
}
