import React, { useState } from 'react';
import { Footprints, ArrowUpRight, Github, Calendar, Code2, ShieldCheck, Split, Calculator, RefreshCw, BadgeCheck, MonitorSmartphone, Server, BrainCircuit, ChartNoAxesCombined, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface PortfolioViewProps {
  onBackToApp: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onBackToApp }) => {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const features = [
    {
      icon: <Split className="w-5 h-5" />,
      title: "Büyük hedefi günlük bir sonraki adıma indirir.",
      text: "Kullanıcı “İngilizce öğrenmek istiyorum” dediğinde uygulama bunu ölçülebilir bir sonuca, süre aralığına ve bugün tamamlanabilecek tek bir göreve dönüştürür.",
      tags: ["Natural language input", "Micro tasks", "First-week plan"]
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: "Süreyi hisle değil, kapasiteyle hesaplar.",
      text: "Günlük dakika, haftalık devamlılık ve hedef kapsamı bir araya gelir. Sistem tek bir sihirli sayı yerine varsayımlı bir minimum ve maksimum aralık üretir.",
      tags: ["Duration engine", "Assumptions", "Range estimate"]
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Kullanıcı geride kalınca planı küçültür.",
      text: "“Zorlandım”, “vaktim yoktu” ve “çok kolaydı” check-in’leri planı bozmadan rotayı yeniden ayarlar. Kullanıcıyı suçlamaz, bir sonraki uygulanabilir adımı bulur.",
      tags: ["Adaptive check-in", "Fallback mode", "Progress state"]
    },
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      title: "İlerlemeyi bir hedef kanıtına dönüştürür.",
      text: "Proje bağlantısı, kelime ustalık raporu, mini test sonucu veya çalışma günlüğü. CV çıktısı isteğe bağlı, gerçek ilerleme her zaman görünür.",
      tags: ["Evidence", "Portfolio output", "Optional CV bullet"]
    }
  ];

  const handleCopyCV = async () => {
    const text = "Built and deployed AdımAI, an adaptive AI goal-planning PWA with Gemini integration, mathematical duration estimation, curated resources, Pomodoro focus mode and adaptive check-ins using React, TypeScript and Vite.";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#222129] font-sans antialiased">
      {/* Topbar */}
      <header className="sticky top-0 z-30 h-18 bg-[#FBF9F6]/90 backdrop-blur-md border-b border-stone-300/70 px-4 sm:px-8 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 cursor-pointer" onClick={onBackToApp}>
            <div className="w-8 h-8 rounded-lg bg-[#3B4274] text-white flex items-center justify-center shadow-sm">
              <Footprints className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base block font-extrabold leading-none">AdımAI</span>
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-widest block mt-0.5">Project Case Study</span>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <button onClick={onBackToApp} className="px-3.5 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors">
              Uygulamaya Dön
            </button>
            <a
              href="https://github.com/Laplace158/adim-ai"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#3B4274] hover:bg-[#2d335c] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              GitHub Reposu <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-20">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-4">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#C85A32]">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
              <span>Erkan Efe · Bağımsız Proje</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-serif font-normal text-slate-900 leading-[0.95] tracking-tight">
              Büyük hedefleri <em className="italic font-normal text-[#C85A32]">başlanabilir</em> hale getirdim.
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
              AdımAI, belirsiz hedefleri gerçekçi süre tahminlerine, günlük mikro görevlere ve ilerleme kanıtına dönüştüren adaptif bir AI rehberidir.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button size="lg" onClick={onBackToApp} className="bg-[#3B4274] hover:bg-[#2d335c] text-white font-bold text-sm shadow-md">
                Canlı Ürünü Dene <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
              <a
                href="https://github.com/Laplace158/adim-ai"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-stone-300 text-stone-800 text-sm font-bold hover:bg-stone-100 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> GitHub Reposu
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500 font-semibold pt-4 border-t border-stone-200">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#C85A32]" /> 2026 · v2.0 MVP</span>
              <span className="flex items-center gap-1.5"><Code2 className="w-4 h-4 text-[#C85A32]" /> React · TypeScript · Vite</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#C85A32]" /> Server-side Proxy</span>
            </div>
          </div>

          <aside className="lg:col-span-5 bg-[#3B4274] text-white rounded-3xl p-7 shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="text-[11px] font-bold tracking-widest text-stone-300 uppercase">PROJECT SNAPSHOT</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h2 className="text-3xl font-serif leading-tight">
              Chatbot değil. <br /><em className="italic text-amber-200 font-normal">Hedef sistemi.</em>
            </h2>

            <div className="space-y-3 pt-2 text-xs border-t border-white/10">
              <div className="flex justify-between items-center py-1">
                <span className="text-stone-300">Girdi</span>
                <strong className="font-bold text-white">Doğal Dil Hedefi</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-white/10">
                <span className="text-stone-300">Motor</span>
                <strong className="font-bold text-white">AI + Süre Algoritması</strong>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-white/10">
                <span className="text-stone-300">Çıktı</span>
                <strong className="font-bold text-white">Günlük Görev + Kanıt</strong>
              </div>
            </div>
          </aside>
        </section>

        {/* Feature Case Study */}
        <section className="space-y-8 pt-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">01 · ÜRÜN FİKRİ</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal text-slate-900">
              Bir hedefi yazmak kolay. Başlamak zor.
            </h2>
            <p className="text-stone-600 text-sm max-w-lg">
              AdımAI'nin odağı daha fazla özellik değil, kullanıcıyı bugünün tek doğru adımına ulaştırmak.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              {features.map((f, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeatureIdx(idx)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    activeFeatureIdx === idx
                      ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-md'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-2xl opacity-80">0{idx + 1}</span>
                    <div>
                      <strong className="block text-sm font-bold">{f.title.split(' ')[0]} {f.title.split(' ')[1]}</strong>
                      <span className="text-xs opacity-80 block">{f.tags[0]}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-[#3B4274] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-200">
                  {features[activeFeatureIdx].icon}
                </div>
                <h3 className="text-2xl font-bold text-white leading-snug">
                  {features[activeFeatureIdx].title}
                </h3>
                <p className="text-sm text-stone-200 leading-relaxed">
                  {features[activeFeatureIdx].text}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4">
                {features[activeFeatureIdx].tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 rounded-full border border-white/20 text-xs text-stone-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="bg-[#3B4274] text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">02 · SİSTEM TASARIMI</span>
            <h2 className="text-4xl font-serif text-white">AI içerik üretir. Ürün karar verir.</h2>
            <p className="text-stone-300 text-sm max-w-xl leading-relaxed">
              AdımAI'nin güçlü tarafı yalnızca Gemini çağırmak değil. Hedef analizi, matematiksel süre tahmini, LocalStorage durumu ve server-side güvenlik katmanı birlikte çalışır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <MonitorSmartphone className="w-5 h-5 text-emerald-300" />
              <strong className="text-sm block font-bold text-white">Client Browser / PWA</strong>
              <span className="text-xs text-stone-300 block">React 18 + Vite Arayüzü</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <Server className="w-5 h-5 text-emerald-300" />
              <strong className="text-sm block font-bold text-white">Vercel Serverless Proxy</strong>
              <span className="text-xs text-stone-300 block">Gizli API Anahtarı, Server Call</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <BrainCircuit className="w-5 h-5 text-emerald-300" />
              <strong className="text-sm block font-bold text-white">Gemini 3.6 Flash</strong>
              <span className="text-xs text-stone-300 block">Structured Goal & Task Output</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <ChartNoAxesCombined className="w-5 h-5 text-emerald-300" />
              <strong className="text-sm block font-bold text-white">Progress Engine</strong>
              <span className="text-xs text-stone-300 block">LocalStorage & Adaptive Rules</span>
            </div>
          </div>
        </section>

        {/* CV Copy Box */}
        <section className="bg-amber-100/70 border border-amber-300/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-lg">CV İçin Hazır İngilizce İfade</h3>
            <p className="text-xs sm:text-sm text-stone-700 font-mono">
              "Built and deployed AdımAI, an adaptive AI goal-planning PWA with Gemini integration, mathematical duration estimation, curated resources, Pomodoro focus mode and adaptive check-ins using React, TypeScript and Vite."
            </p>
          </div>
          <button
            onClick={handleCopyCV}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[#3B4274] hover:bg-[#2d335c] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Kopyalandı!' : 'Cümleyi Kopyala'}
          </button>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-8 px-4 sm:px-8 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Erkan Efe · AdımAI Case Study</span>
          <div className="flex items-center gap-4 font-semibold">
            <a href="https://github.com/Laplace158/adim-ai" target="_blank" rel="noreferrer" className="hover:text-stone-900">GitHub</a>
            <button onClick={onBackToApp} className="hover:text-stone-900">Canlı Demo</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
