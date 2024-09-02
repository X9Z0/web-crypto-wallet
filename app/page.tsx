import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import MainPage from "@/components/mainPage";
import MemoWord from "@/components/ui/memoword";
import ThirdPage from "@/components/thirdPage";
export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      {/* <MainPage /> */}
      <ThirdPage pathType="501" />
    </main>
  );
}
