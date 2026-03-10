import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
import { FraudDetectionComponent } from './fraud-detection/fraud-detection.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"register",component:RegisterComponent},
  {path:"transaction",component:TransactionComponent},
  {path:"fraud-detection",component:FraudDetectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
