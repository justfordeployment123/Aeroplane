import { useEffect } from "react";

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
}

export function useSEO({ title, description, canonical, ogImage }: SEOProps) {
    useEffect(() => {
        // Title
        document.title = `${title} | FlyingPan`;

        // Description
        setMeta("name", "description", description);

        // Canonical
        if (canonical) {
            let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
            if (!link) {
                link = document.createElement("link");
                link.rel = "canonical";
                document.head.appendChild(link);
            }
            link.href = canonical;
        }

        // OG tags
        setMeta("property", "og:title", `${title} | FlyingPan`);
        setMeta("property", "og:description", description);
        if (ogImage) setMeta("property", "og:image", ogImage);

        // Twitter tags
        setMeta("name", "twitter:title", `${title} | FlyingPan`);
        setMeta("name", "twitter:description", description);
    }, [title, description, canonical, ogImage]);
}

function setMeta(attr: string, key: string, value: string) {
    let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", value);
}
