import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.conponent';
import { SignupComponent } from './signup/signup.conponent';

const routes : Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'signup', component: SignupComponent}
]

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class AuthRotingModeule{}