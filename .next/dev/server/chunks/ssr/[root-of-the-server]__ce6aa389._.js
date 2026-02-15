module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HistovicPdfPro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pdf-lib/es/api/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function HistovicPdfPro() {
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('merge');
    const [pageRange, setPageRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1-2");
    const handleFileChange = (e)=>{
        const selected = Array.from(e.target.files || []);
        setFiles(mode === 'merge' ? (prev)=>[
                ...prev,
                ...selected
            ] : selected.slice(0, 1));
        setSuccess(false);
    };
    const processPDF = async ()=>{
        setProcessing(true);
        setSuccess(false);
        try {
            if (mode === 'image' || mode === 'text') {
                const pdfjsLib = await __turbopack_context__.A("[project]/node_modules/pdfjs-dist/legacy/build/pdf.mjs [app-ssr] (ecmascript, async loader)");
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
                const arrayBuffer = await files[0].arrayBuffer();
                const pdf = await pdfjsLib.getDocument({
                    data: arrayBuffer
                }).promise;
                if (mode === 'text') {
                    let text = "";
                    for(let i = 1; i <= pdf.numPages; i++){
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        text += content.items.map((item)=>item.str).join(" ") + "\n\n";
                    }
                    downloadFile(new Blob([
                        text
                    ], {
                        type: 'text/plain'
                    }), "Histovic_Text.txt");
                } else {
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({
                        scale: 3.0
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
                        triggerDownload(canvas.toDataURL('image/jpeg', 1.0), "Histovic_HD.jpg");
                    }
                }
            } else {
                const pdfDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFDocument"].create();
                const src = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFDocument"].load(await files[0].arrayBuffer());
                if (mode === 'merge') {
                    for (const file of files){
                        const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdf$2d$lib$2f$es$2f$api$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFDocument"].load(await file.arrayBuffer());
                        const pages = await pdfDoc.copyPages(doc, doc.getPageIndices());
                        pages.forEach((p)=>pdfDoc.addPage(p));
                    }
                } else if (mode === 'split') {
                    const indices = [];
                    pageRange.split(',').forEach((part)=>{
                        if (part.includes('-')) {
                            const [start, end] = part.split('-').map((n)=>parseInt(n.trim()) - 1);
                            for(let i = start; i <= end; i++)indices.push(i);
                        } else {
                            indices.push(parseInt(part.trim()) - 1);
                        }
                    });
                    const pages = await pdfDoc.copyPages(src, indices.filter((n)=>n >= 0 && n < src.getPageCount()));
                    pages.forEach((p)=>pdfDoc.addPage(p));
                } else {
                    const pages = await pdfDoc.copyPages(src, src.getPageIndices());
                    pages.forEach((p)=>pdfDoc.addPage(p));
                }
                const bytes = await pdfDoc.save({
                    useObjectStreams: true
                });
                downloadFile(new Blob([
                    bytes
                ], {
                    type: 'application/pdf'
                }), `Histovic_${mode}.pdf`);
            }
            setSuccess(true);
            setFiles([]);
        } catch (e) {
            alert("Error: Check your page range or PDF file.");
        } finally{
            setProcessing(false);
        }
    };
    const downloadFile = (blob, name)=>{
        const url = URL.createObjectURL(blob);
        triggerDownload(url, name);
        URL.revokeObjectURL(url);
    };
    const triggerDownload = (url, name)=>{
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: shell,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: navbar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: logo,
                        children: [
                            "HISTOVIC ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#E11D48'
                                },
                                children: "PRO"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 100,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: navLinks,
                        children: [
                            'merge',
                            'split',
                            'compress',
                            'image',
                            'text'
                        ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setMode(m);
                                    setFiles([]);
                                    setSuccess(false);
                                },
                                style: mode === m ? activeTab : tab,
                                children: m.toUpperCase()
                            }, m, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: contentBody,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: heroText,
                        children: [
                            mode.toUpperCase(),
                            " PDF"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: subHero,
                        children: "The fastest local-first PDF tools for Histovic Studios."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: uploadCard,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: dropZone,
                                onMouseOver: (e)=>e.currentTarget.style.borderColor = '#E11D48',
                                onMouseOut: (e)=>e.currentTarget.style.borderColor = '#CBD5E1',
                                onClick: ()=>document.getElementById('file-input')?.click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: uploadIcon,
                                        children: processing ? '⚙️' : '📤'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            margin: '10px 0',
                                            color: '#1E293B'
                                        },
                                        children: files.length > 0 ? `${files.length} Files Selected` : 'Select PDF Files'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#64748B',
                                            fontSize: '14px'
                                        },
                                        children: "Drag and drop your files here"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "file-input",
                                        type: "file",
                                        hidden: true,
                                        multiple: mode === 'merge',
                                        onChange: handleFileChange
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            mode === 'split' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: configArea,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: label,
                                        children: "Extract Pages (e.g., 1-3, 5):"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        style: input,
                                        value: pageRange,
                                        onChange: (e)=>setPageRange(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            files.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: processPDF,
                                disabled: processing,
                                style: primaryBtn,
                                children: processing ? 'ENGINE PROCESSING...' : `CONVERT NOW`
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this),
                            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: successMsg,
                                children: "✨ Success! Your file is downloaded."
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 146,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
// --- RED & CREAM DESIGN SYSTEM ---
const shell = {
    backgroundColor: '#FFFBF5',
    minHeight: '100vh',
    color: '#1E293B',
    fontFamily: 'system-ui, -apple-system, sans-serif'
};
const navbar = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 60px',
    backgroundColor: '#FFFFFF',
    borderBottom: '2px solid #F1F5F9'
};
const logo = {
    fontSize: '24px',
    fontWeight: 900,
    letterSpacing: '1px'
};
const navLinks = {
    display: 'flex',
    gap: '8px'
};
const tab = {
    background: 'transparent',
    border: 'none',
    color: '#64748B',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '12px',
    padding: '10px 16px',
    borderRadius: '12px',
    transition: 'all 0.2s ease'
};
const activeTab = {
    ...tab,
    color: '#FFFFFF',
    backgroundColor: '#E11D48' // Vibrant Red
};
const contentBody = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '60px'
};
const heroText = {
    fontSize: '56px',
    fontWeight: 900,
    color: '#0F172A',
    margin: 0
};
const subHero = {
    color: '#64748B',
    marginBottom: '40px',
    fontSize: '18px'
};
const uploadCard = {
    backgroundColor: '#FFFFFF',
    borderRadius: '32px',
    padding: '40px',
    width: '100%',
    maxWidth: '640px',
    textAlign: 'center',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
    border: '1px solid #F1F5F9'
};
const dropZone = {
    border: '3px dashed #CBD5E1',
    borderRadius: '24px',
    padding: '80px 20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#F8FAFC'
};
const uploadIcon = {
    fontSize: '50px',
    marginBottom: '10px'
};
const primaryBtn = {
    marginTop: '32px',
    width: '100%',
    padding: '22px',
    backgroundColor: '#E11D48',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '18px',
    fontWeight: 800,
    fontSize: '18px',
    cursor: 'pointer',
    boxShadow: '0 10px 15px -3px rgba(225, 29, 72, 0.3)',
    transition: 'transform 0.1s active'
};
const configArea = {
    marginTop: '24px',
    textAlign: 'left'
};
const label = {
    display: 'block',
    fontSize: '13px',
    color: '#475569',
    marginBottom: '8px',
    fontWeight: 700
};
const input = {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    backgroundColor: '#F1F5F9',
    border: '1px solid #E2E8F0',
    color: '#1E293B',
    outline: 'none'
};
const successMsg = {
    marginTop: '20px',
    color: '#059669',
    fontWeight: 800
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ce6aa389._.js.map