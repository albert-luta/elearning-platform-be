import { Injectable } from '@nestjs/common';
import { CreateJustForQueryInput } from './dto/create-just-for-query.input';
import { UpdateJustForQueryInput } from './dto/update-just-for-query.input';

@Injectable()
export class JustForQueryService {
	create(createJustForQueryInput: CreateJustForQueryInput) {
		createJustForQueryInput;
		return 'This action adds a new justForQuery';
	}

	findAll() {
		return `This action returns all justForQuery`;
	}

	findOne(id: number) {
		return `This action returns a #${id} justForQuery`;
	}

	update(id: number, updateJustForQueryInput: UpdateJustForQueryInput) {
		updateJustForQueryInput;
		return `This action updates a #${id} justForQuery`;
	}

	remove(id: number) {
		return `This action removes a #${id} justForQuery`;
	}
}
