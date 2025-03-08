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

const DeleteDialog = ({
  children,
  fun,
}: {
  children: React.ReactNode;
  fun: () => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={() => setOpen(!open)} open={open}>
      <DialogTrigger asChild>{children ?? "delete"}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Row</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this row?
        </DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            className="bg-red-500"
            onClick={() => {
              fun();
              setOpen(!open);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
