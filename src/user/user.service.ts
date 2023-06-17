import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = new this.usersModel(signUpDto);
    return user.save();
  }

  public async signIn(
    signInDto: SignInDto,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    const user = await this.findByEmail(signInDto.email);

    const match = await this.checkPassword(signInDto.password, user);

    if (!match) {
      throw new NotFoundException('Credenciais inválidas!');
    }

    const jwtToken = await this.authService.createAccessToken(
      user._id.toString(),
    );

    return { name: user.name, jwtToken, email: user.email };
  }

  private async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.usersModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Email nao encontrado!');
    }

    return user;
  }

  public async findById(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id });
  }

  public async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new NotFoundException('Credenciais inválidas!');
    }

    return match;
  }
}
