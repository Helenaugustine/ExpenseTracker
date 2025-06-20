import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { SignupComponent } from './common/signup/signup.component';
import { HeadersideComponent } from './components/headerside/headerside.component';
import { IncomeComponent } from './components/income/income.component';
import { SavingsComponent } from './components/savings/savings.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { CategoryComponent } from './components/category/category.component';
import { AdmincategoryComponent } from './adminside/admincategory/admincategory.component';
import { AdminheaderComponent } from './adminside/adminheader/adminheader.component';
import { ActiveusersComponent } from './adminside/activeusers/activeusers.component';
import { DeletedusersComponent } from './adminside/deletedusers/deletedusers.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SignupComponent,LoginComponent,HeadersideComponent,
    IncomeComponent,SavingsComponent,ExpenseComponent,CategoryComponent,
    AdmincategoryComponent,AdminheaderComponent,ActiveusersComponent,
  DeletedusersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expensetracker';
}
