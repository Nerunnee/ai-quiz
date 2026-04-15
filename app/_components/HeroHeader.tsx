import { Sparkles } from "lucide-react";
import Link from "next/link";

export const HeroHeader = () => {
  return (
    <h3 className="flex gap-2 text-2xl font-semibold items-center">
      <Sparkles /> Article Quiz Generator
    </h3>
  );
};
