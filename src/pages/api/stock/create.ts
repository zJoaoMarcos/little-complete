/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method === "POST") {
    const { name, description, type, amount, amount_min, local } = body;

    const newItem = await prisma.stock.create({
      data: {
        name,
        description,
        type,
        amount,
        amount_min,
        local,
      },
    });

    return res.status(201).json(newItem);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
