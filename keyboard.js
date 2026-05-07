// On-screen keyboard — appended inside #device so position:fixed is relative to
// the device's CSS transform, not the browser viewport.
(function () {
    const ROWS = [
        ["q","w","e","r","t","y","u","i","o","p"],
        ["a","s","d","f","g","h","j","k","l"],
        ["Shift","z","x","c","v","b","n","m","⌫"],
        ["123","Space","Return"],
    ];

    const NUM_ROWS = [
        ["1","2","3","4","5","6","7","8","9","0"],
        ["-","/",":",";","(",")","$","&","@",'"'],
        ["#+=",".","<",">","!","'","?","–","⌫"],
        ["ABC","Space","Return"],
    ];

    const PUNCT_ROWS = [
        ["[","]","{","}","#","%","^","*","+","="],
        ["_","\\","|","~","<",">","€","£","¥","·"],
        ["123",".","!","'","?","–","⌫"],
        ["ABC","Space","Return"],
    ];

    let shifted = false;
    let mode = "alpha";
    let activeInput = null;

    // --- styles ---
    const style = document.createElement("style");
    style.textContent = `
        #osk-overlay {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            pointer-events: none;
        }
        #osk-overlay.osk-visible {
            display: block;
        }
        #osk {
            pointer-events: all;
            width: 100%;
            background: #d1d5db;
            padding: 8px 4px 12px;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.18);
            user-select: none;
            box-sizing: border-box;
        }
        .osk-row {
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-bottom: 5px;
        }
        .osk-key {
            min-width: 48px;
            height: 44px;
            border-radius: 6px;
            border: none;
            background: #fff;
            color: #1c1c1e;
            font-size: 16px;
            font-family: inherit;
            cursor: pointer;
            box-shadow: 0 1px 0 #aaa;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 6px;
            flex: 1;
            max-width: 56px;
            touch-action: manipulation;
        }
        .osk-key:active {
            background: #b0b4bb;
            box-shadow: none;
            transform: translateY(1px);
        }
        .osk-key-wide {
            min-width: 70px;
            max-width: 90px;
            font-size: 13px;
        }
        .osk-key-space {
            flex: 4;
            max-width: 240px;
            font-size: 13px;
        }
        .osk-key-return {
            min-width: 70px;
            max-width: 90px;
            background: #a8d5aa;
            font-size: 13px;
        }
        .osk-key-shift-active {
            background: #4caf50;
            color: #fff;
        }
        .osk-key-action {
            background: #aeb3bb;
            color: #1c1c1e;
            font-size: 13px;
        }
    `;
    document.head.appendChild(style);

    // --- DOM ---
    const overlay = document.createElement("div");
    overlay.id = "osk-overlay";
    overlay.setAttribute("aria-hidden", "true");

    const kb = document.createElement("div");
    kb.id = "osk";
    overlay.appendChild(kb);

    // Append inside #device — its CSS transform makes it the containing block
    // for position:fixed children, so the keyboard stays within the device frame.
    document.getElementById("device").appendChild(overlay);

    function currentRows() {
        if (mode === "num") return NUM_ROWS;
        if (mode === "punct") return PUNCT_ROWS;
        return ROWS;
    }

    function renderKeyboard() {
        kb.innerHTML = "";
        currentRows().forEach(row => {
            const rowEl = document.createElement("div");
            rowEl.className = "osk-row";
            row.forEach(key => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "osk-key";
                btn.dataset.key = key;

                if (key === "Space") {
                    btn.classList.add("osk-key-space");
                    btn.textContent = "space";
                } else if (key === "Return") {
                    btn.classList.add("osk-key-return");
                    btn.textContent = "return";
                } else if (key === "Shift") {
                    btn.classList.add("osk-key-wide", "osk-key-action");
                    if (shifted) btn.classList.add("osk-key-shift-active");
                    btn.textContent = "⇧";
                } else if (key === "⌫") {
                    btn.classList.add("osk-key-wide", "osk-key-action");
                    btn.textContent = "⌫";
                } else if (key === "123" || key === "ABC" || key === "#+=") {
                    btn.classList.add("osk-key-wide", "osk-key-action");
                    btn.textContent = key;
                } else {
                    btn.textContent = (shifted && mode === "alpha") ? key.toUpperCase() : key;
                }

                rowEl.appendChild(btn);
            });
            kb.appendChild(rowEl);
        });
    }

    function handleKey(key) {
        if (!activeInput) return;

        if (key === "Shift") {
            shifted = !shifted;
            renderKeyboard();
            return;
        }
        if (key === "⌫") {
            const s = activeInput.selectionStart;
            const e = activeInput.selectionEnd;
            const v = activeInput.value;
            if (s !== e) {
                activeInput.value = v.slice(0, s) + v.slice(e);
                activeInput.setSelectionRange(s, s);
            } else if (s > 0) {
                activeInput.value = v.slice(0, s - 1) + v.slice(s);
                activeInput.setSelectionRange(s - 1, s - 1);
            }
            activeInput.dispatchEvent(new Event("input", { bubbles: true }));
            return;
        }
        if (key === "Return") {
            hideKeyboard();
            activeInput.blur();
            return;
        }
        if (key === "Space") { insertText(" "); return; }
        if (key === "123")  { mode = "num";   renderKeyboard(); return; }
        if (key === "ABC")  { mode = "alpha"; renderKeyboard(); return; }
        if (key === "#+=")  { mode = "punct"; renderKeyboard(); return; }

        const char = (shifted && mode === "alpha") ? key.toUpperCase() : key;
        insertText(char);
        if (shifted) { shifted = false; renderKeyboard(); }
    }

    function insertText(char) {
        if (!activeInput) return;
        const s = activeInput.selectionStart;
        const e = activeInput.selectionEnd;
        activeInput.value = activeInput.value.slice(0, s) + char + activeInput.value.slice(e);
        activeInput.setSelectionRange(s + char.length, s + char.length);
        activeInput.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Prevent input from losing focus when tapping a key
    kb.addEventListener("mousedown", e => {
        e.preventDefault();
        const btn = e.target.closest(".osk-key");
        if (btn) handleKey(btn.dataset.key);
    });

    function showKeyboard(input) {
        activeInput = input;
        mode = "alpha";
        shifted = false;
        renderKeyboard();
        overlay.classList.add("osk-visible");
    }

    function hideKeyboard() {
        overlay.classList.remove("osk-visible");
        activeInput = null;
    }

    // Show when a text input inside any modal panel or main screen gains focus
    document.addEventListener("focusin", e => {
        const el = e.target;
        if (
            el.tagName === "INPUT" &&
            (el.type === "text" || el.type === "") &&
            el.closest(".kitchen-modal-panel, .recipes-modal-panel, .kitchen-screen, .recipes-screen")
        ) {
            showKeyboard(el);
        }
    });

    // Hide when focus leaves all recognized inputs
    document.addEventListener("focusout", () => {
        setTimeout(() => {
            const focused = document.activeElement;
            if (!focused || !focused.closest(".kitchen-modal-panel, .recipes-modal-panel, .kitchen-screen, .recipes-screen")) {
                hideKeyboard();
            }
        }, 150);
    });
})();
