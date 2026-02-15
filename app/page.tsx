'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

// 🌍 10-Language Dictionary
const translations: any = {
  en: { merge: "Merge", split: "Split", compress: "Compress", image: "To Image", text: "To Text", action: "Convert Now", select: "Select Files", success: "Success! File Ready" },
  es: { merge: "Combinar", split: "Dividir", compress: "Comprimir", image: "A Imagen", text: "A Texto", action: "Convertir ahora", select: "Seleccionar archivos", success: "¡Éxito! Archivo listo" },
  fr: { merge: "Fusionner", split: "Diviser", compress: "Compresser", image: "En Image", text: "En Texte", action: "Convertir maintenant", select: "Choisir des fichiers", success: "Succès! Fichier prêt" },
  de: { merge: "Zusammenfügen", split: "Teilen", compress: "Komprimieren", image: "Zu Bild", text: "Zu Text", action: "Jetzt konvertieren", select: "Dateien auswählen", success: "Erfolg! Datei bereit" },
  hi: { merge: "मर्ज करें", split: "विभाजित करें", compress: "कंप्रेस करें", image: "छवि में", text: "टेक्स्ट में", action: "अभी बदलें", select: "फ़ाइलें चुनें", success: "सफलता! फ़ाइल तैयार है" },
  ar: { merge: "دمج", split: "تقسيم", compress: "ضغط", image: "إلى صورة", text: "إلى نص", action: "تحويل الآن", select: "اختر الملفات", success: "نجاح! الملف جاهز" },
  pt: { merge: "Juntar", split: "Dividir", compress: "Compactar", image: "Para Imagem", text: "Para Texto", action: "Converter agora", select: "Selecionar arquivos", success: "Sucesso! Arquivo pronto" },
  ru: { merge: "Слияние", split: "Разделить", compress: "Сжать", image: "В Изображение", text: "В Текст", action: "Конвертировать", select: "Выбрать файлы", success: "Успех! Файл готов" },
  ja: { merge: "結合", split: "分割", compress: "圧縮", image: "画像へ", text: "テキストへ", action: "今すぐ変換", select: "ファイルを選択", success: "成功！準備完了" },
  zh: { merge: "合并", split: "拆分", compress: "压缩", image: "转为图像", text: "转为文本", action: "立即转换", select: "选择文件", success: "成功！文件已就绪" }
};

export default function HistovicPdfPro() {
  const [lang, setLang] = useState('en');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<'merge' | 'split' | 'compress' | 'image' | 'text'>('merge');
  const [pageRange, setPageRange] = useState("1-2");

  const t = translations[lang];

  const processPDF = async () => {
    setProcessing(true);
    setSuccess(false);
    try {
      if (mode === 'image' || mode === 'text') {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        if (mode === 'text') {
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(" ") + "\n\n";
          }
          downloadFile([text], "text/plain", "Histovic_Text.txt");
        } else {
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 3.0 });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.height = viewport.height; canvas.width = viewport.width;
          if (ctx) {
            await page.render({ canvasContext: ctx, viewport }).promise;
            triggerDownload(canvas.toDataURL('image/jpeg', 1.0), "Histovic_HD.jpg");
          }
        }
      } else {
        const pdfDoc = await PDFDocument.create();
        const srcBuffer = await files[0].arrayBuffer();
        const src = await PDFDocument.load(srcBuffer);
        
        if (mode === 'merge') {
          for (const file of files) {
            const doc = await PDFDocument.load(await file.arrayBuffer());
            const pages = await pdfDoc.copyPages(doc, doc.getPageIndices());
            pages.forEach(p => pdfDoc.addPage(p));
          }
        } else if (mode === 'split') {
          const indices: number[] = [];
          pageRange.split(',').forEach(part => {
            if (part.includes('-')) {
              const [start, end] = part.split('-').map(n => parseInt(n.trim()) - 1);
              for (let i = start; i <= end; i++) indices.push(i);
            } else {
              indices.push(parseInt(part.trim()) - 1);
            }
          });
          const pages = await pdfDoc.copyPages(src, indices.filter(n => n >= 0 && n < src.getPageCount()));
          pages.forEach(p => pdfDoc.addPage(p));
        } else {
          const pages = await pdfDoc.copyPages(src, src.getPageIndices());
          pages.forEach(p => pdfDoc.addPage(p));
        }

        const bytes = await pdfDoc.save({ useObjectStreams: true });
        downloadFile([bytes.buffer], "application/pdf", `Histovic_${mode}.pdf`);
      }
      setSuccess(true);
      setFiles([]);
    } catch (e) {
      alert("Error: Check your page range or PDF file.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = (data: any[], type: string, name: string) => {
    const blob = new Blob(data, { type });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, name);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const triggerDownload = (url: string, name: string) => {
    const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  };

  return (
    <div style={shell}>
      <header style={navbar}>
        <div style={logo}>HISTOVIC <span style={{color: '#E11D48'}}>PRO</span></div>
        <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={langPicker}>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
            <option value="hi">HI</option>
            <option value="ar">AR</option>
            <option value="pt">PT</option>
            <option value="ru">RU</option>
            <option value="ja">JA</option>
            <option value="zh">ZH</option>
          </select>
        </div>
      </header>

      <div style={contentBody}>
        <h1 style={heroText}>{mode.toUpperCase()} PDF</h1>
        <p style={subHero}>The fastest local-first PDF tools for Histovic Studios.</p>

        <div style={navLinks}>
          {(['merge', 'split', 'compress', 'image', 'text'] as const).map(m => (
            <button key={m} onClick={() => {setMode(m); setFiles([]); setSuccess(false);}} style={mode === m ? activeTab : tab}>
              {t[m].toUpperCase()}
            </button>
          ))}
        </div>

        <div style={uploadCard}>
          <div style={dropZone} onClick={() => document.getElementById('file-input')?.click()}>
            <div style={uploadIcon}>{processing ? '⚙️' : '📤'}</div>
            <h3 style={{margin: '10px 0', color: '#1E293B'}}>
              {files.length > 0 ? `${files.length} Files Selected` : t.select}
            </h3>
            <input id="file-input" type="file" hidden multiple={mode === 'merge'} onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          </div>

          {mode === 'split' && (
            <div style={configArea}>
              <label style={label}>Extract Pages (e.g., 1-3, 5):</label>
              <input style={input} value={pageRange} onChange={(e) => setPageRange(e.target.value)} />
            </div>
          )}

          {files.length > 0 && (
            <button onClick={processPDF} disabled={processing} style={primaryBtn}>
              {processing ? 'ENGINE PROCESSING...' : t.action.toUpperCase()}
            </button>
          )}

          {success && <div style={successMsg}>✨ {t.success}</div>}
        </div>

        <div style={adDivider}></div>
        <div style={adSpace}>
          <p style={{fontSize: '10px', color: '#CBD5E1', marginBottom: '5px'}}>SPONSORED CONTENT</p>
          <div style={adPlaceholder}>ADVERTISEMENT PLACEMENT</div>
        </div>
      </div>
    </div>
  );
}

// --- RESTORED ORIGINAL STYLES ---
const shell: React.CSSProperties = { backgroundColor: '#FFFBF5', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif' };
const navbar: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', backgroundColor: '#FFFFFF', borderBottom: '2px solid #F1F5F9' };
const logo: React.CSSProperties = { fontSize: '24px', fontWeight: 900, letterSpacing: '1px' };
const langPicker: React.CSSProperties = { padding: '8px', borderRadius: '10px', border: '1px solid #E2E8F0', fontWeight: 'bold', cursor: 'pointer' };
const contentBody: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px', paddingBottom: '60px' };
const heroText: React.CSSProperties = { fontSize: '56px', fontWeight: 900, color: '#0F172A', margin: 0 };
const subHero: React.CSSProperties = { color: '#64748B', marginBottom: '40px', fontSize: '18px' };
const navLinks: React.CSSProperties = { display: 'flex', gap: '8px', marginBottom: '30px' };
const tab: React.CSSProperties = { background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', fontWeight: 700, fontSize: '12px', padding: '10px 16px', borderRadius: '12px' };
const activeTab: React.CSSProperties = { ...tab, color: '#FFFFFF', backgroundColor: '#E11D48' };
const uploadCard: React.CSSProperties = { backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '40px', width: '100%', maxWidth: '640px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #F1F5F9' };
const dropZone: React.CSSProperties = { border: '3px dashed #CBD5E1', borderRadius: '24px', padding: '80px 20px', cursor: 'pointer', backgroundColor: '#F8FAFC' };
const uploadIcon: React.CSSProperties = { fontSize: '50px', marginBottom: '10px' };
const primaryBtn: React.CSSProperties = { marginTop: '32px', width: '100%', padding: '22px', backgroundColor: '#E11D48', color: '#FFFFFF', border: 'none', borderRadius: '18px', fontWeight: 800, fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(225, 29, 72, 0.3)' };
const configArea: React.CSSProperties = { marginTop: '24px', textAlign: 'left' };
const label: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 700 };
const input: React.CSSProperties = { width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', color: '#1E293B', outline: 'none' };
const successMsg: React.CSSProperties = { marginTop: '20px', color: '#059669', fontWeight: 800 };
const adDivider: React.CSSProperties = { width: '100px', height: '2px', backgroundColor: '#F1F5F9', margin: '60px 0 20px 0' };
const adSpace: React.CSSProperties = { textAlign: 'center' };
const adPlaceholder: React.CSSProperties = { width: '320px', height: '100px', backgroundColor: '#FFFFFF', border: '1px dashed #E2E8F0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1', fontSize: '12px' };