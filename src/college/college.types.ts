import { PrismaNullable } from 'src/general/utils/types';
import { CollegeObject } from './dto/college.object';

export type CollegeReturnType = PrismaNullable<Omit<CollegeObject, 'courses'>>;
