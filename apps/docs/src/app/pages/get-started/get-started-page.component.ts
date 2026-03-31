import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-started-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './get-started-page.component.html',
  styleUrl: './get-started-page.component.css',
})
export class GetStartedPageComponent {}
