import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { User } from './schemas/user.schema';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.userService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(
    @Body() signInDto: SignInDto,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    return this.userService.signIn(signInDto);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async get(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getAll() {
    return this.userService.findAll();
  }
}
