import { AssignmentObject } from './dto/assignment.object';
import { QuizObject } from './dto/quiz.object';
import { ResourceObject } from './dto/resource.object';

export type ActivityReturnType = ResourceObject | AssignmentObject | QuizObject;
