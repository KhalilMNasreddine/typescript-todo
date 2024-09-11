interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }
    
  interface User {
    id: number;
    name: string;
  }
  
  
  function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Method ${propertyKey} called with arguments: ${JSON.stringify(args)}`);
      return originalMethod.apply(this, args);
    };
  }
  
  
  class TaskManager {
    private tasks: Task[] = [];
    
    @logMethod
    addTask(user: User, task: Task) {
      this.tasks.push(task);
      console.log(`Task "${task.title}" added by ${user.name}.`);
    }
   
    @logMethod
    completeTask(user: User, taskId: number) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = true;
        console.log(`Task "${task.title}" marked as completed by ${user.name}.`);
      } else {
        console.log(`Task with ID ${taskId} not found.`);
      }
    }
    
    @logMethod
    getTasks(): Task[] {
      return this.tasks;
    }
  }
  
  
  const user: User = { id: 1, name: "Khalill" };
  const taskManager = new TaskManager();
  //
  taskManager.addTask(user, { id: 1, title: "Learn TypeScript", description: "Study advanced TypeScript features", completed: false });
  taskManager.completeTask(user, 1);
  
  
  taskManager.addTask(user, { id: 2, title: "Learn Angular", description: "Study advanced Angular features", completed: false });
  taskManager.completeTask(user, 2);
  
  console.log(taskManager.getTasks()); 