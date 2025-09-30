import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private readonly API = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  // Fetch from backend and emit to subscribers
  getPosts(): void {
    this.http.get<{ message: string; posts: Post[] }>(this.API)
      .subscribe({
        next: (res) => {
          this.posts = res.posts;
          this.postsUpdated.next([...this.posts]);
        },
        error: (err) => {
          console.error('GET /api/posts failed', err);
          this.postsUpdated.next([]); // still emit so UI updates
        }
      });
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  // Local-only add (works but does NOT persist to server)
  addPost(title: string, content: string): void {
    const post: Post = { id: '', title, content };
    this.http.post<{message: string}>('http://localhost:3000/api/posts',post)
    .subscribe((responseData) => {
      console.log(responseData.message)
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
    
  }

  // If you want to persist to backend, use this instead:
  // addPost(title: string, content: string): void {
  //   const post: Post = { id: '', title, content };
  //   this.http.post<{ message: string; postId: string }>(this.API, post)
  //     .subscribe({
  //       next: (res) => {
  //         post.id = res.postId;
  //         this.posts.push(post);
  //         this.postsUpdated.next([...this.posts]);
  //       },
  //       error: (err) => console.error('POST /api/posts failed', err)
  //     });
  // }
}
