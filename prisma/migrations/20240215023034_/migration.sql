/*
  Warnings:

  - You are about to drop the `MataKuliah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MahasiswaToMataKuliah` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[kode]` on the table `Fakultas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode` to the `Fakultas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MahasiswaToMataKuliah" DROP CONSTRAINT "_MahasiswaToMataKuliah_A_fkey";

-- DropForeignKey
ALTER TABLE "_MahasiswaToMataKuliah" DROP CONSTRAINT "_MahasiswaToMataKuliah_B_fkey";

-- DropIndex
DROP INDEX "Fakultas_nama_key";

-- AlterTable
ALTER TABLE "Fakultas" ADD COLUMN     "kode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "mataKuliah" TEXT[];

-- DropTable
DROP TABLE "MataKuliah";

-- DropTable
DROP TABLE "_MahasiswaToMataKuliah";

-- CreateIndex
CREATE UNIQUE INDEX "Fakultas_kode_key" ON "Fakultas"("kode");
