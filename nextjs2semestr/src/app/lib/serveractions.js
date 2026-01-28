"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { type } from "./../../../generated/prisma/models";
import z, { Schema } from "zod";
import { safeParse } from "./../../../node_modules/zod/v4/classic/parse";
import { object } from "./../../../node_modules/zod/v4/classic/schemas";
import { message } from "antd";

export async function createUser(initialState, formData) {
  // const files = formData.getAll("image");

  // const availableTypes = [
  //   "image/jpeg",
  //   "image/png",
  //   "image/webp",
  //   "inage.svg+xml",
  // ];

  // const imagesNames = [];

  // for (const img of files) {
  //   if (img.size > 1_000_000) {
  //     console.log("Ошибка размера, максимальный: 1 МБ");
  //     break;
  //   }
  //   if (!availableTypes.includes(img.type)) {
  //     console.log("ошибка типа");
  //     break;
  //   }

  //   const buffer = Buffer.from(await img.arrayBuffer());

  //   const imageName = Date.now() + img.name.replaceAll(" ", "_");

  //   await writeFile(join("public", "photos", imageName), buffer);

  //   imagesNames.push({ url: `/photos/${imageName}` });
  // }

  const schema = z.object({
    age: z.number().min(0).max(120),
    email: z.email(),
    username: z.string().min(4).max(25),
    password: z.string().min(8).max(20),
  });

  const validationFields = schema.safeParse({
    age: Number(formData.get("age")),
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (validationFields.success) {
    const user = await prisma.user.create({
      data: validationFields.data,
      // photos: {
      //   createMany: {
      //     data: imagesNames,
      //   },
      // },
    });

    revalidatePath("/users");

    return {
      message: "Успешно добавлен пользователь",
    };
  } else {
    return {
      error: validationFields.error.issues,
    };
  }
}

export async function deleteUser(id) {
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/users");
}

export async function updateUser(user) {
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      age: user.age,
      email: user.email,
      password: user.password,
      username: user.username,
    },
  });

  revalidatePath("/users");
}
