// import path from "path";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import { Connection } from "../entities/Connection";

// https://github.com/typeorm/typeorm/issues/8810#issuecomment-1090650075
export const dataSource = new DataSource({
  type: "postgres",
  database: "coderoyale-dev",
  username: "postgres",
  password: "postgres",
  logging: true,
  synchronize: true,
  // migrations: [path.join(__dirname, "./migrations/*")],
  entities: [User, Connection],
});