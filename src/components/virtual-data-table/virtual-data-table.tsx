"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Search } from "lucide-react";
import TableRow from "@/components/virtual-data-table/table-row";
import { DataRow, Props, SortDirection, SortKey } from "@/lib/types";
import { generateRow, ROW_HEIGHT, VISIBLE_ROWS } from "@/lib/utils";
import TableHeader from "@/components/virtual-data-table/table-header";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";

export default function VirtualDataTable({ isPolling, isLoading }: Props) {
  const [data, setData] = useState<DataRow[]>(() =>
    Array.from({ length: 50 }, generateRow)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadedRowsCount, setLoadedRowsCount] = useState(50); // Initial loaded rows

  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Polling new rows
  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(() => {
      setData((prev) => [generateRow(), ...prev]);
      setLoadedRowsCount((prev) => prev + 1); // Increment loaded count for new polled data
    }, 5000);

    return () => clearInterval(interval);
  }, [isPolling]);

  // Infinite scroll load more data
  const loadMoreData = useCallback(() => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      const newRows = Array.from({ length: 15 }, generateRow);
      setData((prev) => [...prev, ...newRows]);
      setLoadedRowsCount((prev) => prev + 15);
      setIsLoadingMore(false);
    }, 1000); // Simulate network request
  }, [isLoadingMore]);

  // Intersection Observer for loading more data
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          loadMoreData();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the loader is visible
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoadingMore, loadMoreData]);

  // Filter & sort
  const processedData = useMemo(() => {
    let rows = [...data];

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.user.toLowerCase().includes(s) ||
          r.action.toLowerCase().includes(s) ||
          r.endpoint.toLowerCase().includes(s) ||
          r.status.toLowerCase().includes(s)
      );
    }

    if (sortKey && sortDirection) {
      rows.sort((a, b) => {
        const A = a[sortKey];
        const B = b[sortKey];

        // Handle timestamp sorting safely
        if (sortKey === "timestamp") {
          const timeA = new Date(A).getTime();
          const timeB = new Date(B).getTime();

          return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
        }

        // Handle numeric sorting
        if (typeof A === "number" && typeof B === "number") {
          return sortDirection === "asc" ? A - B : B - A;
        }

        // Default string sorting
        return sortDirection === "asc"
          ? String(A).localeCompare(String(B))
          : String(B).localeCompare(String(A));
      });
    }

    return rows;
  }, [data, debouncedSearch, sortKey, sortDirection]);

  // Virtual Scroll
  const totalHeight = processedData.length * ROW_HEIGHT;
  const startIndex = Math.floor(scrollTop / ROW_HEIGHT);
  const endIndex = Math.min(
    processedData.length,
    startIndex + VISIBLE_ROWS + 2
  );
  const visibleData = processedData.slice(startIndex, endIndex);
  const offsetY = startIndex * ROW_HEIGHT;

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Sort handler
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
      );
      if (sortDirection === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: VISIBLE_ROWS }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-slate-800"
            >
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-2 h-5" />
              <Skeleton className="col-span-2 h-5" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by user, action, endpoint..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="text-slate-400 text-sm">
              {processedData.length} rows
            </div>
          </div>

          {/* Header */}
          <TableHeader
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          {/* Virtual Scroll */}
          <div
            ref={containerRef}
            onScroll={onScroll}
            style={{ height: ROW_HEIGHT * VISIBLE_ROWS }}
            className="overflow-y-auto bg-slate-900/50 custom-scrollbar"
          >
            <div style={{ height: totalHeight, position: "relative" }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                {visibleData.map((row) => (
                  <TableRow key={row.id} row={row} />
                ))}
                <div ref={loaderRef} style={{ height: "1px" }} />{" "}
                {/* Invisible loader element */}
              </div>
            </div>
            {isLoadingMore && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
