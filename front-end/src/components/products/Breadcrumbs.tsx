// import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
    accent?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1">
            <ol className="flex items-center flex-wrap gap-1" role="list">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={i} className="flex items-center gap-1" role="listitem">
                            {i > 0 && <ChevronRight size={12} className="text-gray-700 shrink-0" aria-hidden="true" />}
                            {isLast ? (
                                <span
                                    className="text-xs font-semibold truncate max-w-[180px]"
                                    style={{ color: item.accent ?? "#fff" }}
                                    aria-current="page"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <button
                                    onClick={item.onClick}
                                    className="text-xs text-gray-500 hover:text-gray-200 transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-aero-blue/50 rounded"
                                >
                                    {i === 0 && <Home size={11} aria-hidden="true" />}
                                    {item.label}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
