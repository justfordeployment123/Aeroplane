import { Component, type ReactNode, type ErrorInfo } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ errorInfo });
        // Hook into your error reporting service here (Sentry, etc.)
        console.error("[ErrorBoundary]", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;

            return (
                <main
                    className="min-h-screen text-white font-sans flex flex-col items-center justify-center relative overflow-hidden px-4 py-20"
                    style={{ background: "#161622" }}
                    role="alert"
                    aria-live="assertive"
                >
                    {/* Ambient red glow */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.06) 0%, transparent 70%)" }}
                        aria-hidden="true"
                    />

                    <motion.div
                        className="relative z-10 text-center max-w-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Icon */}
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                            style={{
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.25)",
                                boxShadow: "0 0 30px rgba(239,68,68,0.1)",
                            }}
                            aria-hidden="true"
                        >
                            <AlertTriangle size={28} className="text-red-400" />
                        </div>

                        <span className="text-red-400 text-xs uppercase tracking-[0.25em] font-semibold block mb-3">Something went wrong</span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">An unexpected error occurred</h1>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            The application encountered an error and couldn't continue. You can try refreshing the page or go back to the home page.
                        </p>

                        {/* Error detail (dev-only style — collapsed) */}
                        {this.state.error && (
                            <details className="text-left mb-8 rounded-xl overflow-hidden border border-white/[0.06]">
                                <summary className="px-4 py-3 bg-white/[0.03] text-xs text-gray-600 cursor-pointer hover:text-gray-400 transition-colors select-none">
                                    Error details
                                </summary>
                                <pre className="px-4 py-3 text-[11px] text-red-400/70 overflow-x-auto bg-[#111119] whitespace-pre-wrap break-all">
                                    {this.state.error.message}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                                onClick={this.handleReset}
                                className="flex items-center gap-2 px-7 py-3 rounded-full border border-white/[0.1] text-gray-300 hover:text-white hover:border-white/[0.22] text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30"
                            >
                                <RefreshCw size={14} aria-hidden="true" />
                                Try again
                            </button>
                            <a href="/">
                                <button className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-aero-blue">
                                    <Home size={14} aria-hidden="true" />
                                    Go home
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </main>
            );
        }

        return this.props.children;
    }
}
