import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostCreateComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mean-stack');
}
