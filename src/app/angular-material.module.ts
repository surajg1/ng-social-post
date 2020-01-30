import { NgModule } from '@angular/core';
import {MatInputModule, MatButtonModule,MatCardModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatDialogModule} from '@angular/material';


@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    exports : [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ]

})
export class AngularMaterialModule{}