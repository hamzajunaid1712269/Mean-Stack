import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from './post-list/post.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';

  constructor(private postsSvc: PostService) {}

  onAddPost(form: NgForm): void {
    if (form.invalid) return;
    const title = this.enteredTitle.trim();
    const content = this.enteredContent.trim();
    if (!title || !content) return;

    this.postsSvc.addPost(title, content);
    form.resetForm();
  }
}
