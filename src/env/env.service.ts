import { Global, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvType } from "../config/env.validation";

@Injectable()
@Global()
export class EnvService {
    constructor(private configService: ConfigService<EnvType, true>) { }
    get<T extends keyof EnvType>(key: T) {
        return this.configService.get(key, { infer: true });
    }
}