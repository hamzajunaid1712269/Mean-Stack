import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-create/post-list/post-list.component';

export type Post = { title: string; content: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PostCreateComponent, PostListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']          // <-- fixed
})
export class App {
  protected readonly title = signal('mean-stack');

  posts: Post[] = [];               // <-- typed

  onAddPost(post: Post) {           // <-- name + typed param
    this.posts.push(post);
  }
}
