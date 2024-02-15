import type { Fakultas } from '@prisma/client';

// --------------------------------------------------------------------------------

export interface FakultasInterface extends Fakultas {}

export interface PostFakultasInterface {
  kode: string;
  nama: string;
}
