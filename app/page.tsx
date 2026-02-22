"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shuffle, Trophy, ArrowRight, Sparkles, BookA, Target, Layers } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const showcaseRef = useRef(null);
  const { scrollYProgress: showcaseScrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });

  // Floating animations synced with scroll
  const translateY1 = useTransform(heroScrollYProgress, [0, 1], [150, -150]);
  const translateY2 = useTransform(showcaseScrollYProgress, [0, 1], [150, -150]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-white/10 dark:border-white/5">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-md">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">VocabMaster</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">Fitur</Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">Cara Kerja</Button>
            <Button size="sm" className="rounded-lg shadow-sm">Masuk</Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Dynamic SaaS Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-16 pb-32 md:pt-24 md:pb-40 overflow-hidden"
          style={{ background: "radial-gradient(ellipse 200% 100% at bottom left, rgba(79, 70, 229, 0.1), rgba(255, 255, 255, 0) 100%)" }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/djpkr0kng/image/upload/v1706173428/grid-pattern_qxgbsz.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10 dark:invert"></div>

          <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
            <div className="md:flex items-center justify-between gap-12">
              <div className="md:w-[55%]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-sm font-medium inline-flex border border-primary/20 bg-primary/5 text-primary px-3 py-1 rounded-full tracking-tight mb-6 items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    Versi 2.0 Telah Hadir
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 dark:from-white dark:to-white/60 text-transparent bg-clip-text leading-[1.1]">
                    Jalur Cepat Menuju <br />
                    <span className="bg-gradient-to-r from-primary to-indigo-500 text-transparent bg-clip-text">Kefasihan</span>
                  </h1>
                  <p className="text-xl text-muted-foreground tracking-tight mt-6 max-w-lg">
                    Tingkatkan produktivitas belajarmu. Aplikasi kuis kosakata yang dirancang untuk melacak progres, memotivasi, dan memastikan kata baru menempel di ingatanmu.
                  </p>
                  <div className="flex gap-4 items-center mt-8">
                    <Button size="lg" className="rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                      Mulai Sekarang — Gratis
                    </Button>
                    <Button size="lg" variant="ghost" className="rounded-xl group">
                      <span>Pelajari Lebh Lanjut</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              </div>

              <div className="mt-20 md:mt-0 md:h-[500px] md:flex-1 relative hidden md:block">
                {/* Visual Representation (Replacing images with animated Lucide icons & shapes) */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-primary/20 to-indigo-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute bg-background border border-border/50 shadow-2xl rounded-2xl p-6 w-80 left-4 top-10 backdrop-blur-sm"
                  animate={{ translateY: [-10, 10] }}
                  transition={{ repeat: Infinity, repeatType: "mirror", duration: 3, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg"><BookA className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Vocabularies</h3>
                      <p className="text-sm text-muted-foreground">+24 today</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div className="h-full bg-green-500" initial={{ width: "0%" }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 0.5 }} />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bg-background border border-border/50 shadow-2xl rounded-2xl p-6 w-72 -right-8 bottom-20 backdrop-blur-sm"
                  style={{ translateY: translateY1 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg"><Trophy className="h-6 w-6 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Daily Streak</h3>
                      <p className="text-sm font-bold text-primary">12 Days 🔥</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-bold ${i < 5 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        S
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating decorative element */}
                <motion.div
                  className="absolute -left-12 bottom-32 bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-2xl shadow-xl shadow-indigo-500/10 border border-indigo-200 dark:border-indigo-800/50"
                  style={{ rotate: 15, translateY: translateY1 }}
                >
                  <Shuffle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase / Features */}
        <section
          ref={showcaseRef}
          className="py-24 overflow-x-clip relative"
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-[540px] mx-auto text-center mb-16">
              <div className="flex justify-center mb-4">
                <div className="text-sm font-medium inline-flex text-primary border border-primary/20 bg-primary/5 px-3 py-1 rounded-full uppercase tracking-wider">
                  Tingkatkan Pemahamanmu
                </div>
              </div>
              <h2 className="text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 dark:from-white dark:to-white/60 text-transparent bg-clip-text mt-5">
                Cara lebih efektif mengatur hafalan
              </h2>
              <p className="text-lg text-muted-foreground mt-5">
                Ubah caramu belajar menjadi lebih efisien. Fitur-fitur kami dirancang khusus menggunakan metode repetisi berjeda (spaced repetition) dan kuis dinamis.
              </p>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Shuffle className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Kuis Ekstra Acak</CardTitle>
                    <CardDescription className="text-base mt-2">Sistem kami mengacak urutan soal secara dinamis setiap sesi agar otakmu diasah untuk mengingat artinya, bukan mengingat pola urutan kartu.</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                      <Target className="h-5 w-5 text-indigo-500" />
                    </div>
                    <CardTitle className="text-xl">Target Akurasi</CardTitle>
                    <CardDescription className="text-base mt-2">Ketepatan menebak bahasa Indonesia dari kosakata bahasa Inggris akan direkam, membantu sistem mengetahui kata yang masih kamu lupakan.</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-background border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <Layers className="h-5 w-5 text-orange-500" />
                    </div>
                    <CardTitle className="text-xl">Kelompok Belajar</CardTitle>
                    <CardDescription className="text-base mt-2">Pecah ribuan kata ke dalam dek-dek (grup) kecil untuk dicerna secara rutin. Bangun rutinitas belajar harianmu setahap demi setahap.</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Parallax Background Elements for Showcase */}
              <motion.div
                className="hidden lg:flex absolute -right-32 -top-12 h-64 w-64 bg-primary/5 rounded-full border border-primary/20 items-center justify-center -z-10"
                style={{ translateY: translateY2 }}
              >
                <div className="h-48 w-48 bg-primary/10 rounded-full border border-primary/20"></div>
              </motion.div>
              <motion.div
                className="hidden lg:block absolute -left-20 -bottom-24 w-40 h-40 bg-indigo-500/5 rounded-2xl rotate-12 border border-indigo-500/20 -z-10"
                style={{ translateY: translateY2, rotate: 12 }}
              />
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 overflow-x-clip border-t border-border/40">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 relative text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold tracking-tighter mb-6"
              >
                Tingkatkan kosakatamu <br />
                mulai hari ini juga
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-muted-foreground mx-auto max-w-2xl mb-10"
              >
                Raih kefasihan lebih awal. Lacak progres, rayakan setiap kemenangan kecil, dan kuasai bahasa Inggris lebih dari sebelumnya.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-xl px-8 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Daftar Sekarang
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl px-8 items-center gap-2 group">
                  Lebih Lanjut
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 bg-background/50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span className="font-semibold text-foreground">VocabMaster</span>
          </div>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Tentang</a>
            <a href="#" className="hover:text-foreground transition-colors">Fitur</a>
            <a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-foreground transition-colors">Privasi</a>
          </nav>
          <p>© {new Date().getFullYear()} VocabMaster. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
