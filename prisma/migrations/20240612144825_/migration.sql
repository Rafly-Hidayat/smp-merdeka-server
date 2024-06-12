/*
  Warnings:

  - A unique constraint covering the columns `[class_name]` on the table `classes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `classes_class_name_key` ON `classes`(`class_name`);
