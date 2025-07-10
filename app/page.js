import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white">
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          🎙️ AI Interview Voice Agent
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Practice real interview scenarios with voice-based interaction, AI-generated questions,
          and personalized feedback — all in one platform.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          <Button className="px-6 py-3 text-lg">Get Started</Button>
          <Button variant="outline" className="px-6 py-3 text-lg">
            Try Demo
          </Button>
        </div>

        <div className="mt-10">
          {/* <Image
            src="/hero.png" // 👉 Replace with your image in /public
            alt="Interview Agent Demo"
            width={800}
            height={400}
            className="rounded-xl shadow-xl"
          /> */}
        </div>
      </div>
    </div>
  );
}
