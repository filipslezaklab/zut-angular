export type Task = {
  id: number;
  title: string;
  completed: boolean;
  archived: boolean;
  deadline?: Date;
}

export enum ApiSort {
  DESC = 'desc',
  ASC = 'asc'
}

export type CreateTaskRequest = Omit<Task, 'id'>;

export type PatchTaskRequest = {
  id: number;
  task: Partial<Omit<Task, 'id'>>;
};
