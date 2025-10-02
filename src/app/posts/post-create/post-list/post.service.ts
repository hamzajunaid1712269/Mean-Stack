import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private readonly API = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  /** Fetch from backend and emit to subscribers */
  getPosts(): void {
    this.http
      .get<{ message: string; posts: any[] }>(this.API)
      .pipe(
        map((res) =>
          res.posts.map((p) => ({
            id: p.id ?? p._id,     // works with id OR _id
            title: p.title,
            content: p.content,
          }) as Post)
        )
      )
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
          this.postsUpdated.next([...this.posts]);
        },
        error: (err) => {
          console.error('GET /api/posts failed', err);
          this.postsUpdated.next([]);
        },
      });
  }

  /** Components subscribe to this for updates */
  getPostUpdateListener(): Observable<Post[]> {
    return this.postsUpdated.asObservable();
  }

  /** Create on server, then update local cache + emit */
  addPost(title: string, content: string): void {
    const body = { title, content };
    this.http
      .post<{ message: string; postId?: string }>(this.API, body)
      .subscribe({
        next: (res) => {
          const newPost: Post = {
            id: res.postId ?? cryptoRandomId(),
            title,
            content,
          };
          this.posts.push(newPost);
          this.postsUpdated.next([...this.posts]);
        },
        error: (err) => console.error('POST /api/posts failed', err),
      });
  }

  /** Delete on server, then update local cache + emit */
  deletePost(id: string): void {
    this.http.delete<{ message: string }>(`${this.API}/${id}`)
      .subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== id);
          this.postsUpdated.next([...this.posts]);
        },
        error: (err) => console.error('DELETE /api/posts failed', err),
      });
  }
}

/** tiny helper for fallback ids in dev */
function cryptoRandomId(): string {
  try {
    return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
  } catch {
    return Math.random().toString(36).slice(2);
  }
}