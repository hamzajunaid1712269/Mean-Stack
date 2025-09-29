import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import type { Post } from '../../../app';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [MatCardModule, MatExpansionModule]
})
export class PostListComponent {
  @Input() posts: Post[] = [];    // <-- receive from parent
}
