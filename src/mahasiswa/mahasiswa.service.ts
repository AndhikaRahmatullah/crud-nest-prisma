import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';

// --------------------------------------------------------------------------------

@Injectable()
export class MahasiswaService {
  constructor(private prisma: PrismaService) {}

  // CREATE MAHASISWA
  async create(createMahasiswaDto: CreateMahasiswaDto) {
    const mahasiswaDetails = await this.prisma.mahasiswa.findUnique({
      where: {
        nim: createMahasiswaDto.nim,
      },
    });

    if (!mahasiswaDetails) {
      if (createMahasiswaDto.fakultasId) {
        const fakultasDetails = await this.prisma.fakultas.findUnique({
          where: {
            id: createMahasiswaDto.fakultasId,
          },
        });

        if (!fakultasDetails) {
          throw new NotFoundException({
            message: `Fakultas ${createMahasiswaDto.fakultasId} tidak ditemukan.`,
            status: false,
          });
        }
      }

      const newMahasiswa = await this.prisma.mahasiswa.create({
        data: {
          nim: createMahasiswaDto.nim,
          nama: createMahasiswaDto.nama,
          alamat: createMahasiswaDto.alamat,
          fakultasId: createMahasiswaDto.fakultasId,
        },
        select: {
          id: true,
          nim: true,
          nama: true,
          alamat: true,
          createdAt: true,
          updatedAt: true,
          fakultas: {
            select: {
              id: true,
              kode: true,
              nama: true,
            },
          },
        },
      });

      const response = {
        message: 'Mahasiswa berhasil dibuat.',
        status: true,
        data: newMahasiswa,
      };

      return response;
    }

    throw new ConflictException({
      message: `Mahasiswa ${createMahasiswaDto.nim} sudah ditersedia.`,
      status: false,
    });
  }

  // GET MAHASISWA
  async findAll(query: { fakultas: string }) {
    const mahasiswaList = await this.prisma.mahasiswa.findMany({
      select: {
        id: true,
        nim: true,
        nama: true,
        alamat: true,
        createdAt: true,
        updatedAt: true,
        fakultas: {
          select: {
            id: true,
            kode: true,
            nama: true,
          },
        },
      },
    });

    let dataMahasiswaList = mahasiswaList;

    if (query.fakultas) {
      const filteredMahasiswa = dataMahasiswaList.filter((mahasiswa) => mahasiswa.fakultas.nama === query.fakultas);

      dataMahasiswaList = filteredMahasiswa;
    }

    const response = {
      message: 'Mahasiswa berhasil ditemukan.',
      status: true,
      data: dataMahasiswaList,
    };

    return response;
  }

  // GET MAHASISWA DETAILS
  async findOne(nim: number) {
    const mahasiswaDetails = await this.prisma.mahasiswa.findUnique({
      where: {
        nim,
      },
      select: {
        id: true,
        nim: true,
        nama: true,
        alamat: true,
        createdAt: true,
        updatedAt: true,
        fakultas: {
          select: {
            id: true,
            kode: true,
            nama: true,
          },
        },
      },
    });

    if (mahasiswaDetails) {
      const response = {
        message: `Mahasiswa ${mahasiswaDetails.nim} berhasil ditemukan.`,
        status: true,
        data: mahasiswaDetails,
      };

      return response;
    }

    throw new NotFoundException({
      message: `Mahasiswa ${nim} tidak ditemukan.`,
      status: false,
    });
  }

  // UPDATE MAHASISWA
  async update(nim: number, updateMahasiswaDto: UpdateMahasiswaDto) {
    const mahasiswaDetails = await this.prisma.mahasiswa.findUnique({
      where: {
        nim,
      },
    });

    if (mahasiswaDetails) {
      if (updateMahasiswaDto.fakultasId) {
        const fakultasDetails = await this.prisma.fakultas.findUnique({
          where: {
            id: updateMahasiswaDto.fakultasId,
          },
        });

        if (!fakultasDetails) {
          throw new NotFoundException({
            message: `Fakultas ${updateMahasiswaDto.fakultasId} tidak ditemukan.`,
            status: false,
          });
        }
      }

      const updateMahasiswa = await this.prisma.mahasiswa.update({
        where: {
          nim,
        },
        data: {
          nim: updateMahasiswaDto.nim,
          nama: updateMahasiswaDto.nama,
          alamat: updateMahasiswaDto.alamat,
          fakultasId: updateMahasiswaDto.fakultasId,
        },
        select: {
          id: true,
          nim: true,
          nama: true,
          alamat: true,
          createdAt: true,
          updatedAt: true,
          fakultas: {
            select: {
              id: true,
              kode: true,
              nama: true,
            },
          },
        },
      });

      const response = {
        message: `Mahasiswa ${nim} berhasil diubah.`,
        status: true,
        data: updateMahasiswa,
      };

      return response;
    }

    throw new NotFoundException({
      message: `Mahasiswa ${nim} tidak ditemukan.`,
      status: false,
    });
  }

  // DELETE MAHASISWA
  async remove(nim: number) {
    const mahasiswaDetails = await this.prisma.mahasiswa.findUnique({
      where: {
        nim,
      },
    });

    if (mahasiswaDetails) {
      await this.prisma.mahasiswa.delete({
        where: {
          nim,
        },
      });

      const response = {
        message: `Mahasiswa ${nim} berhasil dihapus.`,
        status: true,
      };

      return response;
    }

    throw new NotFoundException({
      message: `Mahasiswa ${nim} tidak ditemukan.`,
      status: false,
    });
  }
}
