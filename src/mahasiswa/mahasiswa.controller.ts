import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ValidationPipe } from '@src/validation.pipe';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import {
  ResponseCreateMahasiswaInterface,
  ResponseGetMahasiswaInterface,
  ResponseDetailsMahasiswaInterface,
  ResponseUpdateMahasiswaInterface,
  ResponseDeleteMahasiswaInterface,
} from './interfaces/mahasiswa.interface';

// --------------------------------------------------------------------------------

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private readonly mahasiswaService: MahasiswaService) {}

  @Post()
  create(@Body(new ValidationPipe()) createMahasiswaDto: CreateMahasiswaDto): Promise<ResponseCreateMahasiswaInterface> {
    return this.mahasiswaService.create(createMahasiswaDto);
  }

  @Get()
  findAll(@Query() query: { fakultas: string }): Promise<ResponseGetMahasiswaInterface> {
    return this.mahasiswaService.findAll(query);
  }

  @Get(':nim')
  findOne(@Param('nim') nim: string): Promise<ResponseDetailsMahasiswaInterface> {
    return this.mahasiswaService.findOne(+nim);
  }

  @Patch(':nim')
  update(@Param('nim') nim: string, @Body() updateMahasiswaDto: UpdateMahasiswaDto): Promise<ResponseUpdateMahasiswaInterface> {
    return this.mahasiswaService.update(+nim, updateMahasiswaDto);
  }

  @Delete(':nim')
  remove(@Param('nim') nim: string): Promise<ResponseDeleteMahasiswaInterface> {
    return this.mahasiswaService.remove(+nim);
  }
}
