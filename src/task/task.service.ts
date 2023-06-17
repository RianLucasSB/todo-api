import { Inject, Injectable } from '@nestjs/common';
import { TaksDocument, Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaksDocument>,

    private readonly userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userService.findById(createTaskDto.userId);

    const task = new this.taskModel({
      user,
      ...createTaskDto,
    });

    return task.save();
  }

  public async getAll(): Promise<Task[]> {
    return this.taskModel.find();
  }

  public async getByUserId(id: string): Promise<Task[]> {
    return this.taskModel.find({ user: id });
  }
}
