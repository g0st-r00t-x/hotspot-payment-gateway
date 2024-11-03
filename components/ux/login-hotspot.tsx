"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, Ticket, User, ShoppingCart } from "lucide-react";

const LoginPage = () => {
  const [voucher, setVoucher] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent, type: "voucher" | "member") => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (type === "voucher") {
        console.log("Login with voucher:", voucher);
      } else {
        console.log("Login with credentials:", username, password);
      }
    }, 2000);
  };
  fetch("/api/connect", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden backdrop-blur-lg bg-white/30 shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center justify-center mb-4"
          >
            <Wifi className="h-16 w-16 text-white" />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-white">
            MikroTik Hotspot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="voucher"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger
                value="voucher"
                className="text-gray-600"
              >
                <Ticket className="w-4 h-4 mr-2" />
                Voucher
              </TabsTrigger>
              <TabsTrigger
                value="member"
                className="text-gray-600"
              >
                <User className="w-4 h-4 mr-2" />
                Member
              </TabsTrigger>
            </TabsList>
            <TabsContent value="voucher">
              <form onSubmit={(e) => handleSubmit(e, "voucher")}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="voucher"
                      className="text-white"
                    >
                      Voucher Code
                    </Label>
                    <Input
                      id="voucher"
                      placeholder="Enter your voucher code"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                      required
                      className="bg-white/50 border-0 placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Wifi className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="member">
              <form onSubmit={(e) => handleSubmit(e, "member")}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-white"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-white/50 border-0 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-white"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/50 border-0 placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Wifi className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link
            href="/list-voucher"
            passHref
          >
            <Button
              variant="outline"
              className="w-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Beli Voucher
            </Button>
          </Link>
          <p className="text-white text-sm">Powered by GHAIB NETWORK</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;