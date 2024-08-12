// src/todo/todo.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { TodoService } from './service/todo.service';
import { Todo, TodoDocument } from './schema/todo.schema';
import { CreateTodoDto } from './dtos/create-todo.dto';

const mockTodo = {
  title: 'Test Todo',
  description: 'Testing the Todo Service',
  isDone: false,
};

// Helper function to create a mock Todo document
const mockTodoDocument = (mock?: Partial<Todo>): Partial<Document<unknown, {}, Todo> & Todo> => ({
  ...mock,
  _id: 'someObjectId',
  save: jest.fn(),
});

// Mock implementation of the Mongoose model
const mockTodoModel = {
  new: jest.fn().mockResolvedValue(mockTodoDocument(mockTodo)),
  constructor: jest.fn().mockResolvedValue(mockTodoDocument(mockTodo)),
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
  exec: jest.fn(),
};

describe('TodoService', () => {
  let service: TodoService;
  let model: Model<TodoDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    model = module.get<Model<TodoDocument>>(getModelToken(Todo.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new todo', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockTodoDocument(mockTodo) as any));
    const createTodoDto: CreateTodoDto = { title: 'Test Todo' };
    const newTodo = await service.create(createTodoDto);
    expect(newTodo).toEqual(expect.objectContaining(mockTodo));
  });
});
