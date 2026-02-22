"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Shuffle, Trophy, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      </div>

      {/* Navbar Minimalist */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">VocabMaster</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">Features</Button>
            <Button size="sm" className="rounded-full">Mulai Belajar</Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-24">
        {/* Hero Section */}
        <motion.section
          className="flex flex-col items-center justify-center text-center pt-16 pb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm border-primary/20 bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3 w-3" />
              Cara Baru Menghafal Kosakata
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-balance leading-tight"
          >
            Kuasai Bahasa Inggris Lebih <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500"> Cepat & Menyenangkan</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 text-balance"
          >
            Uji ingatanmu dengan tebak arti kosa kata yang diacak secara dinamis.
            Belajar tanpa bosan, lacak progresmu, dan kuasai ribuan kata baru.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
              <a href="#quiz">
                Mulai Kuis Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="#features">Pelajari Cara Kerjanya</a>
            </Button>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Mengapa Memilih VocabMaster?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Kami mendesain pengalaman belajar yang berfokus pada repetisi yang tidak membosankan.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shuffle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Sistem Kuis Acak</CardTitle>
                  <CardDescription>Kosakata diacak setiap sesi, memastikan Anda benar-benar hafal, bukan sekedar menebak pola urutan.</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-indigo-500" />
                  </div>
                  <CardTitle>Fokus pada Pemahaman</CardTitle>
                  <CardDescription>Melatih ingatan menerjemahkan bahasa Inggris ke Indonesia secara akurat dan responsif.</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle>Bangun Kebiasaan</CardTitle>
                  <CardDescription>Belajar konsisten setiap hari meningkatkan kemampuan mengingat kosakata jangka panjang.</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="mt-24 mb-12 relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50"></div>
          <div className="px-6 py-16 sm:px-12 sm:py-24 md:flex md:items-center md:justify-between relative z-10">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                Siap untuk menguji kemampuanmu?
              </h2>
              <p className="text-zinc-400 text-lg">
                Tidak perlu mendaftar untuk mencoba kuis pertama Anda. Mulai sekarang dan rasakan perbedaannya.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-200">
                Mulai Kuis Gratis
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-background/80">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VocabMaster. Hak cipta dilindungi.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-foreground transition-colors">Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
