import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(): Post[] {
    // return a copy to keep internal state immutable from outside
    return [...this.posts];
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = { title, content };
    this.posts.push(post);
    // emit an updated copy
    this.postsUpdated.next([...this.posts]);
  }
}