
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Wallet,
  Copy,
  Download,
  Check,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  Zap,
  LockKeyhole,
  QrCode,
} from "lucide-react";

function App() {
  const [upiId, setUpiId] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generatePayment = () => {
    setError("");
    setCopied(false);

    const cleanUpi = upiId.trim();
    const cleanName = name.trim();
    const cleanAmount = amount.trim();

    if (!/^[\w.-]+@[\w.-]+$/.test(cleanUpi)) {
      setError("Please enter a valid UPI ID.");
      return;
    }

    if (
      cleanAmount &&
      (!/^\d+(\.\d{1,2})?$/.test(cleanAmount) ||
        Number(cleanAmount) <= 0)
    ) {
      setError("Enter a valid amount greater than zero.");
      return;
    }

    const params = new URLSearchParams({
      pa: cleanUpi,
      cu: "INR",
    });

    if (cleanName) params.set("pn", cleanName);
    if (cleanAmount) params.set("am", cleanAmount);
    if (note.trim()) params.set("tn", note.trim());

    setPaymentLink(`upi://pay?${params.toString()}`);
    setGenerated(true);
  };

  const copyLink = async () => {
    if (!paymentLink) return;

    try {
      await navigator.clipboard.writeText(paymentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = paymentLink;
      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      textarea.remove();

      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        setError("Copy failed. Please try again.");
      }
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("prajpay-qr");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "PrajPay-QR.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const openUPIApp = () => {
    if (!paymentLink) return;
    window.location.href = paymentLink;
  };

  const resetForm = () => {
    setUpiId("");
    setName("");
    setAmount("");
    setNote("");
    setPaymentLink("");
    setGenerated(false);
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <Wallet size={22} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              Praj<span className="text-violet-600">Pay</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#generator" className="transition hover:text-violet-600">
              Generator
            </a>
            <a href="#features" className="transition hover:text-violet-600">
              Features
            </a>
            <a href="#about" className="transition hover:text-violet-600">
              About
            </a>
          </div>

          <a
            href="#generator"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className=" mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
              <Sparkles size={15} />
              Simple. Fast. Secure.
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.12] tracking-tight md:text-6xl">
              Payments made
              <span className="block text-violet-600">effortlessly.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
              Create your personal UPI payment QR code and shareable payment
              link in seconds. No complicated setup. Just simple payments.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-white">
              <a
                href="#generator"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Create payment QR <ArrowUpRight size={18} />
              </a>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-600">
                <ShieldCheck size={18} className="text-emerald-500" />
                No registration
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-500" /> Free to use
              </span>
              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-500" /> Instant QR
              </span>
              <span className="flex items-center gap-2">
                <Check size={17} className="text-emerald-500" /> UPI compatible
              </span>
            </div>
          </div>

          {/* Hero preview */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-8 top-12 h-40 w-40 rounded-full bg-violet-200/60 blur-3xl" />
            <div className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-indigo-200/60 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white bg-white p-7 shadow-2xl shadow-slate-200/80">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Payment preview
                  </p>
                  <h3 className="mt-1 text-xl font-bold">Your UPI QR</h3>
                </div>
                <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                  <QrCode size={23} />
                </div>
              </div>

              <div className="my-7 flex justify-center rounded-2xl bg-slate-50 p-8">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <QRCodeCanvas
                    value="upi://pay?pa=example@upi&pn=PrajPay&cu=INR"
                    size={180}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-slate-400">Powered by</p>
                <p className="mt-1 text-xl font-extrabold">
                  Praj<span className="text-violet-600">Pay</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Generator */}
        <section id="generator" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                UPI generator
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Create your payment QR
              </h2>
              <p className="mt-4 leading-7 text-slate-500">
                Enter your payment details and generate a QR code instantly.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Form */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
                <div className="mb-8 flex items-center gap-3">
                  <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                    <Wallet size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Payment details</h3>
                    <p className="text-sm text-slate-400">
                      Fill in your UPI information
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      UPI ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="example@upi"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Payee name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Amount (INR)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount (optional)"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-9 pr-4 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Payment note
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Shopping, Food, Services"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  {error && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={generatePayment}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
                  >
                    <Zap size={18} />
                    Generate payment QR
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Your details are processed in this browser.
                  </p>
                </div>
              </div>

              {/* QR result */}
              <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
                <div className="mb-8 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <QrCode size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Your QR code</h3>
                    <p className="text-sm text-slate-400">
                      Scan to pay using a UPI app
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6">
                  {generated ? (
                    <>
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <QRCodeCanvas
                          id="prajpay-qr"
                          value={paymentLink}
                          size={220}
                          level="H"
                          includeMargin
                        />
                      </div>

                      <p className="mt-5 text-lg font-bold">
                        {name || "Payment QR"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{upiId}</p>

                      {amount && (
                        <p className="mt-3 text-2xl font-black text-violet-600">
                          ₹{Number(amount).toFixed(2)}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-slate-300 shadow-sm">
                        <QrCode size={42} />
                      </div>
                      <h4 className="mt-5 font-bold text-slate-600">
                        Your QR will appear here
                      </h4>
                      <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
                        Enter your UPI details and click generate to create
                        your payment QR.
                      </p>
                    </div>
                  )}
                </div>

                {generated && (
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={downloadQR}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50"
                    >
                      <Download size={18} />
                      Download QR code
                    </button>

                    <button
                      onClick={copyLink}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 py-3.5 font-semibold text-violet-700 transition hover:bg-violet-100"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? "Payment link copied!" : "Copy payment link"}
                    </button>

                    <button
                      onClick={openUPIApp}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                    >
                      <Wallet size={18} />
                      Pay by any UPI app
                      <ArrowUpRight size={18} />
                    </button>

                    <button
                      onClick={resetForm}
                      className="w-full py-2 text-sm font-semibold text-slate-400 transition hover:text-slate-700"
                    >
                      Create another QR
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-slate-400">
              PrajPay generates UPI payment links and QR codes. It does not
              process or verify payments. Always verify payment receipts in
              your UPI app or bank account before confirming a transaction.
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                Why PrajPay
              </span>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                Everything you need. Nothing you don't.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Feature
                icon={<Zap size={23} />}
                title="Instant generation"
                description="Generate your UPI payment QR code and link in just a few clicks."
              />
              <Feature
                icon={<ShieldCheck size={23} />}
                title="Privacy focused"
                description="Your payment details are handled locally in your browser."
              />
              <Feature
                icon={<LockKeyhole size={23} />}
                title="Simple and secure"
                description="Payments are completed through your chosen UPI application."
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-700 px-8 py-14 text-center shadow-xl shadow-violet-200 md:px-16">
            <Sparkles size={30} className="mx-auto text-violet-200" />
            <h2 className="mt-5 text-3xl font-black md:text-4xl text-white">
              Make every payment simpler.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-violet-100">
              Create your QR. Share your link. Let people pay through their
              preferred UPI app.
            </p>
            <a
              href="#generator"
              className=" text-black mt-8 inline-flex items-center gap-2 rounded-xl bg-white  px-6 py-3.5 font-bold transition hover:bg-voilet-50"
            >
              Create your QR <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-lg font-extrabold">
            Praj<span className="text-violet-600">Pay</span>
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PrajPay. Built for simpler payments.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100">
      <div className="mb-5 inline-flex rounded-xl bg-violet-100 p-3 text-violet-700">
        {icon}
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-500">{description}</p>
    </div>
  );
}

export default App;
