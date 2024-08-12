import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from '../schema/todo.schema';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
  
  @UseFilters(HttpExceptionFilter) // Apply the HttpExceptionFilter to the create method
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  @UseFilters(HttpExceptionFilter) // Apply the HttpExceptionFilter to the findAll method
  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  @UseFilters(HttpExceptionFilter) // Apply the HttpExceptionFilter to the findOne
  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  @UseFilters(HttpExceptionFilter) // Apply the HttpExceptionFilter to the update
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const existingTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return existingTodo;
  } 

  @UseFilters(HttpExceptionFilter) // Apply the HttpExceptionFilter to the remove
  async remove(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel
      .findOneAndDelete({ _id: id })
      .exec();
    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return deletedTodo;
  }
}
