import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PostMahasiswaInterface } from '../interfaces/mahasiswa.interface';

// --------------------------------------------------------------------------------

export class CreateMahasiswaDto implements PostMahasiswaInterface {
  @IsNumber()
  @IsNotEmpty()
  nim: number;

  @IsString()
  @IsNotEmpty()
  nama: string;

  alamat?: string;

  @IsNumber()
  @IsNotEmpty()
  fakultasId: number;
}
