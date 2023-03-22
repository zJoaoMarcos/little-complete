/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  if (method === "PUT") {
    const item_id = query.item_id as string;

    const { name, description, type, amount, amount_min, local } = body;

    const itemExists = await prisma.stock.findUnique({
      where: {
        id: item_id,
      },
    });

    if (!itemExists) {
      return res.status(400).json({ error: "Item don't exits" });
    }

    const updatedItem = await prisma.stock.update({
      where: {
        id: item_id,
      },
      data: {
        name,
        description,
        type,
        amount,
        amount_min,
        local,
      },
    });

    return res.status(202).json({ item_deleted: updatedItem });
  } else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method not allowed");
  }
};
