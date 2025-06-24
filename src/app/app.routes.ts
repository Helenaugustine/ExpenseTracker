
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';

import { SavingsComponent } from './components/savings/savings.component';
import { CategoryComponent } from './components/category/category.component';
import { AddexpenseComponent } from './components/addexpense/addexpense.component';
import { AddIncomeComponent } from './components/addincome/addincome.component';
import { AddsavingsComponent } from './components/addsavings/addsavings.component';
import { AddcategoryComponent } from './common/addcategory/addcategory.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { AdminheaderComponent } from './adminside/adminheader/adminheader.component';
import { ActiveusersComponent } from './adminside/activeusers/activeusers.component';
import { DeletedusersComponent } from './adminside/deletedusers/deletedusers.component';
import { AdmincategoryComponent } from './adminside/admincategory/admincategory.component';
import { EdituserComponent } from './adminside/edituser/edituser.component';
import { EditincomeComponent } from './components/editincome/editincome.component';
import { EditsavingsComponent } from './components/editsavings/editsavings.component';
import { EditexpenseComponent } from './components/editexpense/editexpense.component';
import { ProfileComponent } from './common/profile/profile.component';
// ... import other components

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'Home' } },
      { path: 'income', component: IncomeComponent, data: { title: 'Income' } },
      { path: 'expense', component: ExpenseComponent, data: { title: 'Expense' } },
      { path: 'savings', component: SavingsComponent, data: { title: 'Savings' } },
      { path: 'category', component: CategoryComponent, data: { title: 'Category' } },
      // { path: 'analytics', component: AnalyticsComponent, data: { title: 'Analytics' } },
        {path: 'analytics', component:AnalyticsComponent , data: { title: 'Analytics' }}
      
    ]
  },
  {
    path: '',component: AdminheaderComponent,
    children: [
      {path: 'activeusers', component:ActiveusersComponent,data : {title: 'ActiveUsers'}},
      {path: 'deletedusers', component:DeletedusersComponent,data : {title: 'DeletedUsers'}},
      {path: 'admincategory' , component:AdmincategoryComponent , data : {title: 'Category'}}
    ]
  },
  {path: 'addexpense', component:AddexpenseComponent},
  {path: 'addincome', component:AddIncomeComponent},
  {path: 'addsavings', component:AddsavingsComponent},
  {path: 'addcate' , component:AddcategoryComponent},
{ path: 'edit-user/:id', component: EdituserComponent },
{path: 'edit-savings/:id', component:EditsavingsComponent},
{path:'edit-expense/:id', component:EditexpenseComponent},
{ path: 'edit-income/:id', component: EditincomeComponent },
{path:'profile' , component:ProfileComponent},

  { path: '**', redirectTo: 'login' },
  

];
