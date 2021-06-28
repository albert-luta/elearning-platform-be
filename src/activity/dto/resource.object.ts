import { ObjectType } from '@nestjs/graphql';
import { BaseActivityInterface } from './base-activity.interface';

@ObjectType({
	implements: () => [BaseActivityInterface]
})
export class ResourceObject implements BaseActivityInterface {
	id: string;
	universityId: string;
	sectionId: string;
	createdAt: Date;
	name: string;
	description: string | null;
	files: Array<string>;
	type: string;
}
