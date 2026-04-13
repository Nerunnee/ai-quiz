import { HeroHeader } from "./_components/HeroHeader";
import { InputSections } from "./_components/InputSections";

export default function Home() {
  return (
    <div className="w-214 h-110 flex flex-col bg-white mt-12 rounded-sm p-7 gap-5">
      <HeroHeader />
      <InputSections />
    </div>
  );
}
