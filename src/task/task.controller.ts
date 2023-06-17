import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Post()
  public async create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.create(body);
  }

  @Get('/:id')
  public async getByUserId(@Param('id') id: string): Promise<Task[]> {
    return this.taskService.getByUserId(id);
  }
}
