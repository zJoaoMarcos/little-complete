export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/stock", "/shop", "/inventory", "/printers"],
};
