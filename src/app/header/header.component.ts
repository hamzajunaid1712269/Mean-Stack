import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatDividerModule }    from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [FormsModule, MatToolbarModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule,MatCardModule], 

})
export class HeaderComponent{}