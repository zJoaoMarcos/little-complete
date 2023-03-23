/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  if (method === "PUT") {
    const item_id = query.item_id as string;

    const { partner, type, amount, department } = body;

    const item = await prisma.stock.findUnique({
      where: {
        id: item_id,
      },
    });

    if (!item) {
      return res.status(400).json({ message: "Item don't exits" });
    }

    const updateAmount =
      type === "input"
        ? item.amount + Number(amount)
        : item.amount - Number(amount);

    if (updateAmount < 0) {
      return res.status(404).json({ message: "Unavailable amount " });
    }

    const [updatedItem, newMovement] = await prisma.$transaction([
      prisma.stock.update({
        where: {
          id: item_id,
        },
        data: {
          amount: updateAmount,
        },
      }),
      prisma.stock_movements.create({
        data: {
          stock_id: item_id,
          movement_type: type,
          partner,
          department,
          amount: updateAmount,
        },
      }),
    ]);

    return res
      .status(202)
      .json({ item_updated: updatedItem, movement: newMovement });
  } else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method not allowed");
  }
};
