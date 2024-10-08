import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Ghost, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { motion } from "framer-motion";
interface props {
  id: number;
  privatekey: string;
  publickey: string;
  onDelete: (id: number) => void;
}

export function TileWallet({ id, privatekey, publickey, onDelete }: props) {
  const [viewPrivate, setViewPrivate] = useState<boolean>(false);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("copied to clipboard!");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Wallet Keys
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-muted-foreground hover:text-primary p-0"
              onClick={() => {
                onDelete(id);
              }}
            >
              <Trash color={"#a82e13"} className="h-5 w-5" />
            </Button>
          </CardTitle>
          <CardDescription>
            Your public and private keys for secure transactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Public Key</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => {
                  copyToClipboard(publickey);
                }}
              >
                <Copy className="h-5 w-5" />
                <span className="sr-only">Copy public key</span>
              </Button>
            </div>
            <Input
              className="rounded-md bg-muted p-3 text-sm font-mono text-muted-foreground"
              id="private key"
              type="text"
              value={publickey}
              readOnly
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Private Key</h3>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => {
                    viewPrivate ? setViewPrivate(false) : setViewPrivate(true);
                  }}
                >
                  {viewPrivate ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                  <span className="sr-only">Copy private key</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => {
                    copyToClipboard(privatekey);
                  }}
                >
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy private key</span>
                </Button>
              </div>
            </div>
            <div>
              <Input
                className="rounded-md bg-muted p-3 text-sm font-mono text-muted-foreground"
                id="private key"
                type={viewPrivate ? "text" : "password"}
                value={privatekey}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
