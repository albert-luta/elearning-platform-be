import { UserAssignmentObject } from './dto/user-assignment.object';

export type UserAssignmentReturnType = Omit<UserAssignmentObject, 'user'>;
