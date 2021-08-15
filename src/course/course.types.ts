import { PrismaNullable } from 'src/general/utils/types';
import { CourseObject } from './dto/course.object';

export type CourseReturnType = PrismaNullable<
	Omit<CourseObject, 'activitiesGrade'>
>;
