import { Sparkles } from "lucide-react";

export const HeroHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="flex gap-2 text-2xl font-semibold items-center">
        <Sparkles /> Article Quiz Generator
      </h3>
      <p className="text-muted-foreground">
        Paste your article below to generate a summarize and quiz question. Your
        articles will saved in the sidebar for future reference.
      </p>
    </div>
  );
};
