"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl, localUrl } from "@/apiConfig";

interface DeleteDialogProps {
  type: string;
  id: string;
  backTo: string;
  buttonTitle: string;
}

export default function DeleteDialog({
  type,
  id,
  backTo,
  buttonTitle,
}: DeleteDialogProps) {
  const { push } = useRouter();
  const RecivedType = type;
  const RecivedId = id;
  const BackTo = backTo;
  const ButtonTitle = buttonTitle;
  console.log("Back to =" + BackTo);

  const { toast } = useToast();

  const handleDeleteClick = async () => {
    try {
      console.log("printed");
      const response = await fetch(`${apiUrl}/${RecivedType}/${RecivedId}`, {
        method: "delete",
        credentials: "include",
        // Add any necessary headers or authentication tokens
      });

      if (response.ok) {
        // File successfully deleted
        console.log("File deleted");
        push(`${homeUrl}/${BackTo}`);
        toast({
          title: `Delete Successful!`,
          description: `Deleted from ${RecivedType}`,
        });
      } else {
        // File deletion failed
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>{ButtonTitle}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Delete from {type}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
