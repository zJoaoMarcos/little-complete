import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { Archive } from "@phosphor-icons/react";
import { EntryTransactionItemForm } from "./EntryTransactionItemForm";
import { OutputTransactionForm } from "./OutputTransactionItemForm";
import { TransactionStockItemModalProps } from "./types";

export function TransactionStockItemModal({
  item,
  isOpen,
  onClose,
}: TransactionStockItemModalProps) {
  const [transactionType, setTransactionType] = useState("entry");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>
          Movimentação do Item: <Text as="span">{item.model}</Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <RadioGroup colorScheme="purple" defaultValue="entry">
            <Text>Qual é o tipo de movimentação ?</Text>
            <Stack spacing={6} direction="row" mt="2">
              <Radio
                value="entry"
                onChange={(e) => setTransactionType(e.target.value)}
              >
                Entrada
              </Radio>
              <Radio
                value="output"
                onChange={(e) => setTransactionType(e.target.value)}
              >
                Saída
              </Radio>
            </Stack>
          </RadioGroup>

          <Divider my="3" />

          {transactionType === "entry" && (
            <EntryTransactionItemForm itemId={item.id} onClose={onClose} />
          )}

          {transactionType === "output" && (
            <OutputTransactionForm itemId={item.id} onClose={onClose} />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            form="transaction"
            colorScheme="purple"
            leftIcon={<Archive />}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
