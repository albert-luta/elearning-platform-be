import { Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';

@Resolver()
export class CourseResolver {
	constructor(private readonly courseService: CourseService) {}
}
