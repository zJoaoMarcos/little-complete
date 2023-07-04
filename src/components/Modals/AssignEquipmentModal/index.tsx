import {
  Button,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import { EquipmentRadioGroup } from "./EquipmentRadioGroup";
import { useAssignEquipment } from "./hooks/useAssignEquipment";
import { AssignEquipmentModalProps } from "./types";

export function AssignEquipmentModal({
  isOpen,
  onClose,
  username,
}: AssignEquipmentModalProps) {
  const { data, handleAssign, setValue, setType, typeOptions } =
    useAssignEquipment(username, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent position="absolute">
        <ModalHeader>
          <HStack justifyContent="space-between" p="5">
            <Text>Atribuir Equipamento</Text>

            <HStack alignItems="center" justifyContent="center">
              <FormLabel>Tipo:</FormLabel>
              <Select onChange={(e) => setType(e.target.value)} w="50">
                {typeOptions.map((type) => (
                  <option value={type.value} key={type.value}>
                    {type.option}
                  </option>
                ))}
              </Select>
            </HStack>
          </HStack>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody as="form" id="update_item">
          <EquipmentRadioGroup
            equipments={data?.equipments!}
            setValue={setValue}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            form="assign_equip"
            colorScheme="purple"
            type="submit"
            onClick={() => handleAssign()}
          >
            Atribuir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
