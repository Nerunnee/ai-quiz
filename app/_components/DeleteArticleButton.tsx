"use client";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export const DeleteArticleButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;

    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <Trash
      size={16}
      color="red"
      className="cursor-pointer mr-1 hover:p-0.5 hover:bg-white hover:rounded-sm"
      onClick={handleDelete}
    />
  );
};
