import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { UpdateFakultaDto } from './dto/update-fakultas.dto';
import { CreateFakultasDto } from './dto/create-fakultas.dto';

// --------------------------------------------------------------------------------

@Injectable()
export class FakultasService {
  constructor(private prisma: PrismaService) {}

  // CRAETE FAKULTAS
  async create(createFakultasDto: CreateFakultasDto) {
    const fakultasDetails = await this.prisma.fakultas.findUnique({
      where: {
        kode: createFakultasDto.kode,
      },
    });

    if (!fakultasDetails) {
      const newFakultas = await this.prisma.fakultas.create({
        data: { kode: createFakultasDto.kode, nama: createFakultasDto.nama },
      });

      const response = {
        message: 'Fakultas berhasil dibuat.',
        status: true,
        data: newFakultas,
      };

      return response;
    }

    throw new ConflictException({
      message: `Fakultas ${createFakultasDto.kode} sudah ditersedia.`,
      status: false,
    });
  }

  // GET FAKULTAS
  async findAll() {
    const fakultasList = await this.prisma.fakultas.findMany();

    const response = {
      message: 'Fakultas berhasil ditemukan.',
      status: true,
      data: fakultasList,
    };

    return response;
  }

  // GET FAKULTAS DETAILS
  async findOne(kode: string) {
    const fakultasDetails = await this.prisma.fakultas.findUnique({
      where: {
        kode,
      },
    });

    if (fakultasDetails) {
      const response = {
        message: `Fakultas ${fakultasDetails.kode} berhasil ditemukan.`,
        status: true,
        data: fakultasDetails,
      };

      return response;
    }

    throw new NotFoundException({
      message: `Fakultas ${kode} tidak ditemukan.`,
      status: false,
    });
  }

  // UPDATE FAKULTAS
  async update(kode: string, updateFakultaDto: UpdateFakultaDto) {
    const fakultasDetails = await this.prisma.fakultas.findUnique({
      where: {
        kode,
      },
    });

    if (fakultasDetails) {
      const updateFakultas = await this.prisma.fakultas.update({
        where: {
          kode,
        },
        data: { kode: updateFakultaDto.kode, nama: updateFakultaDto.nama },
      });

      const response = {
        message: `Fakultas ${kode} berhasil diubah.`,
        status: true,
        data: updateFakultas,
      };

      return response;
    }

    throw new NotFoundException({
      message: `Fakultas ${kode} tidak ditemukan.`,
      status: false,
    });
  }

  // DELETE FAKULTAS
  async remove(kode: string) {
    const fakultasDetails = await this.prisma.fakultas.findUnique({
      where: {
        kode,
      },
    });

    if (fakultasDetails) {
      await this.prisma.fakultas.delete({
        where: {
          kode,
        },
      });

      const response = {
        message: `Fakultas ${kode} berhasil dihapus.`,
        status: true,
      };

      return response;
    }

    throw new NotFoundException({
      message: `Fakultas ${kode} tidak ditemukan.`,
      status: false,
    });
  }
}
