/* eslint-disable react-hooks/rules-of-hooks */
import { Button, useColorModeValue } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  number,
  isCurrent = false,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        colorScheme={useColorModeValue("blackAlpha", "gray")}
        isDisabled
        size="sm"
      >
        {number}
      </Button>
    );
  }

  return (
    <Button colorScheme="pink" onClick={() => onPageChange(number)} size="sm">
      {number}
    </Button>
  );
}
