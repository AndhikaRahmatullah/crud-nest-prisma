import { PartialType } from '@nestjs/mapped-types';
import { CreateFakultasDto } from './create-fakultas.dto';

export class UpdateFakultaDto extends PartialType(CreateFakultasDto) {}
