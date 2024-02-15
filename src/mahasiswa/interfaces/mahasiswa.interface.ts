import type { Mahasiswa } from '@prisma/client';

// --------------------------------------------------------------------------------

export interface MahasiswaInterface extends Mahasiswa {}

export interface PostMahasiswaInterface {
  nim: number;
  nama: string;
  alamat?: string | null;
  fakultasId: number;
}

export interface ResponseDataMahasiswaInterface {
  id: number;
  nim: number;
  nama: string;
  alamat: string;
  createdAt: Date;
  updatedAt: Date;
  fakultas: {
    id: number;
    nama: string;
    kode: string;
  };
}

export interface ResponseCreateMahasiswaInterface {
  message: string;
  status: boolean;
  data?: ResponseDataMahasiswaInterface;
}

export interface ResponseGetMahasiswaInterface {
  message: string;
  status: boolean;
  data?: ResponseDataMahasiswaInterface[];
}

export interface ResponseDetailsMahasiswaInterface {
  message: string;
  status: boolean;
  data?: ResponseDataMahasiswaInterface;
}

export interface ResponseUpdateMahasiswaInterface {
  message: string;
  status: boolean;
  data?: ResponseDataMahasiswaInterface;
}

export interface ResponseDeleteMahasiswaInterface {
  message: string;
  status: boolean;
}
