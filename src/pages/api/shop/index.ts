/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  const skip = query.skip ? Number(query.skip) : 0;
  const take = query.take ? Number(query.take) : 50;

  // @ts-ignore: Unreachable code error
  BigInt.prototype.toJSON = function (): string {
    return this.toString();
  };

  if (method === "GET") {
    const [totalCount, items] = await prisma.$transaction([
      prisma.$executeRaw`
    SELECT COUNT(*) FROM stock
    WHERE amount <= amount_min`,
      prisma.$queryRaw` 
    SELECT * FROM stock 
    WHERE amount <= amount_min
    ORDER BY created_at ASC 
    LIMIT ${take} OFFSET ${skip}`,
    ]);

    return res.status(201).json({ totalCount, items });
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method not allowed");
  }
};
