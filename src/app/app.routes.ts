
import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { IncomeComponent } from './components/income/income.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { authGuard } from './Guard/auth.guard';
import { SavingsComponent } from './components/savings/savings.component';
import { CategoryComponent } from './components/category/category.component';
import { AddexpenseComponent } from './components/addexpense/addexpense.component';
import { AddIncomeComponent } from './components/addincome/addincome.component';
import { AddsavingsComponent } from './components/addsavings/addsavings.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AdminheaderComponent } from './adminside/adminheader/adminheader.component';
import { ActiveusersComponent } from './adminside/activeusers/activeusers.component';
import { DeletedusersComponent } from './adminside/deletedusers/deletedusers.component';
import { AdmincategoryComponent } from './adminside/admincategory/admincategory.component';
import { EdituserComponent } from './adminside/edituser/edituser.component';
import { EditincomeComponent } from './components/editincome/editincome.component';
import { EditsavingsComponent } from './components/editsavings/editsavings.component';
import { EditexpenseComponent } from './components/editexpense/editexpense.component';
import { ProfileComponent } from './common/profile/profile.component';
import { AdminaddcatComponent } from './adminside/adminaddcat/adminaddcat.component';



export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard], data: { title: 'Home' } },
      { path: 'income', component: IncomeComponent,canActivate: [authGuard], data: { title: 'Income' } },
      { path: 'expense', component: ExpenseComponent,canActivate: [authGuard], data: { title: 'Expense' } },
      { path: 'savings', component: SavingsComponent, canActivate: [authGuard], data: { title: 'Savings' } },
      { path: 'category', component: CategoryComponent, canActivate: [authGuard], data: { title: 'Category' } },
      { path: 'addexpense', component: AddexpenseComponent , canActivate: [authGuard] },
      { path: 'addincome', component: AddIncomeComponent , canActivate: [authGuard] },
      { path: 'addsavings', component: AddsavingsComponent , canActivate: [authGuard] },
      { path: 'addcate', component: AddcategoryComponent , canActivate: [authGuard]},
      { path: 'edit-savings/:id', component: EditsavingsComponent , canActivate: [authGuard] },
      { path: 'edit-expense/:id', component: EditexpenseComponent , canActivate: [authGuard] },
      { path: 'edit-income/:id', component: EditincomeComponent , canActivate: [authGuard] }



    ]
  },
  {
    path: '', component: AdminheaderComponent,
    children: [
      { path: 'activeusers', component: ActiveusersComponent , canActivate: [authGuard], data: { title: 'ActiveUsers' } },
      { path: 'deletedusers', component: DeletedusersComponent, canActivate: [authGuard], data: { title: 'DeletedUsers' } },
      { path: 'admincategory', component: AdmincategoryComponent , canActivate: [authGuard], data: { title: 'Category' } },
      { path: 'adminaddcat', component: AdminaddcatComponent , canActivate: [authGuard] }
    ]
  },
  
  { path: 'edit-user/:id', component: EdituserComponent },
 
  { path: 'profile', component: ProfileComponent , canActivate: [authGuard]},

  { path: '**', redirectTo: 'login' },


];
