import Categories from "@/components/Categories";
import NewDrops from "@/components/NewDrops";
import PosterImage from "@/components/PosterImage";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 py-5 font-[family-name:var(--font-Rubik)]">
      <PosterImage/>
      <NewDrops/>
      <Categories/>
      <Reviews/>
    </main>
  );
}