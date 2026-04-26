// pages/AdminProducts.tsx
import { useState, useEffect, useRef } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    ChevronUp,
    ChevronDown,
    X,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Search,
    ArrowLeft,
    ImagePlus,
    Package,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Spec {
    label: string;
    value: string;
}

interface Product {
    _id: string;
    name: string;
    tag: string;
    description: string;
    categoryId: string;
    accent: string;
    highlights: string[];
    specs: Spec[];
    applications: string[];
    img: { url: string; publicId: string };
    paramImg: { url: string; publicId: string };
    video: string;
    isVisible: boolean;
    order: number;
    createdAt: string;
}

const EMPTY_FORM = {
    name: "",
    tag: "",
    description: "",
    categoryId: "uav",
    accent: "#00D2FF",
    highlights: [""],
    specs: [{ label: "", value: "" }] as Spec[],
    applications: [""],
    img: { url: "", publicId: "" },
    paramImg: { url: "", publicId: "" },
    video: "",
    isVisible: true,
    order: 0,
};

const CATEGORIES = [
    { id: "uav", label: "UAV" },
    { id: "special", label: "Special Aircraft" },
    { id: "ground-station", label: "Ground Control Station" },
    { id: "control-system", label: "UAVs Control System" },
];

const API = import.meta.env.VITE_API_URL ?? "";

// ── Helpers ───────────────────────────────────────────────────────────────────

const apiFetch = async (path: string, opts: RequestInit = {}) => {
    const res = await fetch(`${API}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(opts.headers ?? {}) },
        ...opts,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? "Request failed");
    return data;
};

// ── Toast ─────────────────────────────────────────────────────────────────────

interface ToastState {
    msg: string;
    type: "success" | "error";
}

const Toast = ({ toast, onClose }: { toast: ToastState; onClose: () => void }) => (
    <div
        className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium shadow-2xl transition-all animate-in slide-in-from-bottom-4
            ${
                toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300" : "bg-red-950/90 border-red-500/30 text-red-300"
            }`}
    >
        {toast.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
        {toast.msg}
        <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
            <X size={14} />
        </button>
    </div>
);

// ── Image Uploader ─────────────────────────────────────────────────────────────

interface ImgUploaderProps {
    label: string;
    value: { url: string; publicId: string };
    folder: string;
    onChange: (v: { url: string; publicId: string }) => void;
}

const ImgUploader = ({ label, value, folder, onChange }: ImgUploaderProps) => {
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setErr("");
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("folder", folder);

            const res = await fetch(`${API}/admin/products/upload-image`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            onChange({ url: data.url, publicId: data.publicId });
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest uppercase text-white/40">{label}</label>
            <div
                className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors hover:border-sky-500/40"
                style={{ borderColor: value.url ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files[0];
                    if (f) handleFile(f);
                }}
            >
                {value.url ? (
                    <div className="space-y-2">
                        <img src={value.url} alt="preview" className="mx-auto max-h-32 object-contain rounded-lg" />
                        <p className="text-xs text-white/30 truncate max-w-full">{value.url.split("/").pop()}</p>
                    </div>
                ) : (
                    <div className="py-4 space-y-2">
                        <ImagePlus size={28} className="mx-auto text-white/20" />
                        <p className="text-xs text-white/30">Click or drag to upload</p>
                    </div>
                )}
                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                        <Loader2 size={24} className="animate-spin text-sky-400" />
                    </div>
                )}
            </div>
            {err && <p className="text-xs text-red-400">{err}</p>}
            {value.url && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onChange({ url: "", publicId: "" });
                    }}
                    className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                >
                    Remove image
                </button>
            )}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                }}
            />
        </div>
    );
};

// ── Dynamic list field ────────────────────────────────────────────────────────

const DynList = ({
    label,
    values,
    onChange,
    placeholder,
}: {
    label: string;
    values: string[];
    onChange: (v: string[]) => void;
    placeholder?: string;
}) => (
    <div className="space-y-2">
        <label className="text-xs font-bold tracking-widest uppercase text-white/40">{label}</label>
        {values.map((v, i) => (
            <div key={i} className="flex gap-2">
                <input
                    value={v}
                    placeholder={placeholder}
                    onChange={(e) => {
                        const next = [...values];
                        next[i] = e.target.value;
                        onChange(next);
                    }}
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50"
                />
                <button
                    type="button"
                    onClick={() => onChange(values.filter((_, j) => j !== i))}
                    className="text-white/20 hover:text-red-400 transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        ))}
        <button
            type="button"
            onClick={() => onChange([...values, ""])}
            className="text-xs text-sky-400/60 hover:text-sky-400 transition-colors flex items-center gap-1"
        >
            <Plus size={12} /> Add
        </button>
    </div>
);

// ── Spec list ─────────────────────────────────────────────────────────────────

const SpecList = ({ specs, onChange }: { specs: Spec[]; onChange: (v: Spec[]) => void }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold tracking-widest uppercase text-white/40">Specs</label>
        {specs.map((s, i) => (
            <div key={i} className="flex gap-2">
                <input
                    value={s.label}
                    placeholder="Parameter"
                    onChange={(e) => {
                        const n = [...specs];
                        n[i] = { ...n[i], label: e.target.value };
                        onChange(n);
                    }}
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50"
                />
                <input
                    value={s.value}
                    placeholder="Value"
                    onChange={(e) => {
                        const n = [...specs];
                        n[i] = { ...n[i], value: e.target.value };
                        onChange(n);
                    }}
                    className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50"
                />
                <button
                    type="button"
                    onClick={() => onChange(specs.filter((_, j) => j !== i))}
                    className="text-white/20 hover:text-red-400 transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        ))}
        <button
            type="button"
            onClick={() => onChange([...specs, { label: "", value: "" }])}
            className="text-xs text-sky-400/60 hover:text-sky-400 transition-colors flex items-center gap-1"
        >
            <Plus size={12} /> Add spec
        </button>
    </div>
);

// ── Product Form Modal ─────────────────────────────────────────────────────────

interface FormModalProps {
    initial: typeof EMPTY_FORM | null;
    onSave: (data: typeof EMPTY_FORM) => Promise<void>;
    onClose: () => void;
}

const FormModal = ({ initial, onSave, onClose }: FormModalProps) => {
    const [form, setForm] = useState(initial ?? EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState("");

    const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

    const handleSubmit = async () => {
        setErr("");
        // Basic validation
        if (!form.name.trim() || !form.tag.trim() || !form.description.trim()) {
            setErr("Name, tag and description are required.");
            return;
        }
        // Strip empty strings from arrays
        const payload = {
            ...form,
            highlights: form.highlights.filter(Boolean),
            applications: form.applications.filter(Boolean),
            specs: form.specs.filter((s) => s.label || s.value),
        };
        setSaving(true);
        try {
            await onSave(payload);
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "Save failed");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative h-full w-full max-w-2xl overflow-y-auto bg-[#0d0d18] border-l border-white/[0.06] p-6 space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-[#0d0d18] pb-4 border-b border-white/[0.06] z-10">
                    <div>
                        <p className="text-[10px] tracking-widest uppercase text-sky-400/60">{initial ? "Edit Product" : "New Product"}</p>
                        <h2 className="text-xl font-bold text-white">{form.name || "Untitled"}</h2>
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Error banner */}
                {err && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/20 text-red-300 text-sm">
                        <AlertCircle size={14} className="shrink-0" /> {err}
                    </div>
                )}

                {/* ── Fields ── */}
                <Field label="Name">
                    <input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. DJI Matrice 300 RTK"
                        className={inputCls}
                    />
                </Field>
                <Field label="Tag / Badge">
                    <input value={form.tag} onChange={(e) => set("tag", e.target.value)} placeholder="e.g. Enterprise UAV" className={inputCls} />
                </Field>
                <Field label="Category">
                    <select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inputCls}>
                        {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id} className="bg-[#0d0d18] text-white">
                                {c.label}
                            </option>
                        ))}
                    </select>
                </Field>
                <Field label="Accent colour">
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={form.accent}
                            onChange={(e) => set("accent", e.target.value)}
                            className="h-10 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
                        />
                        <input value={form.accent} onChange={(e) => set("accent", e.target.value)} className={`${inputCls} flex-1`} />
                    </div>
                </Field>
                <Field label="Description">
                    <textarea
                        value={form.description}
                        onChange={(e) => set("description", e.target.value)}
                        rows={3}
                        placeholder="Product description…"
                        className={`${inputCls} resize-none`}
                    />
                </Field>

                <DynList label="Highlights" values={form.highlights} onChange={(v) => set("highlights", v)} placeholder="e.g. 55 min flight time" />
                <SpecList specs={form.specs} onChange={(v) => set("specs", v)} />
                <DynList
                    label="Applications"
                    values={form.applications}
                    onChange={(v) => set("applications", v)}
                    placeholder="e.g. Power line inspection"
                />

                <ImgUploader label="Main product image" value={form.img} folder="markhor/products/main" onChange={(v) => set("img", v)} />
                <ImgUploader
                    label="Parameter image (optional)"
                    value={form.paramImg}
                    folder="markhor/products/params"
                    onChange={(v) => set("paramImg", v)}
                />

                <Field label="Video URL (optional)">
                    <input value={form.video} onChange={(e) => set("video", e.target.value)} placeholder="https://…" className={inputCls} />
                </Field>

                <Field label="Sort order">
                    <input type="number" value={form.order} onChange={(e) => set("order", Number(e.target.value))} className={inputCls} />
                </Field>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => set("isVisible", !form.isVisible)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors
                            ${
                                form.isVisible
                                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-950/30"
                                    : "border-white/10 text-white/30 bg-white/[0.02]"
                            }`}
                    >
                        {form.isVisible ? (
                            <>
                                <Eye size={14} /> Visible
                            </>
                        ) : (
                            <>
                                <EyeOff size={14} /> Hidden
                            </>
                        )}
                    </button>
                </div>

                {/* Save */}
                <div className="sticky bottom-0 pt-4 bg-[#0d0d18] border-t border-white/[0.06] flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm transition-colors disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                        {initial ? "Save changes" : "Create product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const inputCls =
    "w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-colors";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-bold tracking-widest uppercase text-white/40">{label}</label>
        {children}
    </div>
);

// ── Delete confirm ─────────────────────────────────────────────────────────────

const DeleteConfirm = ({ product, onConfirm, onCancel }: { product: Product; onConfirm: () => void; onCancel: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm bg-[#0d0d18] border border-red-500/20 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
                <Trash2 size={20} className="text-red-400" />
            </div>
            <div className="text-center space-y-1">
                <h3 className="font-bold text-white">Delete product?</h3>
                <p className="text-sm text-white/40">
                    <span className="text-white/70">{product.name}</span> will be permanently removed including its Cloudinary images.
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:text-white hover:border-white/20 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-bold transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
);

// ── Product row ───────────────────────────────────────────────────────────────

const ProductRow = ({
    product,
    onEdit,
    onDelete,
    onToggleVisibility,
    onMoveUp,
    onMoveDown,
}: {
    product: Product;
    onEdit: () => void;
    onDelete: () => void;
    onToggleVisibility: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
}) => {
    const catLabel = CATEGORIES.find((c) => c.id === product.categoryId)?.label ?? product.categoryId;

    return (
        <div
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-colors
            ${product.isVisible ? "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]" : "border-white/[0.03] bg-white/[0.01] opacity-50 hover:opacity-70"}`}
        >
            {/* Image */}
            <div className="w-14 h-14 rounded-xl shrink-0 overflow-hidden border border-white/[0.06] bg-black/40 flex items-center justify-center">
                {product.img?.url ? (
                    <img src={product.img.url} alt={product.name} className="w-full h-full object-contain p-1" />
                ) : (
                    <Package size={20} className="text-white/10" />
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-white text-sm truncate">{product.name}</h3>
                    <span
                        className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-md shrink-0"
                        style={{ color: product.accent, background: `${product.accent}18`, border: `1px solid ${product.accent}25` }}
                    >
                        {product.tag}
                    </span>
                </div>
                <p className="text-xs text-white/30 truncate max-w-md">{product.description}</p>
                <p className="text-[10px] text-white/20 mt-1">
                    {catLabel} · Order: {product.order}
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <IconBtn title="Move up" onClick={onMoveUp}>
                    <ChevronUp size={14} />
                </IconBtn>
                <IconBtn title="Move down" onClick={onMoveDown}>
                    <ChevronDown size={14} />
                </IconBtn>
                <IconBtn title={product.isVisible ? "Hide" : "Show"} onClick={onToggleVisibility}>
                    {product.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                </IconBtn>
                <IconBtn title="Edit" onClick={onEdit}>
                    <Pencil size={14} />
                </IconBtn>
                <IconBtn title="Delete" onClick={onDelete} danger>
                    <Trash2 size={14} />
                </IconBtn>
            </div>
        </div>
    );
};

const IconBtn = ({
    children,
    onClick,
    title,
    danger = false,
}: {
    children: React.ReactNode;
    onClick: () => void;
    title?: string;
    danger?: boolean;
}) => (
    <button
        onClick={onClick}
        title={title}
        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors
            ${
                danger
                    ? "border-red-500/20 text-red-400/50 hover:text-red-400 hover:bg-red-500/10"
                    : "border-white/[0.06] text-white/30 hover:text-white hover:bg-white/[0.06]"
            }`}
    >
        {children}
    </button>
);

// ── Main page ──────────────────────────────────────────────────────────────────

export default function AdminProducts() {
    const { admin } = useAdminAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [catFilter, setCatFilter] = useState("all");
    const [formTarget, setFormTarget] = useState<Product | null | "new">(null);
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
    const [toast, setToast] = useState<ToastState | null>(null);

    const notify = (msg: string, type: "success" | "error" = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    // Load products
    const load = async () => {
        setLoading(true);
        try {
            const data = await apiFetch("/admin/products");
            setProducts(data.products ?? []);
        } catch (e: unknown) {
            notify(e instanceof Error ? e.message : "Failed to load", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // Filtered view
    const filtered = products
        .filter((p) => catFilter === "all" || p.categoryId === catFilter)
        .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tag.toLowerCase().includes(search.toLowerCase()));

    // ── CRUD handlers ─────────────────────────────────────────────────────────

    const handleSave = async (formData: typeof EMPTY_FORM) => {
        if (formTarget === "new") {
            await apiFetch("/admin/products", { method: "POST", body: JSON.stringify(formData) });
            notify("Product created");
        } else if (formTarget) {
            await apiFetch(`/admin/products/${(formTarget as Product)._id}`, { method: "PUT", body: JSON.stringify(formData) });
            notify("Product updated");
        }
        setFormTarget(null);
        load();
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await apiFetch(`/admin/products/${deleteTarget._id}`, { method: "DELETE" });
            notify("Product deleted");
            setDeleteTarget(null);
            load();
        } catch (e: unknown) {
            notify(e instanceof Error ? e.message : "Delete failed", "error");
        }
    };

    const handleToggleVisibility = async (p: Product) => {
        try {
            await apiFetch(`/admin/products/${p._id}/visibility`, {
                method: "PATCH",
                body: JSON.stringify({ isVisible: !p.isVisible }),
            });
            setProducts((prev) => prev.map((x) => (x._id === p._id ? { ...x, isVisible: !x.isVisible } : x)));
        } catch (e: unknown) {
            notify(e instanceof Error ? e.message : "Toggle failed", "error");
        }
    };

    const handleMove = async (p: Product, dir: "up" | "down") => {
        const newOrder = dir === "up" ? p.order - 1 : p.order + 1;
        try {
            await apiFetch(`/admin/products/${p._id}/order`, {
                method: "PATCH",
                body: JSON.stringify({ order: newOrder }),
            });
            setProducts((prev) => prev.map((x) => (x._id === p._id ? { ...x, order: newOrder } : x)).sort((a, b) => a.order - b.order));
        } catch (e: unknown) {
            notify(e instanceof Error ? e.message : "Reorder failed", "error");
        }
    };

    // Build initial form data from existing product for edit
    const toFormData = (p: Product): typeof EMPTY_FORM => ({
        name: p.name,
        tag: p.tag,
        description: p.description,
        categoryId: p.categoryId,
        accent: p.accent,
        highlights: p.highlights.length ? p.highlights : [""],
        specs: p.specs.length ? p.specs : [{ label: "", value: "" }],
        applications: p.applications.length ? p.applications : [""],
        img: p.img ?? { url: "", publicId: "" },
        paramImg: p.paramImg ?? { url: "", publicId: "" },
        video: p.video ?? "",
        isVisible: p.isVisible,
        order: p.order,
    });

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-[#0a0a14] text-white font-mono">
            {/* Top bar */}
            <div className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0a0a14]/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <a href="/admin/dashboard" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-xs">
                        <ArrowLeft size={14} /> Dashboard
                    </a>
                    <div className="flex-1 flex items-center gap-1">
                        <span className="text-white/10 text-xs">/</span>
                        <span className="text-xs text-sky-400/70 tracking-widest uppercase">Products</span>
                    </div>
                    <div className="text-[10px] text-white/20">{admin?.username}</div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                        <p className="text-[10px] tracking-widest uppercase text-sky-400/60 mb-1">Admin</p>
                        <h1 className="text-2xl font-black text-white">Product Manager</h1>
                        <p className="text-xs text-white/30 mt-0.5">{products.length} products total</p>
                    </div>
                    <div className="sm:ml-auto flex items-center gap-3">
                        <button
                            onClick={() => setFormTarget("new")}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm transition-colors"
                        >
                            <Plus size={16} /> New Product
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products…"
                            className="w-full pl-9 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/40"
                        />
                    </div>
                    <select
                        value={catFilter}
                        onChange={(e) => setCatFilter(e.target.value)}
                        className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/40"
                    >
                        <option value="all">All categories</option>
                        {CATEGORIES.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: "Total", val: products.length },
                        { label: "Visible", val: products.filter((p) => p.isVisible).length },
                        { label: "Hidden", val: products.filter((p) => !p.isVisible).length },
                        { label: "Results", val: filtered.length },
                    ].map((s) => (
                        <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                            <p className="text-[10px] tracking-widest uppercase text-white/30">{s.label}</p>
                            <p className="text-2xl font-black text-white">{s.val}</p>
                        </div>
                    ))}
                </div>

                {/* Product list */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={28} className="animate-spin text-sky-400/50" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 space-y-3">
                        <Package size={40} className="mx-auto text-white/10" />
                        <p className="text-sm text-white/30">No products found</p>
                        <button onClick={() => setFormTarget("new")} className="text-xs text-sky-400/60 hover:text-sky-400 transition-colors">
                            Create your first product →
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {filtered.map((p) => (
                            <ProductRow
                                key={p._id}
                                product={p}
                                onEdit={() => setFormTarget(p)}
                                onDelete={() => setDeleteTarget(p)}
                                onToggleVisibility={() => handleToggleVisibility(p)}
                                onMoveUp={() => handleMove(p, "up")}
                                onMoveDown={() => handleMove(p, "down")}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Form modal */}
            {formTarget !== null && (
                <FormModal
                    initial={formTarget === "new" ? null : toFormData(formTarget as Product)}
                    onSave={handleSave}
                    onClose={() => setFormTarget(null)}
                />
            )}

            {/* Delete confirm */}
            {deleteTarget && <DeleteConfirm product={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}

            {/* Toast */}
            {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
        </div>
    );
}
