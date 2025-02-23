import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Req
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto';
import { VerifyJWT } from '../auth/verify-jwt';

@Controller('tasks')
@UseGuards(VerifyJWT)
export class TaskController {
constructor(private taskService: TaskService) {}

@Get('getAll')
findAll(@Req() req) {
    return this.taskService.findAll(req.user.id); 
}

@Post('create')
create(@Body() createTaskDto: TaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, req.user);
}

@Put('/update/:id')
update(@Param('id') id: number, @Body() updateTaskDto: TaskDto) {
    return this.taskService.update(id, updateTaskDto);
}

@Delete('/delete/:id')
remove(@Param('id') id: number) {
    return this.taskService.remove(id);
}
}