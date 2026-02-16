'use client';

import React, { useState, useEffect } from 'react';
import { AdMob, BannerAdPosition, BannerAdSize, BannerAdOptions, AdOptions } from '@capacitor-community/admob';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import { PDFDocument } from 'pdf-lib';

export default function HistovicPdfPro() {
  const [mode, setMode] = useState<'merge' | 'split' | 'compress' | 'image' | 'text'>('merge');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initAds = async () => {
      try {
        await AdMob.initialize();
        showBanner();
      } catch (e) {
        console.warn("AdMob safe-skip", e);
      }
    };
    initAds();
  }, []);

  const showBanner = async () => {
    try {
      const options: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544/6300978111', 
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 60,
        isTesting: true
      };
      await AdMob.showBanner(options);
    } catch (e) { console.log("Banner hidden"); }
  };

  const handleAction = async () => {
    try {
      setIsProcessing(true);
      const pickOptions: any = { types: ['application/pdf'], multiple: mode === 'merge', readData: true };
      const result = await FilePicker.pickFiles(pickOptions);
      
      if (!result.files || result.files.length === 0) return;

      if (mode === 'merge' && result.files.length > 1) {
        const mergedPdf = await PDFDocument.create();
        for (const file of result.files) {
          const donorPdf = await PDFDocument.load(file.data!);
          const pages = await mergedPdf.copyPages(donorPdf, donorPdf.getPageIndices());
          pages.forEach(page => mergedPdf.addPage(page));
        }
        const pdfBase64 = await mergedPdf.saveAsBase64();
        await Filesystem.writeFile({
          path: `Merged_${Date.now()}.pdf`,
          data: pdfBase64,
          directory: Directory.Documents
        });
        alert("Success! Merged file saved to Documents.");
      } else {
        const file = result.files[0];
        const tempPath = `preview_${Date.now()}.pdf`;
        await Filesystem.writeFile({ path: tempPath, data: file.data || "", directory: Directory.Cache });
        const uriResult = await Filesystem.getUri({ path: tempPath, directory: Directory.Cache });
        await FileOpener.open({ filePath: uriResult.uri, contentType: 'application/pdf' });
      }
    } catch (e) { console.error(e); } finally { setIsProcessing(false); }
  };

  return (
    <div style={container}>
      {/* NAVBAR FROM SCREENSHOT_66 */}
      <header style={navbar}>
        <div style={brandGroup}>
            <div style={logoIcon}>H</div>
            <div style={logoText}>HISTOVIC <span style={{color: '#E11D48'}}>PRO</span></div>
        </div>
        <div style={langBadge}>EN ▾</div>
      </header>

      <main style={mainContent}>
        {/* CENTERED HERO SECTION */}
        <div style={heroSection}>
            <h1 style={heroTitle}>{mode === 'image' ? 'TO IMAGE' : mode === 'text' ? 'TO TEXT' : mode.toUpperCase() + ' PDF'}</h1>
            <p style={heroSub}>The fastest local-first PDF tools for Histovic Studios.</p>
        </div>

        {/* TOOL TOGGLES FROM SCREENSHOT_66 */}
        <div style={toolToggleContainer}>
          {(['merge', 'split', 'compress', 'image', 'text'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} style={mode === m ? activeToggle : inactiveToggle}>
              {m === 'image' ? 'TO IMAGE' : m === 'text' ? 'TO TEXT' : m.toUpperCase()}
            </button>
          ))}
        </div>

        {/* THE CENTERED SELECTION BOX */}
        <div style={uploadWrapper}>
          <div style={dropZone} onClick={handleAction}>
            <div style={uploadIconCircle}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
            </div>
            <h2 style={uploadText}>{isProcessing ? 'Processing...' : 'Select Files'}</h2>
          </div>
        </div>
        <div style={{height: '100px'}}></div>
      </main>
    </div>
  );
}

// --- CSS REPLICATED FROM SCREENSHOT_66 ---
const container: React.CSSProperties = { backgroundColor: '#FFFBFA', minHeight: '100vh', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' };
const navbar: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', backgroundColor: '#FFF' };
const brandGroup: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px' };
const logoIcon: React.CSSProperties = { backgroundColor: '#0F172A', color: '#FFF', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px' };
const logoText: React.CSSProperties = { fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' };
const langBadge: React.CSSProperties = { fontSize: '11px', fontWeight: 700, border: '1px solid #EEE', padding: '4px 10px', borderRadius: '6px' };
const mainContent: React.CSSProperties = { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' };
const heroSection: React.CSSProperties = { textAlign: 'center', marginBottom: '35px' };
const heroTitle: React.CSSProperties = { fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900, color: '#0F172A', margin: '0 0 10px 0' };
const heroSub: React.CSSProperties = { fontSize: '14px', color: '#64748B', maxWidth: '300px' };
const toolToggleContainer: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px', justifyContent: 'center' };
const inactiveToggle: React.CSSProperties = { padding: '10px 18px', fontSize: '11px', fontWeight: 700, color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' };
const activeToggle: React.CSSProperties = { ...inactiveToggle, backgroundColor: '#E11D48', color: '#FFF', borderRadius: '20px' };
const uploadWrapper: React.CSSProperties = { width: '100%', maxWidth: '550px' };
const dropZone: React.CSSProperties = { backgroundColor: '#FFF', border: '2px dashed #CBD5E1', borderRadius: '24px', padding: '70px 20px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' };
const uploadIconCircle: React.CSSProperties = { backgroundColor: '#FFF1F2', padding: '15px', borderRadius: '50%', marginBottom: '15px', display: 'inline-block' };
const uploadText: React.CSSProperties = { fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: 0 };