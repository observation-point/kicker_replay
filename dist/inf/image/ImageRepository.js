"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// import { plainToClass } from 'class-transformer';
const Image_1 = require("./Image");
class ImageRepository {
    constructor() {
        this.repositoty = typeorm_1.getRepository(Image_1.Image);
    }
    async findById(id) {
        return await this.repositoty.findOne(id);
    }
}
exports.ImageRepository = ImageRepository;
//# sourceMappingURL=ImageRepository.js.map