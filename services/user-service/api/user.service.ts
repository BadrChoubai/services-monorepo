import { DataSource, DeleteResult, Repository } from "typeorm";
import { userDb } from "./user.db";
import { User } from "./user.entity";


interface IUserService {
    userRepository: Repository<User>;
    getUsers: () => Promise<User[]>;
    getUser: (userId: number) => Promise<User | null>;
    createUser: (newUser: User) => Promise<User>;
    updateUser: (userId: number, updatedUserDetails: User) => Promise<User | null>;
    deleteUser: (userId: number) => Promise<DeleteResult>;
}


class UserService implements IUserService {
    userRepository: Repository<User>;

    constructor(dataSource: DataSource) {
        this.userRepository = dataSource.getRepository(User)
    }
    
    async getUsers() {
        const users = await this.userRepository.find()
        return users
    }
    
    async getUser(userId: number): Promise<User | null> {
        const results = await this.userRepository.findOneBy({
            id: userId,
        })
        return results
    }
    
    async createUser(newUser: User): Promise<User> { 
        const user = await this.userRepository.create(newUser);
        const result = await this.userRepository.save(user);

        return result
    }

    async updateUser(userId: number, updatedUserDetails: User): Promise<User | null> {
        let updatedUser;
        const user = await this.userRepository.findOneBy({
            id: userId,
        })

        if (user != null) {
            this.userRepository.merge(user, updatedUserDetails);
            updatedUser = await this.userRepository.save(user);
        } else {
            updatedUser = null;
        }

        return updatedUser;  
    }

    async deleteUser(userId: number): Promise<DeleteResult> {
        const result = await this.userRepository.delete(userId);
        return result
    }
    
} 

export const userService = new UserService(userDb);