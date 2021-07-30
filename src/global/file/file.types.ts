export interface UniversityIdentification {
	universityId: string;
}

export interface CollegeIdentification extends UniversityIdentification {
	collegeId: string;
}

export interface CourseIdentification extends CollegeIdentification {
	courseId: string;
}

export interface SectionIdentification extends CourseIdentification {
	sectionId: string;
}

export interface ActivityIdentification extends SectionIdentification {
	activityId: string;
}

export interface UserActivityIdentification extends ActivityIdentification {
	userId: string;
}
