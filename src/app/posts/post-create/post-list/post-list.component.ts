import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatDividerModule }    from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';






@Component({
    selector: 'app-post-list',
    standalone: true,
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    imports: [FormsModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule,MatCardModule,MatExpansionModule]
    

})
export class PostListComponent {
    posts = [
        {title:'First Post', content: 'This is the first post\s'},
        {title:'Second Post', content: 'This is the second post\s'},
        {title:'Third Post', content: 'This is the third post\s'},

    ];
}