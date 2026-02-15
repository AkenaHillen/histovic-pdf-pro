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

export default function HistovicMasterApp() {
  const [lang, setLang] = useState('en');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<'merge' | 'split' | 'compress' | 'image' | 'text'>('merge');
  const [pageRange, setPageRange] = useState("1-2");

  const t = translations[lang];

  const processPDF = async () => {
    setProcessing(true);
    try {
      if (mode === 'image' || mode === 'text') {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        if (mode === 'text') {
          let textContent = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            textContent += content.items.map((item: any) => (item as any).str).join(" ") + "\n\n";
          }
          // FIX: Wrap text in array for Blob compatibility
          downloadFile([textContent], "text/plain", "Histovic_Text.txt");
        } else {
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.height = viewport.height; canvas.width = viewport.width;
          if (ctx) {
            await page.render({ canvasContext: ctx, viewport }).promise;
            triggerDownload(canvas.toDataURL('image/jpeg'), "Histovic_HD.jpg");
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
          pageRange.split(',').forEach(p => {
            if (p.includes('-')) {
              const [s, e] = p.split('-').map(n => parseInt(n.trim()) - 1);
              for (let i = s; i <= e; i++) indices.push(i);
            } else { indices.push(parseInt(p.trim()) - 1); }
          });
          const pages = await pdfDoc.copyPages(src, indices.filter(i => i >= 0 && i < src.getPageCount()));
          pages.forEach(p => pdfDoc.addPage(p));
        } else {
          const pages = await pdfDoc.copyPages(src, src.getPageIndices());
          pages.forEach(p => pdfDoc.addPage(p));
        }
        const bytes = await pdfDoc.save({ useObjectStreams: true });
        // FIX: The specific Vercel Uint8Array error fix is here:
        downloadFile([bytes.buffer], "application/pdf", `Histovic_${mode}.pdf`);
      }
      
      setSuccess(true);
      setFiles([]);
    } catch (e) {
      console.error(e);
      alert("Error processing file. Ensure you have valid page ranges.");
    } finally {
      setProcessing(false);
    }
  };

  // FIX: Robust download logic for Vercel/TypeScript
  const downloadFile = (data: any[], type: string, name: string) => {
    const blob = new Blob(data, { type });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, name);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const triggerDownload = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={shell}>
      <header style={navbar}>
        <div style={logo}>HISTOVIC <span style={{color: '#E11D48'}}>PRO</span></div>
        <select value={lang} onChange={(e) => setLang(e.target.value)} style={langPicker}>
          {Object.keys(translations).map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
        </select>
      </header>

      <div style={contentBody}>
        <div style={navLinks}>
          {(['merge', 'split', 'compress', 'image', 'text'] as const).map(m => (
            <button 
              key={m} 
              onClick={() => {setMode(m); setFiles([]); setSuccess(false);}} 
              style={mode === m ? activeTab : inactiveTab}
            >
              {t[m].toUpperCase()}
            </button>
          ))}
        </div>

        <div style={uploadCard}>
          <div style={dropZone} onClick={() => document.getElementById('fi')?.click()}>
            <div style={{fontSize: '50px', marginBottom: '10px'}}>{processing ? '⚙️' : '📤'}</div>
            <h3 style={{color: '#1E293B', margin: 0}}>{files.length > 0 ? `${files.length} Selected` : t.select}</h3>
            <input id="fi" type="file" hidden multiple={mode === 'merge'} accept=".pdf" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          </div>

          {mode === 'split' && (
            <div style={{marginTop: '15px', textAlign: 'left'}}>
              <label style={{fontSize: '12px', fontWeight: 'bold', color: '#64748B'}}>Page Range (e.g. 1-3, 5):</label>
              <input style={input} value={pageRange} onChange={(e) => setPageRange(e.target.value)} />
            </div>
          )}

          {files.length > 0 && (
            <button onClick={processPDF} disabled={processing} style={primaryBtn}>
              {processing ? '...' : t.action.toUpperCase()}
            </button>
          )}

          {success && <div style={successMsg}>✨ {t.success}</div>}
        </div>
        <div style={adSpace}>HISTOVIC AD PLACEMENT</div>
      </div>
    </div>
  );
}

// --- FIXED STYLES (No shorthand conflicts) ---
const shell: React.CSSProperties = { backgroundColor: '#FFFBF5', minHeight: '100vh', fontFamily: 'sans-serif' };
const navbar: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '20px 40px', backgroundColor: '#FFFFFF', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: '#EEEEEE' };
const logo: React.CSSProperties = { fontSize: '20px', fontWeight: 900 };
const langPicker: React.CSSProperties = { padding: '5px', borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#DDDDDD' };
const contentBody: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' };
const navLinks: React.CSSProperties = { display: 'flex', gap: '8px', marginBottom: '20px' };
const inactiveTab: React.CSSProperties = { backgroundColor: 'transparent', borderStyle: 'none', color: '#64748B', cursor: 'pointer', fontWeight: 700, padding: '10px 15px', borderRadius: '10px' };
const activeTab: React.CSSProperties = { backgroundColor: '#E11D48', borderStyle: 'none', color: '#FFFFFF', cursor: 'pointer', fontWeight: 700, padding: '10px 15px', borderRadius: '10px' };
const uploadCard: React.CSSProperties = { backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '30px', width: '90%', maxWidth: '500px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' };
const dropZone: React.CSSProperties = { borderStyle: 'dashed', borderWidth: '2px', borderColor: '#CBD5E1', borderRadius: '20px', padding: '50px 20px', cursor: 'pointer', backgroundColor: '#F8FAFC' };
const input: React.CSSProperties = { width: '100%', marginTop: '5px', padding: '12px', borderRadius: '10px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#DDDDDD' };
const primaryBtn: React.CSSProperties = { marginTop: '20px', width: '100%', padding: '18px', backgroundColor: '#E11D48', color: '#FFFFFF', borderStyle: 'none', borderRadius: '15px', fontWeight: 800, cursor: 'pointer' };
const successMsg: React.CSSProperties = { marginTop: '15px', color: '#059669', fontWeight: 800 };
const adSpace: React.CSSProperties = { marginTop: '40px', padding: '20px', color: '#CBD5E1', borderStyle: 'dashed', borderWidth: '1px', borderColor: '#CBD5E1', width: '300px', textAlign: 'center', fontSize: '10px' };