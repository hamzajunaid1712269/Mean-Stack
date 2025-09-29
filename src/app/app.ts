import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-create/post-list/post-list.component';
import { Post } from './posts/post-create/post-list/post.model'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PostCreateComponent, PostListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('mean-stack');

  posts: Post[] = [];              

  onAddPost(post: Post) {          
    this.posts.push(post);          
  }
}