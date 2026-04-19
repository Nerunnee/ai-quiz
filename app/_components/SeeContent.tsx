import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Articles = {
  content: string;
  title: string;
};

export const SeeContent = (props: Articles) => {
  const { content, title } = props;

  return (
    <div>
      <Dialog>
        <div className="flex justify-between items-center">
          <DialogTrigger className="border p-2 rounded-sm text-sm cursor-pointer hover:bg-gray-800 hover:text-white">
            See Content
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription>{content}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
