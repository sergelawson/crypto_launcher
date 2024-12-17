import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

type CreateTokenFormProps = {
  onSubmit: () => Promise<void>;
};

const CreateTokenForm: React.FC<CreateTokenFormProps> = ({ onSubmit }) => {
  return (
    <form className="flex flex-col gap-y-2">
      <Input label="Token Name" />
      <Input label="Symbol" />
      <Input label="Image URL" />
      <Input label="Initial Supply" />
      <Button onClick={() => onSubmit()} color="primary">
        Launch Token
      </Button>
    </form>
  );
};

export default CreateTokenForm;
