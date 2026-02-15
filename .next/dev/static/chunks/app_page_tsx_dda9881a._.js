(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistovicMasterApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/api/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// 🌍 10-Language Dictionary
const translations = {
    en: {
        merge: "Merge",
        split: "Split",
        compress: "Compress",
        image: "To Image",
        text: "To Text",
        action: "Convert Now",
        select: "Select Files",
        success: "Success! File Ready"
    },
    es: {
        merge: "Combinar",
        split: "Dividir",
        compress: "Comprimir",
        image: "A Imagen",
        text: "A Texto",
        action: "Convertir ahora",
        select: "Seleccionar archivos",
        success: "¡Éxito! Archivo listo"
    },
    fr: {
        merge: "Fusionner",
        split: "Diviser",
        compress: "Compresser",
        image: "En Image",
        text: "En Texte",
        action: "Convertir maintenant",
        select: "Choisir des fichiers",
        success: "Succès! Fichier prêt"
    },
    de: {
        merge: "Zusammenfügen",
        split: "Teilen",
        compress: "Komprimieren",
        image: "Zu Bild",
        text: "Zu Text",
        action: "Jetzt konvertieren",
        select: "Dateien auswählen",
        success: "Erfolg! Datei bereit"
    },
    hi: {
        merge: "मर्ज करें",
        split: "विभाजित करें",
        compress: "कंप्रेस करें",
        image: "छवि में",
        text: "टेक्स्ट में",
        action: "अभी बदलें",
        select: "फ़ाइलें चुनें",
        success: "सफलता! फ़ाइल तैयार है"
    },
    ar: {
        merge: "دمج",
        split: "تقسيم",
        compress: "ضغط",
        image: "إلى صورة",
        text: "إلى نص",
        action: "تحويل الآن",
        select: "اختر الملفات",
        success: "نجاح! الملف جاهز"
    },
    pt: {
        merge: "Juntar",
        split: "Dividir",
        compress: "Compactar",
        image: "Para Imagem",
        text: "Para Texto",
        action: "Converter agora",
        select: "Selecionar arquivos",
        success: "Sucesso! Arquivo pronto"
    },
    ru: {
        merge: "Слияние",
        split: "Разделить",
        compress: "Сжать",
        image: "В Изображение",
        text: "В Текст",
        action: "Конвертировать",
        select: "Выбрать файлы",
        success: "Успех! Файл готов"
    },
    ja: {
        merge: "結合",
        split: "分割",
        compress: "圧縮",
        image: "画像へ",
        text: "テキストへ",
        action: "今すぐ変換",
        select: "ファイルを選択",
        success: "成功！準備完了"
    },
    zh: {
        merge: "合并",
        split: "拆分",
        compress: "压缩",
        image: "转为图像",
        text: "转为文本",
        action: "立即转换",
        select: "选择文件",
        success: "成功！文件已就绪"
    }
};
function HistovicMasterApp() {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('merge');
    const [pageRange, setPageRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1-2");
    const t = translations[lang];
    const processPDF = async ()=>{
        setProcessing(true);
        try {
            if (mode === 'image' || mode === 'text') {
                const pdfjsLib = await __turbopack_context__.A("[project]/node_modules/pdfjs-dist/legacy/build/pdf.mjs [app-client] (ecmascript, async loader)");
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
                const arrayBuffer = await files[0].arrayBuffer();
                const pdf = await pdfjsLib.getDocument({
                    data: arrayBuffer
                }).promise;
                if (mode === 'text') {
                    let textContent = "";
                    for(let i = 1; i <= pdf.numPages; i++){
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        textContent += content.items.map((item)=>item.str).join(" ") + "\n\n";
                    }
                    // FIX: Wrap text in array for Blob compatibility
                    downloadFile([
                        textContent
                    ], "text/plain", "Histovic_Text.txt");
                } else {
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({
                        scale: 2.0
                    });
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    if (ctx) {
                        await page.render({
                            canvasContext: ctx,
                            viewport
                        }).promise;
                        triggerDownload(canvas.toDataURL('image/jpeg'), "Histovic_HD.jpg");
                    }
                }
            } else {
                const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].create();
                const srcBuffer = await files[0].arrayBuffer();
                const src = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(srcBuffer);
                if (mode === 'merge') {
                    for (const file of files){
                        const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PDFDocument"].load(await file.arrayBuffer());
                        const pages = await pdfDoc.copyPages(doc, doc.getPageIndices());
                        pages.forEach((p)=>pdfDoc.addPage(p));
                    }
                } else if (mode === 'split') {
                    const indices = [];
                    pageRange.split(',').forEach((p)=>{
                        if (p.includes('-')) {
                            const [s, e] = p.split('-').map((n)=>parseInt(n.trim()) - 1);
                            for(let i = s; i <= e; i++)indices.push(i);
                        } else {
                            indices.push(parseInt(p.trim()) - 1);
                        }
                    });
                    const pages = await pdfDoc.copyPages(src, indices.filter((i)=>i >= 0 && i < src.getPageCount()));
                    pages.forEach((p)=>pdfDoc.addPage(p));
                } else {
                    const pages = await pdfDoc.copyPages(src, src.getPageIndices());
                    pages.forEach((p)=>pdfDoc.addPage(p));
                }
                const bytes = await pdfDoc.save({
                    useObjectStreams: true
                });
                // FIX: The specific Vercel Uint8Array error fix is here:
                downloadFile([
                    bytes.buffer
                ], "application/pdf", `Histovic_${mode}.pdf`);
            }
            setSuccess(true);
            setFiles([]);
        } catch (e) {
            console.error(e);
            alert("Error processing file. Ensure you have valid page ranges.");
        } finally{
            setProcessing(false);
        }
    };
    // FIX: Robust download logic for Vercel/TypeScript
    const downloadFile = (data, type, name)=>{
        const blob = new Blob(data, {
            type
        });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, name);
        setTimeout(()=>URL.revokeObjectURL(url), 100);
    };
    const triggerDownload = (url, name)=>{
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: shell,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: navbar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: logo,
                        children: [
                            "HISTOVIC ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#E11D48'
                                },
                                children: "PRO"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 119,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: lang,
                        onChange: (e)=>setLang(e.target.value),
                        style: langPicker,
                        children: Object.keys(translations).map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: l,
                                children: l.toUpperCase()
                            }, l, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 121,
                                columnNumber: 47
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: contentBody,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: navLinks,
                        children: [
                            'merge',
                            'split',
                            'compress',
                            'image',
                            'text'
                        ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setMode(m);
                                    setFiles([]);
                                    setSuccess(false);
                                },
                                style: mode === m ? activeTab : inactiveTab,
                                children: t[m].toUpperCase()
                            }, m, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: uploadCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: dropZone,
                                onClick: ()=>document.getElementById('fi')?.click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '50px',
                                            marginBottom: '10px'
                                        },
                                        children: processing ? '⚙️' : '📤'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: '#1E293B',
                                            margin: 0
                                        },
                                        children: files.length > 0 ? `${files.length} Selected` : t.select
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "fi",
                                        type: "file",
                                        hidden: true,
                                        multiple: mode === 'merge',
                                        accept: ".pdf",
                                        onChange: (e)=>setFiles(Array.from(e.target.files || []))
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            mode === 'split' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '15px',
                                    textAlign: 'left'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: '#64748B'
                                        },
                                        children: "Page Range (e.g. 1-3, 5):"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        style: input,
                                        value: pageRange,
                                        onChange: (e)=>setPageRange(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: processPDF,
                                disabled: processing,
                                style: primaryBtn,
                                children: processing ? '...' : t.action.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: successMsg,
                                children: [
                                    "✨ ",
                                    t.success
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 158,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: adSpace,
                        children: "HISTOVIC AD PLACEMENT"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(HistovicMasterApp, "3D5Ax6KS346FqWV6K6smRX39nBM=");
_c = HistovicMasterApp;
// --- FIXED STYLES (No shorthand conflicts) ---
const shell = {
    backgroundColor: '#FFFBF5',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
};
const navbar = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 40px',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#EEEEEE'
};
const logo = {
    fontSize: '20px',
    fontWeight: 900
};
const langPicker = {
    padding: '5px',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#DDDDDD'
};
const contentBody = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px'
};
const navLinks = {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px'
};
const inactiveTab = {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    color: '#64748B',
    cursor: 'pointer',
    fontWeight: 700,
    padding: '10px 15px',
    borderRadius: '10px'
};
const activeTab = {
    backgroundColor: '#E11D48',
    borderStyle: 'none',
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: 700,
    padding: '10px 15px',
    borderRadius: '10px'
};
const uploadCard = {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    padding: '30px',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
};
const dropZone = {
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderColor: '#CBD5E1',
    borderRadius: '20px',
    padding: '50px 20px',
    cursor: 'pointer',
    backgroundColor: '#F8FAFC'
};
const input = {
    width: '100%',
    marginTop: '5px',
    padding: '12px',
    borderRadius: '10px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#DDDDDD'
};
const primaryBtn = {
    marginTop: '20px',
    width: '100%',
    padding: '18px',
    backgroundColor: '#E11D48',
    color: '#FFFFFF',
    borderStyle: 'none',
    borderRadius: '15px',
    fontWeight: 800,
    cursor: 'pointer'
};
const successMsg = {
    marginTop: '15px',
    color: '#059669',
    fontWeight: 800
};
const adSpace = {
    marginTop: '40px',
    padding: '20px',
    color: '#CBD5E1',
    borderStyle: 'dashed',
    borderWidth: '1px',
    borderColor: '#CBD5E1',
    width: '300px',
    textAlign: 'center',
    fontSize: '10px'
};
var _c;
__turbopack_context__.k.register(_c, "HistovicMasterApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_page_tsx_dda9881a._.js.map