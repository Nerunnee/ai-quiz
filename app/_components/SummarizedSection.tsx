import { Button } from "@/components/ui/button";
import { BookOpen, LoaderCircle } from "lucide-react";

type SummarizedContentProps = {
  title: string;
  summarized: { summary: string };
  loading: boolean;
  onSubmit: () => void;
};

export const SummarizedContent = (props: SummarizedContentProps) => {
  const { title, summarized, loading, onSubmit } = props;
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm font-semibold text-muted-foreground flex items-center mt-5">
        <BookOpen size={16} />
        <span className="ml-2">Summarized content</span>
      </p>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <p>{summarized.summary}</p>

      <div className="flex justify-between">
        <Button className="px-4 py-3 cursor-pointer bg-gray-500">
          See Content
        </Button>

        <Button
          onClick={onSubmit}
          disabled={loading}
          className="px-4 py-3 cursor-pointer"
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-8 h-8" />
          ) : (
            "Take a quiz"
          )}
        </Button>
      </div>
    </div>
  );
};
