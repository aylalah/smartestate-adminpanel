import { ExecutionContext } from '@nestjs/common';
import { I18nResolver } from 'nestjs-i18n';
export declare class I18nRedisResolverService implements I18nResolver {
    resolve(context: ExecutionContext): Promise<string>;
}
