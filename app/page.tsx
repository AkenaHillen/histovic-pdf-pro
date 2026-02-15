'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function HistovicPdfPro() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState<'merge' | 'split' | 'compress' | 'image' | 'text'>('merge');
  const [pageRange, setPageRange] = useState("1-2");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(mode === 'merge' ? (prev) => [...prev, ...selected] : selected.slice(0, 1));
    setSuccess(false);
  };

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
          downloadFile(new Blob([text], { type: 'text/plain' }), "Histovic_Text.txt");
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
        const src = await PDFDocument.load(await files[0].arrayBuffer());
        
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
        downloadFile(new Blob([bytes], { type: 'application/pdf' }), `Histovic_${mode}.pdf`);
      }
      setSuccess(true);
      setFiles([]);
    } catch (e) {
      alert("Error: Check your page range or PDF file.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    triggerDownload(url, name);
    URL.revokeObjectURL(url);
  };

  const triggerDownload = (url: string, name: string) => {
    const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  };

  return (
    <div style={shell}>
      <header style={navbar}>
        <div style={logo}>HISTOVIC <span style={{color: '#E11D48'}}>PRO</span></div>
        <div style={navLinks}>
          {(['merge', 'split', 'compress', 'image', 'text'] as const).map(m => (
            <button 
              key={m} 
              onClick={() => {setMode(m); setFiles([]); setSuccess(false);}} 
              style={mode === m ? activeTab : tab}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div style={contentBody}>
        <h1 style={heroText}>{mode.toUpperCase()} PDF</h1>
        <p style={subHero}>The fastest local-first PDF tools for Histovic Studios.</p>

        <div style={uploadCard}>
          <div 
            style={dropZone} 
            onMouseOver={(e) => (e.currentTarget.style.borderColor = '#E11D48')}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = '#CBD5E1')}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div style={uploadIcon}>{processing ? '⚙️' : '📤'}</div>
            <h3 style={{margin: '10px 0', color: '#1E293B'}}>
              {files.length > 0 ? `${files.length} Files Selected` : 'Select PDF Files'}
            </h3>
            <p style={{color: '#64748B', fontSize: '14px'}}>Drag and drop your files here</p>
            <input id="file-input" type="file" hidden multiple={mode === 'merge'} onChange={handleFileChange} />
          </div>

          {mode === 'split' && (
            <div style={configArea}>
              <label style={label}>Extract Pages (e.g., 1-3, 5):</label>
              <input style={input} value={pageRange} onChange={(e) => setPageRange(e.target.value)} />
            </div>
          )}

          {files.length > 0 && (
            <button onClick={processPDF} disabled={processing} style={primaryBtn}>
              {processing ? 'ENGINE PROCESSING...' : `CONVERT NOW`}
            </button>
          )}

          {success && <div style={successMsg}>✨ Success! Your file is downloaded.</div>}
        </div>
      </div>
    </div>
  );
}

// --- RED & CREAM DESIGN SYSTEM ---
const shell: React.CSSProperties = {
  backgroundColor: '#FFFBF5', // Warm Cream
  minHeight: '100vh', 
  color: '#1E293B', 
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const navbar: React.CSSProperties = {
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  padding: '20px 60px', 
  backgroundColor: '#FFFFFF',
  borderBottom: '2px solid #F1F5F9'
};

const logo: React.CSSProperties = { fontSize: '24px', fontWeight: 900, letterSpacing: '1px' };

const navLinks: React.CSSProperties = { display: 'flex', gap: '8px' };

const tab: React.CSSProperties = { 
  background: 'transparent', // Fixed shorthand bug
  border: 'none', 
  color: '#64748B', 
  cursor: 'pointer', 
  fontWeight: 700, 
  fontSize: '12px', 
  padding: '10px 16px', 
  borderRadius: '12px',
  transition: 'all 0.2s ease'
};

const activeTab: React.CSSProperties = { 
  ...tab, 
  color: '#FFFFFF', 
  backgroundColor: '#E11D48' // Vibrant Red
};

const contentBody: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' };

const heroText: React.CSSProperties = { fontSize: '56px', fontWeight: 900, color: '#0F172A', margin: 0 };

const subHero: React.CSSProperties = { color: '#64748B', marginBottom: '40px', fontSize: '18px' };

const uploadCard: React.CSSProperties = {
  backgroundColor: '#FFFFFF', 
  borderRadius: '32px', 
  padding: '40px', 
  width: '100%', 
  maxWidth: '640px', 
  textAlign: 'center', 
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
  border: '1px solid #F1F5F9'
};

const dropZone: React.CSSProperties = {
  border: '3px dashed #CBD5E1', 
  borderRadius: '24px', 
  padding: '80px 20px', 
  cursor: 'pointer', 
  transition: 'all 0.3s ease', 
  backgroundColor: '#F8FAFC'
};

const uploadIcon: React.CSSProperties = { fontSize: '50px', marginBottom: '10px' };

const primaryBtn: React.CSSProperties = {
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

const configArea: React.CSSProperties = { marginTop: '24px', textAlign: 'left' };
const label: React.CSSProperties = { display: 'block', fontSize: '13px', color: '#475569', marginBottom: '8px', fontWeight: 700 };
const input: React.CSSProperties = { width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', color: '#1E293B', outline: 'none' };
const successMsg: React.CSSProperties = { marginTop: '20px', color: '#059669', fontWeight: 800 };