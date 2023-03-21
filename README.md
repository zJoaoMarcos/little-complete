# Todo

[ ] - Build U.I
[ ] - Prisma + DB
[ ] - Create Schemmas
[ ] - Add Functions With DB

### Item

model stock {
id String @id @default(uuid())
name String
description String
type String
amount Int
amount_min Int
local String
}
