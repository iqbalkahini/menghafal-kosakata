"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { BrainCircuit, BookType, Flame } from "lucide-react";
import Link from "next/link";

const levels = [
    {
        id: "easy",
        title: "Easy",
        description: "Kosakata yang sangat sering digunakan sehari-hari. Cocok untuk pemula. (200 Kosakata)",
        icon: BookType,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        gradient: "from-green-500/20 to-transparent",
        path: "/quiz/easy"
    },
    {
        id: "medium",
        title: "Medium",
        description: "Kosakata menengah yang sering muncul dalam berita dan artikel. (500 Kosakata)",
        icon: BrainCircuit,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        gradient: "from-blue-500/20 to-transparent",
        path: "/quiz/medium"
    },
    {
        id: "hard",
        title: "Hard",
        description: "Kosakata tingkat lanjut dan jarang digunakan. Uji batas kemampuanmu! (1000 Kosakata)",
        icon: Flame,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        gradient: "from-red-500/20 to-transparent",
        path: "/quiz/hard"
    }
];

export default function QuizLevelSelection() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Level Kesulitan</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Sesuaikan tantangan dengan kemampuanmu saat ini. Pertanyaan akan diacak dari data kosakata kami.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {levels.map((level, i) => {
                        const Icon = level.icon;
                        return (
                            <motion.div
                                key={level.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                            >
                                <Card className={`relative overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className={`p-3 rounded-2xl ${level.bgColor} ${level.color}`}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                        </div>
                                        <CardTitle className="text-2xl font-bold">{level.title}</CardTitle>
                                        <CardDescription className="text-base text-muted-foreground">
                                            {level.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>

                                    </CardContent>

                                    <CardFooter>
                                        <Link href={level.path} className="w-full">
                                            <Button className="w-full group" variant={level.id === 'medium' ? 'default' : 'secondary'}>
                                                Mulai {level.title}
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
