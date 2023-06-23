import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaksDocument, Task } from './schemas/task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UserService } from 'src/user/user.service';
import { UpdateTaskDto } from './dtos/update-task.dto';

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

  public async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  public async getByUserId(id: string): Promise<Task[]> {
    return this.taskModel.find({ user: id });
  }

  public async delete(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskModel.deleteOne({ _id: id });
    return task;
  }

  public async update(id: string, body: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.taskModel.updateOne({ _id: id }, body).exec();
    return this.taskModel.findById(id);
  }
}
