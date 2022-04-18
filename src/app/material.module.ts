import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
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
    MatInputModule
],
  exports: [
      MatTableModule, 
      MatPaginatorModule, 
      MatToolbarModule, 
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatFormFieldModule,
      MatInputModule
    ],
})
export class MaterialModule {}