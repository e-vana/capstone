export interface iTask {
  id: number;
  event_id: number;
  name: string;
  description: string;
  completed: number;
  completed_by_user_id: number;
  completed_at: Date;
  updated_at: Date;
}

export interface iGetTask {
  success: boolean;
  task: iTask;
}

export interface iGetTasks {
  success: boolean;
  tasks: iTask[];
}
