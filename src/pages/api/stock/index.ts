/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "GET") {
    const items = await prisma.stock.findMany({
      orderBy: { created_at: "asc" },
    });

    return res.status(201).json({ items: items });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
  }
};
