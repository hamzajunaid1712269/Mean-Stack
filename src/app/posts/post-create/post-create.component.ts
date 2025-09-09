import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component ({
    selector: 'app-post-create',
    standalone: true,
    imports: [FormsModule],  
    templateUrl: './post-create.component.html'
  
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