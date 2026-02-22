"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, BookA, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Update this type based on public/data/vocab_full.json
type VocabItem = {
    english: string;
    indonesia: string;
    type?: string;
    frequency?: string;
};

const ITEMS_PER_PAGE = 50;

export default function KosakataPage() {
    const [vocabData, setVocabData] = useState<VocabItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const fetchVocab = async () => {
            try {
                const response = await fetch("/data/vocab_full.json");
                if (!response.ok) throw new Error("Failed to load vocabulary data");
                const data = await response.json();
                setVocabData(data);
            } catch (error) {
                console.error("Error loading vocabulary:", error);
                // Fallback or error state could be handled here
            } finally {
                setIsLoading(false);
            }
        };

        fetchVocab();
    }, []);

    // Filter data based on search term
    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return vocabData;
        const lowercasedSearch = searchTerm.toLowerCase();
        return vocabData.filter(
            (item) =>
                item.english.toLowerCase().includes(lowercasedSearch) ||
                item.indonesia.toLowerCase().includes(lowercasedSearch)
        );
    }, [vocabData, searchTerm]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    // Ensure current page is valid when filtering reduces page count
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredData.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredData, currentPage]);

    // Pagination logic to show limited page numbers
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                            className="cursor-pointer"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Always show first page
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        isActive={currentPage === 1}
                        onClick={() => setCurrentPage(1)}
                        className="cursor-pointer"
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            // Show left ellipsis if needed
            if (currentPage > 3) {
                items.push(
                    <PaginationItem key="ellipsis-1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            // Show middle pages
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={currentPage === i}
                            onClick={() => setCurrentPage(i)}
                            className="cursor-pointer"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            // Show right ellipsis if needed
            if (currentPage < totalPages - 2) {
                items.push(
                    <PaginationItem key="ellipsis-2">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            // Always show last page
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        isActive={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="cursor-pointer"
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
            {/* Navbar/Header - simplified for inner pages */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-background/80 border-b border-white/10 dark:border-white/5">
                <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-md">
                                <BookA className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-base font-bold tracking-tight">Daftar Kosakata</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto max-w-5xl px-4 sm:px-6 py-8">
                {/* Page Header */}
                <div className="mb-8 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-br from-foreground to-foreground/70 dark:from-white dark:to-white/60 text-transparent bg-clip-text mb-2">
                            Katalog Kosakata Lengkap
                        </h1>
                        <p className="text-muted-foreground">
                            Jelajahi dan cari ribuan perbendaharaan kata bahasa Inggris beserta artinya.
                        </p>
                    </div>

                    <Link href="/quiz" className="w-full md:w-auto">
                        <Button variant="default" className="gap-2 w-full">
                            Ayo main Quiz
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Cari kata dalam Inggris atau Indonesia..."
                            className="pl-9 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary/30 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on new search
                            }}
                        />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground bg-secondary/50 px-4 rounded-xl border border-secondary">
                        {isLoading ? "Memuat data..." : `${filteredData.length.toLocaleString('id-ID')} kata ditemukan`}
                    </div>
                </div>

                {/* Table Container */}
                <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden shadow-sm relative min-h-[500px]">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-20">
                            <div className="flex flex-col items-center gap-4">
                                <motion.div
                                    className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                />
                                <p className="text-muted-foreground animate-pulse">Menyiapkan kamus...</p>
                            </div>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[80px] font-semibold">No.</TableHead>
                                    <TableHead className="w-[30%] font-semibold">Bahasa Inggris</TableHead>
                                    <TableHead className="w-[40%] font-semibold">Bahasa Indonesia</TableHead>
                                    <TableHead className="hidden md:table-cell font-semibold text-muted-foreground">Tipe Kata</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence mode="popLayout">
                                    {currentData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-40 text-center text-muted-foreground">
                                                Tidak ada kosakata yang cocok dengan "{searchTerm}"
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        currentData.map((item, index) => {
                                            const absoluteIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                                            return (
                                                <motion.tr
                                                    key={`${item.english}-${index}`} // Using composite key fallback as english might not be strictly unique
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                                    transition={{ duration: 0.2, delay: Math.min(index * 0.01, 0.2) }}
                                                    className="hover:bg-muted/40 transition-colors border-b border-border/40 last:border-0"
                                                >
                                                    <TableCell className="text-muted-foreground font-mono text-sm">{absoluteIndex}</TableCell>
                                                    <TableCell className="font-semibold text-primary/90">{item.english}</TableCell>
                                                    <TableCell>{item.indonesia}</TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {item.type ? (
                                                            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-secondary-foreground/10 opacity-70">
                                                                {item.type.replace(/[()]/g, '')}
                                                            </span>
                                                        ) : '-'}
                                                    </TableCell>
                                                </motion.tr>
                                            );
                                        })
                                    )}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="mt-6 flex justify-between items-center bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 shadow-sm">
                        <div className="hidden sm:block text-sm text-muted-foreground">
                            Menampilkan <span className="font-medium text-foreground">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> hingga <span className="font-medium text-foreground">{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> dari total data
                        </div>

                        <Pagination className="w-auto mx-0">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>

                                {renderPaginationItems()}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
        </div>
    );
}
