import { Button } from "@repo/ui/button";
import Home from "../components/Home";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Button
        children={<span>hello from ui</span>}
        appName="hi from ui"
        className="bg-violet-600 text-white px-2 py-1 rounded-lg"
      />
      <Home />
    </main>
  );
}
