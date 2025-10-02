import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [MatCardModule, MatExpansionModule, MatButtonModule],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub!: Subscription;

  constructor(private postsService: PostService) {}

  ngOnInit(): void {
    // Subscribe first so we don't miss the initial emission
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => (this.posts = posts));

    // Then trigger the HTTP load
    this.postsService.getPosts();
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

  onDelete(id: string): void {
    if (!id) return;
    this.postsService.deletePost(id); // service handles HTTP + emitting updates
  }

  // (optional) if you switch back to *ngFor: trackBy: trackById
  trackById = (_: number, p: Post) => p.id;
}