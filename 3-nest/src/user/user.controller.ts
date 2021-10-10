import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get("/all")
    getAll(){
        return this.userService.getAll();
    }
    @Get("/:id")
    getSpecificUser(@Param('id') id: string){
        return this.userService.getSpecificUser(id);
    }
    @Post('/register')
    addUser(@Body() body: any) {
        return this.userService.addUser(body);
    }
    @Post('/login')
    loginUser(@Body() body: any) {
        return this.userService.login(body);
    }
    @Delete('/:id')
    removeUser(@Param("id") id:string) {
        return this.userService.deleteUser(id);
    }
    @Put('/:id')
    replaceUser(@Param("id") id:string, @Body() body: any) {
        return this.userService.replaceUser(id,body);
    }
    @Patch('/:id')
    replaceSomeDetails(@Param("id") id:string, @Body() body: any) {
        return this.userService.replaceSomeDetails(id,body);
    }
    @Get("/search/:term")
    searchUserData(@Param("term") term:string){
        return this.userService.searchUserData(term);
    }
}