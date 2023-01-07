import { DataSource } from "typeorm"

export const userDb = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "servicesdb",
    entities: ["src/user.entity.js"],
    logging: true,
    synchronize: true,
})