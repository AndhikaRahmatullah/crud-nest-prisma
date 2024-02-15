/*
  Warnings:

  - You are about to drop the column `mataKuliah` on the `Mahasiswa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "mataKuliah",
ALTER COLUMN "alamat" DROP NOT NULL;
