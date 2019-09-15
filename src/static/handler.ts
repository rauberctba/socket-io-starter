import * as koaStatic from 'koa-static';

export const createStaticHandler = (staticFilesDir: string) => {
    return koaStatic(staticFilesDir);
};
