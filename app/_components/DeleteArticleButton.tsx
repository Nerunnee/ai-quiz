"use client";

import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export const DeleteArticleButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this?")) return;

    await fetch(`/api/articles/${id}`, { method: "DELETE" });

    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 p-0.5 hover:rounded-xs hover:bg-white transition-colors cursor-pointer mr-2"
    >
      <Trash size={14} />
    </button>
  );
};
