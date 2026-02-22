"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import Link from "next/link";

interface Vocab {
    english: string;
    indonesia: string;
    frequency: string;
    type: string;
}

export default function QuizInterface() {
    const params = useParams();
    const level = params.level as string;
    const router = useRouter();

    const totalQuestions = level === 'easy' ? 200 : level === 'medium' ? 500 : level === 'hard' ? 1000 : 10;

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/vocab_full.json')
            .then(res => res.json())
            .then((data: Vocab[]) => {
                // Filter words strictly based on the requested counts without overlapping
                let pool: Vocab[] = [];
                if (level === 'easy') {
                    pool = data.slice(0, 200);
                } else if (level === 'medium') {
                    pool = data.slice(200, 700);
                } else if (level === 'hard') {
                    pool = data.slice(700, 1700);
                } else {
                    pool = data.slice(0, 10);
                }

                // Randomize order of the pool so every unique word appears exactly once in the quiz
                const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

                const generated = [];
                for (let i = 0; i < totalQuestions; i++) {
                    const correctItem = shuffledPool[i];
                    if (!correctItem) break;

                    const options = [correctItem];

                    // Generate wrong choices from the identical pool context so difficulty is consistent
                    while (options.length < 4) {
                        const wrongItem = pool[Math.floor(Math.random() * pool.length)];
                        if (!options.find(o => o.english === wrongItem.english)) {
                            options.push(wrongItem);
                        }
                    }

                    // shuffle options
                    options.sort(() => Math.random() - 0.5);

                    generated.push({
                        correctWord: correctItem,
                        options: options
                    });
                }

                setQuestions(generated);
                setLoading(false);
            });
    }, [level, totalQuestions]);

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return; // prevent double click

        setSelectedAnswer(answer);

        const isCorrect = answer === questions[currentIndex].correctWord.indonesia;
        if (isCorrect) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentIndex < totalQuestions - 1) {
                setCurrentIndex(c => c + 1);
                setSelectedAnswer(null);
            } else {
                setIsFinished(true);
            }
        }, 1200); // Shorter wait to accommodate 1000 questions (1.2s!)
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-muted-foreground animate-pulse font-medium">Menyiapkan kuis {level} ({totalQuestions} Kata)...</p>
                </div>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md">
                    <Card className="text-center border-primary/20 shadow-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                        <CardHeader className="pt-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                className="mx-auto w-24 h-24 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4"
                            >
                                <Trophy className="w-12 h-12" />
                            </motion.div>
                            <CardTitle className="text-3xl font-bold">Kuis Selesai!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground font-medium">Skor akhir Anda untuk level <span className="uppercase text-foreground">{level}</span>:</p>
                            <div className="text-6xl font-black text-primary drop-shadow-sm">
                                {score} <span className="text-3xl text-muted-foreground">/ {totalQuestions}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                {score === totalQuestions ? "Sempurna! Pengetahuan kosakatamu luar biasa."
                                    : (score / totalQuestions) >= 0.7 ? "Kerja bagus! Sedikit lagi menuju kesempurnaan."
                                        : "Terus semangat! Latihan lagi untuk meningkatkan kosakatamu."}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 pb-8">
                            <Button onClick={() => window.location.reload()} className="w-full" size="lg">
                                <RotateCcw className="w-4 h-4 mr-2" /> Main Lagi
                            </Button>
                            <Link href="/quiz" className="w-full">
                                <Button variant="outline" className="w-full" size="lg">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Pilih Level Lain
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    // Safely fallback when out of bounds or loading delay
    if (!currentQ) return null;

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 flex flex-col items-center justify-center">
            <div className="max-w-3xl w-full flex flex-col gap-6">

                {/* Header Navigation */}
                <div className="flex items-center justify-between w-full">
                    <Link href="/quiz">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali
                        </Button>
                    </Link>
                    <div className="px-4 py-1.5 uppercase tracking-widest text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm shadow-sm">
                        Level {level}
                    </div>
                </div>

                <Card className="border-border/50 shadow-2xl relative overflow-hidden bg-background/50 backdrop-blur-xl">
                    <Progress
                        value={((currentIndex) / totalQuestions) * 100}
                        className="h-1.5 rounded-none absolute top-0 left-0 right-0 w-full"
                    />

                    <CardHeader className="pt-12 pb-6 text-center">
                        <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-1">
                            Pertanyaan {currentIndex + 1} / {totalQuestions}
                        </p>
                        <div className="min-h-[100px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-4xl md:text-6xl font-black tracking-tight"
                                >
                                    "{currentQ.correctWord.english}"
                                </motion.h2>
                            </AnimatePresence>
                        </div>
                        <p className="text-base text-muted-foreground mt-4">Pilih terjemahan yang tepat:</p>
                    </CardHeader>

                    <CardContent className="pb-10 pt-4 px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQ.options.map((opt: any, idx: number) => {
                                const isSelected = selectedAnswer === opt.indonesia;
                                const isCorrect = opt.indonesia === currentQ.correctWord.indonesia;

                                // Show colors only if an answer has been selected
                                const showCorrect = selectedAnswer && isCorrect;
                                const showWrong = selectedAnswer && isSelected && !isCorrect;

                                let btnClass = "h-auto py-5 text-lg justify-start px-6 font-medium transition-all duration-300 w-full rounded-xl border-2 ";
                                let variant: "default" | "outline" | "secondary" = "outline";

                                if (selectedAnswer) {
                                    if (showCorrect) {
                                        btnClass += "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/50";
                                    } else if (showWrong) {
                                        btnClass += "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/50";
                                    } else {
                                        btnClass += "opacity-40 border-transparent shadow-none";
                                    }
                                } else {
                                    btnClass += "hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-1 hover:shadow-md border-border/50 bg-background";
                                }

                                return (
                                    <Button
                                        key={idx}
                                        variant={variant}
                                        className={btnClass}
                                        onClick={() => handleAnswer(opt.indonesia)}
                                        disabled={!!selectedAnswer}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className="line-clamp-2 text-left">{opt.indonesia}</span>
                                            {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />}
                                            {showWrong && <XCircle className="w-5 h-5 text-red-500 ml-3 flex-shrink-0" />}
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
