"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function sanitizeText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function saveImage(formData: FormData, fallbackUrl?: string) {
  const file = formData.get("imageFile");
  const suppliedUrl = sanitizeText(formData.get("imageUrl"));

  if (file instanceof File && file.size > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    return `/uploads/${fileName}`;
  }

  return suppliedUrl || fallbackUrl || "";
}

export async function createProduct(formData: FormData) {
  const imageUrl = await saveImage(formData);

  await prisma.product.create({
    data: {
      name: sanitizeText(formData.get("name")),
      type: sanitizeText(formData.get("type")),
      description: sanitizeText(formData.get("description")),
      price: Number(formData.get("price") ?? 0),
      heatingCapacity: sanitizeText(formData.get("heatingCapacity")),
      scop: Number(formData.get("scop") ?? 0),
      imageUrl,
      isVisible: formData.get("isVisible") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/tuotteet");
  revalidatePath("/admin");
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  const currentProduct = await prisma.product.findUnique({ where: { id } });
  const imageUrl = await saveImage(formData, currentProduct?.imageUrl ?? "");

  await prisma.product.update({
    where: { id },
    data: {
      name: sanitizeText(formData.get("name")),
      type: sanitizeText(formData.get("type")),
      description: sanitizeText(formData.get("description")),
      price: Number(formData.get("price") ?? 0),
      heatingCapacity: sanitizeText(formData.get("heatingCapacity")),
      scop: Number(formData.get("scop") ?? 0),
      imageUrl,
      isVisible: formData.get("isVisible") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/tuotteet");
  revalidatePath("/admin");
}

export async function deleteProduct(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!id) {
    return;
  }

  await prisma.product.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/tuotteet");
  revalidatePath("/admin");
}

export async function saveSiteContent(formData: FormData) {
  const entries = [
    ["heroHeading", sanitizeText(formData.get("heroHeading"))],
    ["heroBody", sanitizeText(formData.get("heroBody"))],
    ["companyName", sanitizeText(formData.get("companyName"))],
    ["companyEmail", sanitizeText(formData.get("companyEmail"))],
    ["companyPhone", sanitizeText(formData.get("companyPhone"))],
    ["companyAddress", sanitizeText(formData.get("companyAddress"))],
  ] as Array<[string, string]>;

  for (const [key, value] of entries) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  revalidatePath("/");
  revalidatePath("/tuotteet");
  revalidatePath("/yhteystiedot");
  revalidatePath("/admin");
}
