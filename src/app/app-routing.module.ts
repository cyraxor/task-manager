import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  // { path: '', component: TaskViewComponent }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
