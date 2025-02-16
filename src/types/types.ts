export interface Todo {
  id: number;
  caption: string;
  description: string;
  complete: boolean;
}

export interface ModalEditState {
  open: boolean;
  item: Partial<Todo>;
}
