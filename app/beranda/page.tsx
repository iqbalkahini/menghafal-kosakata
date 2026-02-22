"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Target, CalendarDays, BrainCircuit, XCircle, ArrowRight, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizEntry {
    id: string;
    date: string;
    level: string;
    correctCount: number;
    incorrectCount: number;
    totalQuestions: number;
    incorrectWords: {
        english: string;
        correctIndonesia: string;
        answeredIndonesia: string;
    }[];
}

export default function BerandaPage() {
    const [history, setHistory] = useState<QuizEntry[]>([]);
    const [mounted, setMounted] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setMounted(true);
        try {
            const historyStr = localStorage.getItem('quizHistory');
            if (historyStr) {
                setHistory(JSON.parse(historyStr));
            }
        } catch (error) {
            console.error("Failed to load history", error);
        }
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const clearHistory = () => {
        if (confirm("Apakah Anda yakin ingin menghapus semua riwayat kuis?")) {
            localStorage.removeItem('quizHistory');
            setHistory([]);
        }
    };

    if (!mounted) return null; // Prevent hydration mismatch

    const totalQuizzes = history.length;
    const totalWordsLearned = history.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    const averageScore = totalQuizzes > 0
        ? Math.round(history.reduce((acc, curr) => acc + (curr.correctCount / curr.totalQuestions * 100), 0) / totalQuizzes)
        : 0;

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header & Stats */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <History className="w-4 h-4" />
                            <span>Riwayat Aktivitas</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Beranda Belajar</h1>
                        <p className="text-muted-foreground text-lg">Lacak perkembangan dan evaluasi kosakata yang salah.</p>
                    </div>

                    <Link href="/">
                        <Button variant="outline" className="shrink-0 gap-2">
                            <Home className="w-4 h-4" /> Kembali ke Depan
                        </Button>
                    </Link>
                </div>

                {/* Dashboard Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <History className="w-4 h-4 text-blue-500" /> Total Kuis Selesai
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{totalQuizzes} <span className="text-base font-normal text-muted-foreground">Sesi</span></div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Target className="w-4 h-4 text-green-500" /> Rata-Rata Akurasi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{averageScore}%</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4 text-purple-500" /> Kata Dihadapi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{totalWordsLearned} <span className="text-base font-normal text-muted-foreground">Kata</span></div>
                        </CardContent>
                    </Card>
                </div>

                {/* History List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Sesi Terakhir</h2>
                        {history.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                                Hapus Riwayat
                            </Button>
                        )}
                    </div>

                    {history.length === 0 ? (
                        <Card className="border-dashed shadow-none bg-muted/30">
                            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                    <History className="w-8 h-8 opacity-50" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Belum ada riwayat</h3>
                                <p className="text-muted-foreground mb-6 max-w-md">Anda belum menyelesaikan kuis apapun. Ayo mulai tantangan pertama Anda untuk melacak progres belajar!</p>
                                <Link href="/quiz">
                                    <Button size="lg" className="rounded-full px-8 gap-2">
                                        Mulai Kuis Pertama <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {history.map((entry) => {
                                const isExpanded = expandedCards[entry.id];
                                const accuracy = Math.round((entry.correctCount / entry.totalQuestions) * 100);
                                const date = new Date(entry.date).toLocaleDateString('id-ID', {
                                    day: 'numeric', month: 'long', year: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                });

                                let levelColor = "text-green-500 bg-green-500/10 border-green-500/20";
                                if (entry.level === "medium") levelColor = "text-blue-500 bg-blue-500/10 border-blue-500/20";
                                if (entry.level === "hard") levelColor = "text-red-500 bg-red-500/10 border-red-500/20";

                                return (
                                    <Card key={entry.id} className="overflow-hidden border-border/50 hover:border-primary/30 transition-colors">
                                        <CardHeader className="pb-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                                        <CalendarDays className="w-4 h-4" />
                                                        {date}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <CardTitle className="text-xl">Kuis Kosakata</CardTitle>
                                                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase border ${levelColor}`}>
                                                            {entry.level}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex pr-4 items-center gap-6 sm:text-right">
                                                    <div>
                                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Skor</div>
                                                        <div className="text-2xl font-black text-foreground">{entry.correctCount}<span className="text-muted-foreground text-sm">/{entry.totalQuestions}</span></div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Akurasi</div>
                                                        <div className="text-2xl font-black text-foreground">{accuracy}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        {entry.incorrectWords.length > 0 && (
                                            <div className="border-t border-border/50 bg-muted/10">
                                                <button
                                                    onClick={() => toggleExpand(entry.id)}
                                                    className="w-full px-6 py-3 text-sm font-medium flex items-center justify-between text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                        Lihat {entry.incorrectWords.length} Kesalahan untuk Evaluasi
                                                    </span>
                                                    <span className="text-xs uppercase tracking-wider font-bold opacity-70">
                                                        {isExpanded ? "Tutup" : "Buka Detail"}
                                                    </span>
                                                </button>

                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-6 pt-2">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    {entry.incorrectWords.map((word, wIdx) => (
                                                                        <div key={wIdx} className="bg-background rounded-lg p-4 border border-border/60 flex flex-col gap-1.5 shadow-sm">
                                                                            <div className="font-bold text-lg text-foreground border-b border-border/50 pb-2 mb-1">
                                                                                {word.english}
                                                                            </div>
                                                                            <div className="text-sm grid grid-cols-[100px_1fr] gap-2">
                                                                                <span className="text-muted-foreground/70">Jawabanmu:</span>
                                                                                <span className="text-red-500 line-through font-medium">{word.answeredIndonesia}</span>
                                                                            </div>
                                                                            <div className="text-sm grid grid-cols-[100px_1fr] gap-2">
                                                                                <span className="text-muted-foreground/70">Kunci Jawaban:</span>
                                                                                <span className="text-green-500 font-medium">{word.correctIndonesia}</span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                        {entry.incorrectWords.length === 0 && (
                                            <div className="border-t border-border/50 bg-green-500/5 px-6 py-3 text-sm font-medium text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                                                <Target className="w-4 h-4" /> Sempurna! Anda tidak membuat kesalahan pada kuis ini.
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
