import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatDividerModule }    from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';


@Component ({
    selector: 'app-post-create',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule,MatCardModule], 
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
  
})

export class PostCreateComponent {

    newPost = 'No Content';
    enteredValue = '';

    onAddPost(): void{
     //  alert('Post Added')

     //console.dir(postInput);
     this.newPost = this.enteredValue;
    }

}