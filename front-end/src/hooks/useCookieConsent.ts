import { useState, useEffect, useCallback } from "react";

export type ConsentStatus = "pending" | "accepted" | "declined";

export interface ConsentPreferences {
    necessary: true;       // always true, can't be toggled
    analytics: boolean;
    marketing: boolean;
}

const STORAGE_KEY = "gaadt_cookie_consent";
const STORAGE_VERSION = "1"; // bump to re-prompt after policy changes

interface StoredConsent {
    status: ConsentStatus;
    version: string;
    preferences: ConsentPreferences;
    timestamp: number;
}

const DEFAULT_PREFERENCES: ConsentPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
};

export const useCookieConsent = () => {
    const [status, setStatus] = useState<ConsentStatus>("pending");
    const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);
    const [showBanner, setShowBanner] = useState(false);

    // Load stored consent on mount
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) { setShowBanner(true); return; }
            const stored: StoredConsent = JSON.parse(raw);
            // Re-prompt if version changed
            if (stored.version !== STORAGE_VERSION) { setShowBanner(true); return; }
            setStatus(stored.status);
            setPreferences(stored.preferences);
            setShowBanner(false);
        } catch {
            setShowBanner(true);
        }
    }, []);

    const save = useCallback((newStatus: ConsentStatus, prefs: ConsentPreferences) => {
        const stored: StoredConsent = {
            status: newStatus,
            version: STORAGE_VERSION,
            preferences: prefs,
            timestamp: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        setStatus(newStatus);
        setPreferences(prefs);
        setShowBanner(false);
    }, []);

    const acceptAll = useCallback(() => {
        save("accepted", { necessary: true, analytics: true, marketing: true });
    }, [save]);

    const declineAll = useCallback(() => {
        save("declined", { necessary: true, analytics: false, marketing: false });
    }, [save]);

    const saveCustom = useCallback((prefs: Omit<ConsentPreferences, "necessary">) => {
        save("accepted", { necessary: true, ...prefs });
    }, [save]);

    const resetConsent = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setStatus("pending");
        setPreferences(DEFAULT_PREFERENCES);
        setShowBanner(true);
    }, []);

    return { status, preferences, showBanner, acceptAll, declineAll, saveCustom, resetConsent };
};