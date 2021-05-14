import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import p from 'path';
import { PUBLIC_DIR_NAME } from 'src/global/file/file.constants';
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: p.resolve(
				p.dirname(p.dirname(p.dirname(require.main?.filename ?? ''))),
				PUBLIC_DIR_NAME
			),
			exclude: ['/graphql']
		})
	]
})
export class MyServeStaticModule {}
