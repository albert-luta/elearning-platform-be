import { AssignmentObject } from './dto/assignment.object';
import { QuizObject } from './dto/quiz.object';
import { ResourceObject } from './dto/resource.object';
import { UserAssignmentObject } from './dto/user-assignment.object';

export type ActivityReturnType = ResourceObject | AssignmentObject | QuizObject;

export type UserAssignmentReturnType = Omit<UserAssignmentObject, 'user'>;
