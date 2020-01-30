import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.conponent';
import { SignupComponent } from './signup/signup.conponent';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AuthRotingModeule } from './auth-routing.module';


@NgModule({
    declarations:[
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        AngularMaterialModule,
        CommonModule,
        FormsModule,
        AuthRotingModeule
    ]
})
export class AuthModule{}