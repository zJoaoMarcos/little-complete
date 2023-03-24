/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  const skip = query.skip ? Number(query.skip) : 0;
  const take = query.take ? Number(query.take) : 50;

  if (method === "GET") {
    const [items, totalCount] = await prisma.$transaction([
      prisma.stock.findMany({
        orderBy: { created_at: "asc" },
        skip,
        take,
      }),
      prisma.stock.count(),
    ]);

    return res.status(201).json({ items: items, totalCount });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
  }
};
