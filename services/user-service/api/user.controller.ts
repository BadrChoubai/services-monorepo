import { Router } from 'express';
import { DeleteResult } from 'typeorm';
import { User } from "./user.entity";
import { userService } from "./user.service";

const userController = Router();

userController.get<{}, {}>("/users", async function (req, res) {
    console.log('users')
    const users = await userService.getUsers();
    res.json(users)
})

userController.get<{ userId: number }, User | null>("/users/:id", async function (req, res) {
    const result = await userService.getUser(req.params.userId);
    res.json(result);
})

userController.post<{ userDetails: User }, User>("/users", async function (req, res) {
    const userDetails = JSON.parse(req.body.userDetails)
    const newUser = await userService.createUser(userDetails)
    res.json(newUser)
})

userController.put<{ userDetails: User }, User>("/users/:id", async function (req, res) {
    const userDetails = JSON.parse(req.body.userDetails)
    const result = await userService.createUser(userDetails);
    return res.json(result)
})

userController.delete<{ userId: number }, DeleteResult>("/users/:id", async function (req, res) {
    const deleteResult = await userService.deleteUser(req.params.userId)
    return res.json(deleteResult)
})

export default userController;
