/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  if (method === "DELETE") {
    const item_id = query.item_id as string;

    const deletedItem = await prisma.stock.delete({
      where: {
        id: item_id,
      },
    });

    return res.status(202).json({ message: "ok", item_deleted: deletedItem });
  } else {
    res.setHeader("Allow", "DELETE");
    res.status(405).end("Method not allowed");
  }
};
