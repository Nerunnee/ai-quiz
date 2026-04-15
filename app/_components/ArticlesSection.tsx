import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, LoaderCircle } from "lucide-react";
import { ChangeEventHandler } from "react";

type ArticlesSectionProps = {
  title: string;
  content: string;
  onChangeContent: ChangeEventHandler<HTMLTextAreaElement>;
  onChangeTitle: ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  loading: boolean;
};

export const ArticlesSection = (props: ArticlesSectionProps) => {
  const { title, content, onChangeContent, onChangeTitle, onSubmit, loading } =
    props;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-muted-foreground mt-2">
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="flex gap-1 text-sm items-center text-muted-foreground font-semibold">
            <FileText size={15} />
            Article title
          </p>
          <Input
            value={title}
            type="text"
            placeholder="Enter a title for your article..."
            onChange={onChangeTitle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex gap-1 text-sm items-center text-muted-foreground font-semibold">
            <FileText size={15} />
            Article content
          </p>
          <textarea
            value={content}
            placeholder="Paste your article content here..."
            className="h-30 border rounded-lg p-2"
            onChange={onChangeContent}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={onSubmit}
            disabled={loading}
            className="px-4 py-3 cursor-pointer"
          >
            {loading ? (
              <LoaderCircle className="animate-spin w-8 h-8" />
            ) : (
              "Generate summary"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
