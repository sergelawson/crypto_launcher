import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSend: (address: string, amount: number) => Promise<void>;
  isLoading?: boolean;
};
const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  onSend,
  isLoading,
}) => {
  const [amount, setAmount] = useState<number | null>();

  const [address, setAddress] = useState<string>();

  const handleSend = () => {
    if (!amount || !address) {
      console.error("Invalid amount or address", amount, address);
      return;
    }

    onSend(address, amount);
    setAmount(null);
    setAddress("");
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top-center"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Input
                //variant="bordered"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                label="Receiver SOL Address"
              />
              <Input
                label="Amount in SOL"
                //variant="bordered"
                value={amount?.toString() || ""}
                onChange={(e) =>
                  setAmount(sanitizeDecimalInput(e.target.value))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleSend}
                color="primary"
                isLoading={isLoading}
              >
                Send
              </Button>
              <Button color="danger" variant="flat" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

function sanitizeDecimalInput(input: string) {
  // Use a regular expression to match unsigned decimal values (e.g., 123, 123.45)
  const sanitizedInput = input.match(/^\d*\.?\d*$/);

  // If the input matches the regex, return it; otherwise, return an empty string or null
  return sanitizedInput ? Number(sanitizedInput[0]) : 0;
}
export default FormModal;
