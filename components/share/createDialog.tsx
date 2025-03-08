import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useCreateRole } from "@/lib/services/setting/role";
import { toast } from "sonner";
import { queryClient } from "@/provider/QueryProvider";

const CreateDialog = () => {
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState<string>("");
  const { mutate } = useCreateRole();

  const handleCreate = () => {
    if (!roleName.trim()) {
      toast.error("Role Name should not be empty");
      return;
    }
    mutate(
      { roleName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["role"] });
          setOpen(!open);
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };
  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>
        <Button>Create Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Row</DialogTitle>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            RoleName
          </Label>
          <Input
            id="roleName"
            className="col-span-3"
            placeholder="Enter roleName"
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="bg-red-500" onClick={handleCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
