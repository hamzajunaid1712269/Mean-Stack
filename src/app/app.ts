import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-create/post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostCreateComponent,HeaderComponent,PostListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mean-stack');
}
