import { UniversityUserObject } from 'src/university-user/dto/university-user.object';
import { CollegeUserObject } from './dto/college-user.object';
import { CourseUserObject } from './dto/course-user.object';

export type UniversityUserReturnType = Omit<
	UniversityUserObject,
	'user' | 'role' | 'collegesEnrolledAt'
>;
export type CollegeUserReturnType = Omit<
	CollegeUserObject,
	'college' | 'coursesEnrolledAt'
>;
export type CourseUserReturnType = Omit<CourseUserObject, 'course'>;
