import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtranslateSettings?: any;
    ecompaasStorageFromParent?: any;
  }
}

export const GTranslate = () => {
    const scriptAdded = useRef(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !scriptAdded.current) {
            scriptAdded.current = true;

            // Basic origin fix
            if (!window.location.origin) {
                 (window.location as any).origin =
                    window.location.protocol +
                    "//" +
                    window.location.hostname +
                    (window.location.port ? ":" + window.location.port : "");
            }

            // Settings
            window.gtranslateSettings = {
                default_language: "en",
                native_language_names: true,
                languages: ["en", "gu", "hi", "ar", "ta"],
                wrapper_selector: ".gtranslate_wrapper",
                flag_size: 24,
                alt_flags: { "en": "usa" }, // Optional: nicer US flag for EN
                switcher_horizontal_position: "inline", // Attempt to force inline
                switcher_vertical_position: "top",
                float_switcher_open_direction: "bottom",
            };

            // Remove existing script if any (hot reload fix)
            const existingScript = document.querySelector('script[src*="gtranslate.net"]');
            if (existingScript) existingScript.remove();

             // Using dwf.js (Dropdown With Flags) as it is better suited for inline embedding
             const script = document.createElement("script");
             script.src = "https://cdn.gtranslate.net/widgets/latest/dwf.js";
             script.defer = true;
             document.body.appendChild(script);

             // Storage sync logic
            const accessToken = localStorage.getItem("access_token");
            if (accessToken) {
                const e = setInterval(() => {
                    if (localStorage.getItem("session_loaded")) {
                        const t = document.getElementById("session-iframe") as any;
                        if (t && window.ecompaasStorageFromParent) {
                             window.ecompaasStorageFromParent(t, "access_token", accessToken);
                             clearInterval(e);
                        } else if (t) {
                               if (t.contentWindow && (t.contentWindow as any).ecompaasStorageFromParent) {
                                   (t.contentWindow as any).ecompaasStorageFromParent("access_token", accessToken);
                                   clearInterval(e);
                               }
                        }
                    }
                }, 1000);
            }
        }
    }, []);

    // We need to render the wrapper but hide it because GTranslate requires it to inject the widget.
    // However, since we are using 'float.js' or similar, it might inject into body.
    // If using 'dwf.js', it injects into wrapper selector.
    // We hide it so users see our Custom UI only.
    return (
        <div className="gtranslate_wrapper" style={{ display: 'none' }}></div>
    );
};
