import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [MatCardModule, MatExpansionModule],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub!: Subscription;

  constructor(private postsService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts) => (this.posts = posts));
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }
}
