import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export default async function createMovie(req: NextApiRequest, res: NextApiResponse<any>) {
  const data = JSON.parse(req.body);

  const createdMovie = await prisma.movie.create({
    data,
  });

  res.json(createdMovie);
}
