import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task} from './models/task.model'
// TESTING ##############################
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest  } from '@angular/common/http';
// ######################################


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createList(title: string) {
    return this.webReqService.post('lists', {title});
  }

  createTask(title: string, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, {title});
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
