"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wifi, ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";

type Voucher = {
  id: number;
  duration: string;
  price: number;
};

const vouchers: Voucher[] = [
  { id: 1, duration: "1 Jam", price: 5000 },
  { id: 2, duration: "3 Jam", price: 10000 },
  { id: 3, duration: "1 Hari", price: 20000 },
  { id: 4, duration: "3 Hari", price: 50000 },
  { id: 5, duration: "1 Minggu", price: 100000 },
  { id: 6, duration: "1 Bulan", price: 300000 },
];

const VoucherList = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [danaNumber, setDanaNumber] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setIsDialogOpen(true);
  };

  const handlePurchase = () => {
    setError(null);
    if (!danaNumber || !buyerName) {
      setError("Mohon isi semua field.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      // Reset form
      setDanaNumber("");
      setBuyerName("");
      // Here you would typically handle the successful purchase
      console.log("Purchase successful:", {
        voucher: selectedVoucher,
        danaNumber,
        buyerName,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl overflow-hidden backdrop-blur-lg bg-white/30 shadow-xl border-0">
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
            Beli Voucher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-white/50 border-0">
                  <CardHeader>
                    <CardTitle className="text-center text-gray-800">
                      {voucher.duration}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-2xl font-bold text-gray-800">
                      Rp {voucher.price.toLocaleString()}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                      onClick={() => handleBuyVoucher(voucher)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Beli
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/"
            passHref
          >
            <Button
              variant="outline"
              className="bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Login
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <AnimatePresence>
        {isDialogOpen && (
          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
              <DialogHeader>
                <DialogTitle>Beli Voucher dengan DANA</DialogTitle>
                <DialogDescription>
                  Masukkan detail pembayaran DANA Anda untuk membeli voucher{" "}
                  {selectedVoucher?.duration}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="dana-number"
                    className="text-right"
                  >
                    No. DANA
                  </Label>
                  <Input
                    id="dana-number"
                    value={danaNumber}
                    onChange={(e) => setDanaNumber(e.target.value)}
                    className="col-span-3"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="buyer-name"
                    className="text-right"
                  >
                    Nama
                  </Label>
                  <Input
                    id="buyer-name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="col-span-3"
                    placeholder="Nama lengkap Anda"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <DialogFooter>
                <Button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
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
                      <CreditCard className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Bayar Rp {selectedVoucher?.price.toLocaleString()}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VoucherList;