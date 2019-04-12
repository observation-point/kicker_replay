"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// import { plainToClass } from 'class-transformer';
const Record_1 = require("./Record");
class RecordRepository {
    constructor() {
        this.repositoty = typeorm_1.getRepository(Record_1.Record);
    }
    async findById(id) {
        return await this.repositoty.findOne(id);
    }
}
exports.RecordRepository = RecordRepository;
//# sourceMappingURL=RecordRepository.js.map