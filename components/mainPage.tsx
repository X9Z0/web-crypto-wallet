"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import solana from "@/public/solana-sol-logo.svg";
import eth from "@/public/ethereum-eth-logo.svg";
import Image from "next/image";
import ThirdPage from "./thirdPage";
import { toast } from "sonner";

export default function MainPage() {
  const [secnodPage, setSecondPage] = useState<boolean>(false);
  const [thirdPage, setThirdPage] = useState<boolean>(false);
  const [pathType, setPathType] = useState<string>("501");

  useEffect(() => {
    const path = localStorage.getItem("path");
    if (path) {
      setThirdPage(true);
      setPathType(JSON.parse(path));
    }
  }, []);

  return (
    <>
      {!secnodPage && !thirdPage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="h-screen flex justify-center items-center gap-4 flex-col my-12"
        >
          <div className="p-6 mb-6 flex justify-center items-center">
            <Avatar className="aspect-square relative flex h-32 w-32 shrink-0 overflow-hidden rounded-full">
              <AvatarImage src="https://avatars.slack-edge.com/2019-11-18/838548423060_e47f8b5cc8f5aa7a75da_512.png" />
              <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                MW
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center text-4xl font-bold p-4">
            <h1>Welcome to T-wallet</h1>
          </div>
          <div className="p-4 flex justify-center items-center">
            <Button
              className="h-10 w-56 text-lg"
              onClick={() => {
                setSecondPage(true);
              }} // Hide the first page when the button is clicked
            >
              Create a wallet
            </Button>
          </div>
        </motion.div>
      )}
      {secnodPage && (
        <div className="h-screen flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex justify-center items-center p-2"
          >
            <Button
              className="w-96 h-16 text-xl hover:bg-slate-200 bg-slate-100 flex justify-start dark:bg-[#202026] dark:hover:bg-[#131219]"
              variant={"ghost"}
              onClick={() => {
                setPathType("501");
                setSecondPage(false);
                setThirdPage(true);
                toast.success("Solana was selected!");
              }}
            >
              <Image
                className="h-5 w-5 mr-4"
                src={solana}
                alt=""
                width="32"
                height="32"
              />
              Solana
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="flex justify-center items-center p-2 "
          >
            <Button
              className="w-96 h-16 text-xl hover:bg-slate-200 bg-slate-100 flex justify-start dark:bg-[#202026] dark:hover:bg-[#131219]"
              variant={"ghost"}
              onClick={() => {
                setPathType("60");
                setSecondPage(false);
                setThirdPage(true);
                toast.success("Ethereum is selected!");
              }}
            >
              <Image
                className="h-5 w-5 mr-4"
                src={eth}
                alt=""
                width="32"
                height="32"
              />
              Ethereum
            </Button>
          </motion.div>
        </div>
      )}
      {thirdPage && <ThirdPage pathType={pathType} />}
    </>
  );
}
