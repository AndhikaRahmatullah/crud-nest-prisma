import { IsString, IsNotEmpty } from 'class-validator';
import { PostFakultasInterface } from '../interfaces/fakultas.interface';

// --------------------------------------------------------------------------------

export class CreateFakultasDto implements PostFakultasInterface {
  @IsString()
  @IsNotEmpty()
  kode: string;

  @IsString()
  nama: string;
}
