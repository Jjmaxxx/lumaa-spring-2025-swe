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
    return this.taskService.findAll(req.user.sub); 
}

@Post('create')
create(@Body() createTaskDto: TaskDto, @Req() req) {
    return this.taskService.create(createTaskDto, req.user);
}

@Put('/update/:id')
update(@Param('id') id: number, @Body() updateTaskDto: TaskDto, @Req() req) {
    return this.taskService.update(req.user.sub,id, updateTaskDto);
}

@Delete('/delete/:id')
remove(@Param('id') id: number, @Req() req) {
    return this.taskService.remove(req.user.sub,id);
}
}