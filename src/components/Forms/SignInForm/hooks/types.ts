import { z } from "zod";
import { SignInSchema } from "./schema";

export type SignInData = z.infer<typeof SignInSchema>;
