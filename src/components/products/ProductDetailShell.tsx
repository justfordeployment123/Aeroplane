import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "./Breadcrumbs";
import type { TranslatedProduct, TranslatedCategory } from "../../hooks/useProducts";

interface ProductDetailShellProps {
    product: TranslatedProduct;
    categories: TranslatedCategory[];
    allProducts: TranslatedProduct[];
    onBack: () => void;
    onNavigate: (id: string) => void;
    children: React.ReactNode;
}

export const ProductDetailShell = ({ product, categories, allProducts, onBack, onNavigate, children }: ProductDetailShellProps) => {
    const { t } = useTranslation("products");

    // Category for this product
    const category = categories.find((c) => c.id === product.categoryId);

    // Siblings within same category for prev/next
    const siblings = category?.products ?? [];
    const currentIdx = siblings.findIndex((p) => p.id === product.id);
    const prevProduct = currentIdx > 0 ? siblings[currentIdx - 1] : null;
    const nextProduct = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

    return (
        <div className="min-h-screen text-white font-sans" style={{ background: "#161622" }}>
            {/* ── Top bar: breadcrumbs + back button ── */}
            <div
                className="sticky top-[72px] z-40 border-b"
                style={{
                    background: "rgba(22,22,34,0.92)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.06)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
                    {/* Breadcrumb */}
                    {/* <Breadcrumbs
                        items={[
                            {
                                label: t("breadcrumb.home", "Products"),
                                onClick: onBack,
                            },
                            ...(category
                                ? [
                                      {
                                          label: category.title,
                                          onClick: () => {
                                              onBack();
                                              // Small delay so the page renders then scrolls
                                              setTimeout(() => {
                                                  const el = document.getElementById(category.id);
                                                  if (el)
                                                      window.scrollTo({
                                                          top: el.getBoundingClientRect().top + window.scrollY - 140,
                                                          behavior: "smooth",
                                                      });
                                              }, 100);
                                          },
                                          accent: category.accent,
                                      },
                                  ]
                                : []),
                            {
                                label: product.name,
                                accent: product.accent,
                            },
                        ]}
                    /> */}

                    {/* Back button — compact */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-aero-blue/50 rounded shrink-0"
                        aria-label={t("breadcrumb.backToProducts", "Back to all products")}
                    >
                        <ChevronLeft size={14} aria-hidden="true" />
                        <span className="hidden sm:inline">{t("breadcrumb.backToProducts", "All products")}</span>
                    </button>
                </div>
            </div>

            {/* ── Page content ── */}
            {children}

            {/* ── Prev / Next navigation ── */}
            {(prevProduct || nextProduct) && (
                <section className="border-t border-white/[0.06] py-10" aria-label="Navigate between products" style={{ background: "#111119" }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-5 text-center">
                            {t("detail.moreIn", "More in")} {category?.title}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {/* Prev */}
                            {prevProduct ? (
                                <motion.button
                                    onClick={() => onNavigate(prevProduct.id)}
                                    whileHover={{ x: -3 }}
                                    transition={{ duration: 0.18 }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-[#1c1c2a] hover:bg-[#202030] transition-all text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-aero-blue/50"
                                    aria-label={`Previous: ${prevProduct.name}`}
                                >
                                    <ArrowLeft
                                        size={16}
                                        className="text-gray-600 group-hover:text-white shrink-0 transition-colors"
                                        aria-hidden="true"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">
                                            {t("detail.previous", "Previous")}
                                        </p>
                                        <p className="text-sm font-semibold text-white truncate">{prevProduct.name}</p>
                                        <p className="text-[11px] truncate" style={{ color: prevProduct.accent }}>
                                            {prevProduct.tag}
                                        </p>
                                    </div>
                                </motion.button>
                            ) : (
                                <div />
                            )}

                            {/* Next */}
                            {nextProduct ? (
                                <motion.button
                                    onClick={() => onNavigate(nextProduct.id)}
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.18 }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] hover:border-white/[0.14] bg-[#1c1c2a] hover:bg-[#202030] transition-all text-right justify-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-aero-blue/50 sm:col-start-2"
                                    aria-label={`Next: ${nextProduct.name}`}
                                >
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{t("detail.next", "Next")}</p>
                                        <p className="text-sm font-semibold text-white truncate">{nextProduct.name}</p>
                                        <p className="text-[11px] truncate" style={{ color: nextProduct.accent }}>
                                            {nextProduct.tag}
                                        </p>
                                    </div>
                                    <ArrowRight
                                        size={16}
                                        className="text-gray-600 group-hover:text-white shrink-0 transition-colors"
                                        aria-hidden="true"
                                    />
                                </motion.button>
                            ) : (
                                <div />
                            )}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
