import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Wallet, Clock, CheckCircle2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
// QR image will be placed at public/images/payment-qr.png

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  plan: {
    name: string;
    priceUsd: string;
    priceInr: string;
  } | null;
}

const cryptoAddresses = [
  { network: "BEP20 (USDT)", address: "0x1b79a8cfa2674bcd7706a8f25160e762a500cef5", color: "text-yellow-500" },
  { network: "Solana (USDT)", address: "HQo1gG52Ae7SUQAHND6ACJ8vFbboYHPpe49dFRP8KZuu", color: "text-purple-500" },
  { network: "Ethereum (USDT)", address: "0x1b79a8cfa2674bcd7706a8f25160e762a500cef5", color: "text-blue-500" },
];

export default function PaymentModal({ open, onClose, plan }: PaymentModalProps) {
  const [method, setMethod] = useState<"qr" | "crypto" | null>(null);
  const [txHash, setTxHash] = useState("");
  const [txId, setTxId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) {
      setMethod(null);
      setTxHash("");
      setTxId("");
      setSubmitting(false);
      setSuccess(false);
      setTimeLeft(600);
      setTimerActive(false);
    }
  }, [open]);

  useEffect(() => {
    if (method && !timerActive) {
      setTimerActive(true);
      setTimeLeft(600);
    }
  }, [method]);

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handleCopy = (address: string, idx: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleSubmitQr = () => {
    if (!txId.trim()) {
      toast({ title: "Transaction ID required", description: "Please enter your payment transaction ID.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      toast({ title: "Payment submitted!", description: "We'll verify your payment and activate your plan within 24 hours." });
    }, 2000);
  };

  const handleSubmitCrypto = () => {
    if (!txHash.trim()) {
      toast({ title: "Transaction hash required", description: "Please enter your transaction hash.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      toast({ title: "Payment submitted!", description: "We'll verify your transaction and activate your plan within 24 hours." });
    }, 2000);
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card rounded-2xl border border-border w-full max-w-md p-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10">
              <X size={20} />
            </button>

            <div className="relative z-10">
              <h3 className="text-xl font-display font-bold mb-1">Subscribe to {plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">Choose your payment method</p>

              {/* Timer */}
              {timerActive && !success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 mb-4 ${
                    timeLeft < 60 ? "border-destructive/50 bg-destructive/5 text-destructive" : "border-primary/30 bg-primary/5 text-primary"
                  }`}
                >
                  <Clock size={16} />
                  <span className="text-sm font-semibold">Time remaining: {formatTime(timeLeft)}</span>
                </motion.div>
              )}

              {timeLeft <= 0 && !success && (
                <div className="text-center py-8">
                  <p className="text-destructive font-semibold mb-2">Payment time expired</p>
                  <p className="text-sm text-muted-foreground mb-4">Please try again</p>
                  <Button onClick={onClose} variant="outline">Close</Button>
                </div>
              )}

              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle2 size={64} className="text-accent mx-auto mb-4" />
                  </motion.div>
                  <h4 className="text-lg font-bold mb-2">Payment Submitted!</h4>
                  <p className="text-sm text-muted-foreground mb-4">Your {plan.name} plan will be activated after verification (within 24 hours).</p>
                  <Button onClick={onClose} className="rounded-xl">Done</Button>
                </motion.div>
              ) : timeLeft > 0 && !method ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setMethod("qr")}
                    className="w-full flex items-center gap-4 rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <QrCode size={24} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">QR Code Payment (UPI)</p>
                      <p className="text-xs text-muted-foreground">Pay {plan.priceInr} via UPI • For Indian users</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMethod("crypto")}
                    className="w-full flex items-center gap-4 rounded-xl border border-border p-4 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Wallet size={24} className="text-accent" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Crypto (USDT)</p>
                      <p className="text-xs text-muted-foreground">Pay {plan.priceUsd} via BEP20, Solana, or Ethereum</p>
                    </div>
                  </button>
                </div>
              ) : timeLeft > 0 && method === "qr" ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <button onClick={() => setMethod(null)} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
                  <div className="text-center">
                    <p className="text-2xl font-bold mb-1">{plan.priceInr}</p>
                    <p className="text-xs text-muted-foreground mb-4">Scan & pay via any UPI app</p>
                    <div className="bg-white rounded-xl p-4 inline-block mx-auto">
                      <img src="/images/payment-qr.png" alt="Payment QR Code" className="w-48 h-48 mx-auto" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Transaction ID</label>
                    <input
                      type="text"
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder="Enter UPI transaction ID"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <Button onClick={handleSubmitQr} className="w-full rounded-xl" disabled={submitting}>
                    {submitting ? "Verifying..." : "Submit for Verification"}
                  </Button>
                </motion.div>
              ) : timeLeft > 0 && method === "crypto" ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <button onClick={() => setMethod(null)} className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
                  <p className="text-lg font-bold text-center">{plan.priceUsd}</p>
                  <div className="space-y-3">
                    {cryptoAddresses.map((c, i) => (
                      <div key={c.network} className="rounded-xl border border-border p-3">
                        <p className={`text-xs font-semibold mb-1 ${c.color}`}>{c.network}</p>
                        <div className="flex items-center gap-2">
                          <code className="text-[10px] bg-muted px-2 py-1 rounded flex-1 overflow-hidden text-ellipsis">{c.address}</code>
                          <button onClick={() => handleCopy(c.address, i)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                            {copiedIdx === i ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Transaction Hash</label>
                    <input
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="Paste your transaction hash"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <Button onClick={handleSubmitCrypto} className="w-full rounded-xl" disabled={submitting}>
                    {submitting ? "Verifying..." : "Submit for Verification"}
                  </Button>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
