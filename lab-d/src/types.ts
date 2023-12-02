export type Task = {
  id: number;
  title: string;
  deadline: Date;
  completed: boolean;
  archived: boolean;
}

export enum ApiSort {
  DESC = 'desc',
  ASC = 'asc'
}

export type CreateTaskRequest = Omit<Task, 'id'>;

export type PatchTaskRequest = Partial<Task>;
