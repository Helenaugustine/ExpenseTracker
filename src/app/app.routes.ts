// import { Routes } from '@angular/router';
// import { LoginComponent } from './common/login/login.component';
// import { AdminheaderComponent } from './adminside/adminheader/adminheader.component';
// import { HeadersideComponent } from './components/headerside/headerside.component';
// import { SignupComponent } from './common/signup/signup.component';
// import { HomeComponent } from './home/home.component';
// import { ExpenseComponent } from './components/expense/expense.component';
// import { IncomeComponent } from './components/income/income.component';
// import { SavingsComponent } from './components/savings/savings.component';
// import { CategoryComponent } from './components/category/category.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'admin-dashboard', component: AdminheaderComponent },
//   { path: 'user-dashboard', component: HeadersideComponent },
//   { path: 'signup', component: SignupComponent },
//   {path: 'home',component:HomeComponent},
//   {path: 'expense',component:ExpenseComponent},
//   {path: 'income' , component:IncomeComponent},
//   {path: 'savings' , component:SavingsComponent},
//   {path: 'category', component:CategoryComponent}
//   // Add others as needed
// ];
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
      
    ]
  },
  {path: 'addexpense', component:AddexpenseComponent},
  {path: 'addincome', component:AddIncomeComponent},
  { path: '**', redirectTo: 'login' },
  

];
