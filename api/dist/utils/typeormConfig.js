"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const Connection_1 = require("../entities/Connection");
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    database: "coderoyale-dev",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [User_1.User, Connection_1.Connection],
});
//# sourceMappingURL=typeormConfig.js.map