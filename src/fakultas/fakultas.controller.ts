import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidationPipe } from '@src/validation.pipe';
import { FakultasService } from './fakultas.service';
import { UpdateFakultaDto } from './dto/update-fakultas.dto';
import { CreateFakultasDto } from './dto/create-fakultas.dto';

@Controller('fakultas')
export class FakultasController {
  constructor(private readonly fakultasService: FakultasService) {}

  @Post()
  create(@Body(new ValidationPipe()) createFakultasDto: CreateFakultasDto) {
    return this.fakultasService.create(createFakultasDto);
  }

  @Get()
  findAll() {
    return this.fakultasService.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    return this.fakultasService.findOne(kode);
  }

  @Patch(':kode')
  update(@Param('kode') kode: string, @Body() updateFakultaDto: UpdateFakultaDto) {
    return this.fakultasService.update(kode, updateFakultaDto);
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    return this.fakultasService.remove(kode);
  }
}
