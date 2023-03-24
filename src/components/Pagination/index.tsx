import { HStack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountofRegisters: number;
  registersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 4;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountofRegisters,
  registersPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountofRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <HStack justify="end">
      {currentPage > 1 + siblingsCount && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > +siblingsCount && <Text as="p">...</Text>}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          );
        })}

      <PaginationItem
        onPageChange={onPageChange}
        number={currentPage}
        isCurrent
      />

      {nextPages.length > 0 &&
        nextPages.map((page) => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          );
        })}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <Text as="p">...</Text>
          )}
          <PaginationItem onPageChange={onPageChange} number={lastPage} />
        </>
      )}
    </HStack>
  );
}
