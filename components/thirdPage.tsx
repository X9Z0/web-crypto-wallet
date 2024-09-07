"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "./ui/card";
import MemoWord from "./ui/memoword";
import { Copy } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { generateMnemonic } from "bip39";
import FourthPage from "./fourthPage";

interface ThirdPageProps {
  pathType: string;
}

export default function ThirdPage({ pathType }: ThirdPageProps) {
  const [memonics, setMemonics] = useState<string[]>(Array(12).fill(" "));
  const [copied, setCopied] = useState<boolean>(false);
  const [fourthPage, setFourthPage] = useState<boolean>(false);

  useEffect(() => {
    const newMnemonic: string = generateMnemonic();
    const wordArray: string[] = newMnemonic.split(" ");
    setMemonics(wordArray);
  }, []);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copy to clipboard!");
  };
  return (
    <>
      {!fourthPage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="mb-9">
            <div className="flex justify-center items-center font-bold mb-4 text-4xl">
              <h1>Secret Recovery Phrase</h1>
            </div>
            <div className="flex justify-center items-center text-muted-foreground">
              <p>Save this words in a safe place.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <Card
              className="group"
              onClick={() => {
                copyToClipboard(memonics.join(" "));
              }}
            >
              <CardContent className="p-7 ml-8 mr-8 grid-container">
                {memonics.slice(0, 12).map((word, index) => (
                  <MemoWord key={index} word={word} />
                ))}
              </CardContent>
              <CardFooter>
                <div className="border-t text-sm md:text-base text-primary/50 w-full group-hover:text-primary/80 transition-all duration-300">
                  <div className="flex gap-2 justify-center items-center mt-4">
                    <Copy className="size-4" /> Click Anywhere To Copy
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <div className="flex gap-2 p-5 mt-2 hover:opacity-70 justify-center items-center">
            <Checkbox
              checked={copied}
              onCheckedChange={() => {
                copied ? setCopied(false) : setCopied(true);
              }}
            />
            I saved my secret recovery phrase
          </div>
          <div className="flex justify-center items-center">
            <Button
              onClick={() => {
                setFourthPage(true);
              }}
              className="w-64 rounded-lg"
              disabled={!copied}
            >
              Next
            </Button>
          </div>
        </motion.div>
      )}
      {fourthPage && (
        <div>
          <FourthPage pathType={pathType} memonics={memonics.join(" ")} />
        </div>
      )}
    </>
  );
}
