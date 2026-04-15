import { HeroHeader } from "./_components/HeroHeader";
import { InputSections } from "./_components/InputSections";

export default function Home() {
  return (
    <div className="w-214 h-110 bg-white mt-12 rounded-sm p-7">
      <HeroHeader />
      <InputSections />
    </div>
  );
}
