import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Get()
  public async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Post()
  public async create(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.create(body);
  }

  @Get('user/:id')
  public async getByUserId(@Param('id') id: string): Promise<Task[]> {
    return this.taskService.getByUserId(id);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<Task> {
    return this.taskService.delete(id);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, body);
  }
}
