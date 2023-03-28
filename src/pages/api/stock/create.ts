/* eslint-disable import/no-anonymous-default-export */
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method === "POST") {
    const { name, description, type, amount_min, local } = body;

    const session = await getSession({ req });

    const newItem = await prisma.stock.create({
      data: {
        name,
        description,
        type,
        amount: 0,
        amount_min,
        local,
        created_by: session?.user?.email!,
      },
    });

    return res.status(201).json({ item: newItem });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
