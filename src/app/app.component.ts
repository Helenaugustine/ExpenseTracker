import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { IncomeComponent } from './components/income/income.component';
import { SavingsComponent } from './components/savings/savings.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { CategoryComponent } from './components/category/category.component';
import { AdmincategoryComponent } from './adminside/admincategory/admincategory.component';
import { AdminheaderComponent } from './adminside/adminheader/adminheader.component';
import { ActiveusersComponent } from './adminside/activeusers/activeusers.component';
import { DeletedusersComponent } from './adminside/deletedusers/deletedusers.component';
import { AddexpenseComponent } from './components/addexpense/addexpense.component';
import { AddcategoryComponent } from './common/addcategory/addcategory.component';
import { AddincomeComponent } from './components/addincome/addincome.component';
import { AddsavingsComponent } from './components/addsavings/addsavings.component';
import { ProfileComponent } from './common/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    SignupComponent,
    LoginComponent,
    IncomeComponent,
    SavingsComponent,
    ExpenseComponent,
    CategoryComponent,
    AdmincategoryComponent,
    AdminheaderComponent,
    ActiveusersComponent,
    DeletedusersComponent,
    AddexpenseComponent,
    AddcategoryComponent,
    AddincomeComponent,
    AddsavingsComponent,
    ProfileComponent,
    HomeComponent,
    FormsModule,
    CommonModule,
    LayoutComponent
 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'expensetracker';
}
