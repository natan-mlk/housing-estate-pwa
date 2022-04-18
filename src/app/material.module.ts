import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule, 
    MatPaginatorModule, 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule
],
  exports: [
      MatTableModule, 
      MatPaginatorModule, 
      MatToolbarModule, 
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatDividerModule
    ],
})
export class MaterialModule {}