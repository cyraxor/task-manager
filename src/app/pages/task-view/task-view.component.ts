import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  tasks?: Task[];
  lists?: List[];
  
  // selectedListId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // console.log('Params: ', params);
        if (params['listId']){
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: any) => {
      // console.log('Lists ', lists);
      this.lists = lists;
    })
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      console.log('Completed ', !task.completed);
      task.completed = !task.completed;

    })
  }

  onEditClick(list: List) {
    console.log('dblClicked!');
  }

  onLogoutButtonClicked() {
    console.log('Logged Out!');
    this.authService.logout()       
    this.router.navigate([ 'login' ]); 
  }
}
