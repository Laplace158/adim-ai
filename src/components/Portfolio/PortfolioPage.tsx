import React, { useState } from 'react';
import { 
  Footprints, ArrowUpRight, Github, CalendarDays, Code2, ShieldCheck, 
  Split, Calculator, RefreshCw, BadgeCheck, MonitorSmartphone, Server, 
  BrainCircuit, ChartNoAxesCombined, Copy, Mail, Check
} from 'lucide-react';

interface PortfolioPageProps {
  onOpenApp: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onOpenApp }) => {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const features = [
    {
      icon: Split,
      title: 'Büyük hedefi günlük bir sonraki adıma indirir.',
      text: 'Kullanıcı “İngilizce öğrenmek istiyorum” dediğinde uygulama bunu ölçülebilir bir sonuca, süre aralığına ve bugün tamamlanabilecek tek bir göreve dönüştürür.',
      tags: ['Natural language input', 'Micro tasks', 'First-week plan']
    },
    {
      icon: Calculator,
      title: 'Süreyi hisle değil, kapasiteyle hesaplar.',
      text: 'Günlük dakika, haftalık devamlılık ve hedef kapsamı bir araya gelir. Sistem tek bir sihirli sayı yerine varsayımlı bir minimum ve maksimum aralık üretir.',
      tags: ['Duration engine', 'Assumptions', 'Range estimate']
    },
    {
      icon: RefreshCw,
      title: 'Kullanıcı geride kalınca planı küçültür.',
      text: '“Zorlandım”, “vaktim yoktu” ve “çok kolaydı” check-in’leri planı bozmadan rotayı yeniden ayarlar. Kullanıcıyı suçlamaz, bir sonraki uygulanabilir adımı bulur.',
      tags: ['Adaptive check-in', 'Fallback mode', 'Progress state']
    },
    {
      icon: BadgeCheck,
      title: 'İlerlemeyi bir hedef kanıtına dönüştürür.',
      text: 'Proje bağlantısı, kelime ustalık raporu, mini test sonucu veya çalışma günlüğü. CV çıktısı isteğe bağlı, gerçek ilerleme her zaman görünür.',
      tags: ['Evidence', 'Portfolio output', 'Optional CV bullet']
    }
  ];

  const cvBulletText = "Built and deployed AdımAI, an adaptive AI goal-planning PWA with Gemini integration, mathematical duration estimation, curated resources, Pomodoro focus mode and adaptive check-ins using React, TypeScript and Vite.";

  const handleCopyCv = async () => {
    try {
      await navigator.clipboard.writeText(cvBulletText);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2600);
    } catch {
      // Fallback
      const area = document.createElement('textarea');
      area.value = cvBulletText;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2600);
    }
  };

  const ActiveIcon = features[activeFeatureIdx].icon;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#241E2B] font-sans">
      {/* Portfolio Top Bar Navigation */}
      <header className="sticky top-0 z-30 h-18 border-b border-[#E5DFDA]/70 bg-[#F9F8F6]/90 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <a href="#top" className="inline-flex items-center gap-2.5 font-bold tracking-tight text-slate-900">
            <span className="w-8 h-8 rounded-xl bg-[#1E2338] text-[#F9F8F6] flex items-center justify-center shadow-inner">
              <Footprints className="w-4 h-4" />
            </span>
            <span className="text-base font-bold">
              AdımAI <small className="block text-[11px] font-semibold text-[#766F82] tracking-wider uppercase">Project case study</small>
            </span>
          </a>

          <nav className="flex items-center gap-2">
            <a href="#story" className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#766F82] hover:text-[#241E2B] hover:bg-[#F3F0EC] transition-all">Hikâye</a>
            <a href="#system" className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#766F82] hover:text-[#241E2B] hover:bg-[#F3F0EC] transition-all">Sistem</a>
            <a href="#build" className="px-3.5 py-2 rounded-lg text-sm font-semibold text-[#766F82] hover:text-[#241E2B] hover:bg-[#F3F0EC] transition-all">Süreç</a>
            <button 
              onClick={onOpenApp}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-bold text-[#F9F8F6] bg-[#C85A32] hover:bg-[#E06438] transition-all flex items-center gap-1.5 shadow-sm hover:-translate-y-0.5"
            >
              Canlı demoyu aç <ArrowUpRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C85A32]">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
              Erkan Efe · bağımsız proje
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.92] tracking-tight text-[#241E2B]">
              Büyük hedefleri <em className="italic font-normal text-[#C85A32]">başlanabilir</em> hale getirdim.
            </h1>

            <p className="text-lg sm:text-xl text-[#766F82] leading-relaxed max-w-2xl">
              AdımAI, belirsiz hedefleri gerçekçi süre tahminlerine, günlük mikro görevlere ve ilerleme kanıtına dönüştüren adaptif bir AI rehberidir.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button 
                onClick={onOpenApp}
                className="min-h-12 px-5 rounded-xl font-bold text-sm text-[#F9F8F6] bg-[#1E2338] hover:bg-[#272E49] transition-all flex items-center gap-2 shadow-md hover:-translate-y-0.5"
              >
                Canlı ürünü dene <ArrowUpRight className="w-4.5 h-4.5" />
              </button>
              <a 
                href="https://github.com/Laplace158/adim-ai" 
                target="_blank" 
                rel="noreferrer"
                className="min-h-12 px-5 rounded-xl font-bold text-sm text-[#241E2B] border border-[#E5DFDA] hover:bg-white transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                GitHub reposu <Github className="w-4.5 h-4.5" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-[#766F82] pt-4 font-semibold">
              <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4 text-[#C85A32]" /> 2026 · v2.0 MVP</span>
              <span className="flex items-center gap-1.5"><Code2 className="w-4 h-4 text-[#C85A32]" /> React · TypeScript · Vite</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#C85A32]" /> Server-side proxy</span>
            </div>
          </div>

          <aside className="lg:col-span-5 bg-[#1E2338] text-[#F9F8F6] p-8 rounded-2xl shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-[#F9F8F6]/20 pb-4">
              <span className="text-xs font-bold tracking-widest text-[#A4E8C2] uppercase">Project snapshot</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#A4E8C2] animate-pulse" title="Canlı" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl leading-none tracking-tight text-[#F9F8F6]">
              Chatbot değil. <em className="italic text-[#F6E7DF]">Hedef sistemi.</em>
            </h2>

            <div className="space-y-3 pt-2 text-sm border-t border-[#F9F8F6]/15">
              <div className="flex justify-between py-1">
                <span className="text-[#766F82]">Girdi</span>
                <strong className="text-white font-semibold">Doğal dil hedefi</strong>
              </div>
              <div className="flex justify-between py-1 border-t border-[#F9F8F6]/10">
                <span className="text-[#766F82]">Motor</span>
                <strong className="text-white font-semibold">AI + süre algoritması</strong>
              </div>
              <div className="flex justify-between py-1 border-t border-[#F9F8F6]/10">
                <span className="text-[#766F82]">Çıktı</span>
                <strong className="text-white font-semibold">Günlük görev + kanıt</strong>
              </div>
            </div>
          </aside>
        </section>

        {/* Story Section - Feature Rail */}
        <section id="story" className="space-y-8 pt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFDA] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">01 · Ürün fikri</span>
              <h2 className="font-serif text-4xl sm:text-6xl tracking-tight text-[#241E2B] mt-1">
                Bir hedefi yazmak kolay. Başlamak zor.
              </h2>
            </div>
            <p className="text-sm text-[#766F82] max-w-md">
              AdımAI'nin odağı daha fazla özellik değil, kullanıcıyı bugünün tek doğru adımına ulaştırmak.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              {features.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeatureIdx(idx)}
                  className={`w-full p-4 sm:p-5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    idx === activeFeatureIdx
                      ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-md translate-x-1'
                      : 'bg-transparent text-[#766F82] border-[#E5DFDA] hover:bg-white hover:text-[#241E2B]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-2xl font-normal leading-none">{`0${idx + 1}`}</span>
                    <div>
                      <strong className="block text-sm font-bold text-inherit">{item.title.split(' ')[0]} {item.title.split(' ')[1]}</strong>
                      <small className="block text-xs opacity-80 mt-0.5">{item.tags[0]}</small>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 opacity-70" />
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-[#1E2338] text-[#F9F8F6] p-8 sm:p-10 rounded-2xl shadow-xl min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-[#F6E7DF] mb-6">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                  {features[activeFeatureIdx].title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
                  {features[activeFeatureIdx].text}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-8">
                {features[activeFeatureIdx].tags.map((t, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 rounded-full border border-white/20 text-xs text-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture Section (Dark Band) */}
        <section id="system" className="bg-[#1E2338] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A4E8C2]">02 · Sistem tasarımı</span>
              <h2 className="font-serif text-4xl sm:text-6xl tracking-tight text-white">
                AI içerik üretir. Ürün karar verir.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                AdımAI'nin güçlü tarafı yalnızca Gemini çağırmak değil. Hedef analizi, matematiksel süre tahmini, LocalStorage durumu ve server-side güvenlik katmanı birlikte çalışır.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-slate-200">React 18</span>
                <span className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-slate-200">TypeScript</span>
                <span className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-slate-200">Vite</span>
                <span className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-slate-200">Vercel Functions</span>
                <span className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-slate-200">Gemini Flash</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#181C2E] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="p-4 rounded-xl border border-white/15 bg-[#272E49] flex items-center justify-between">
                <div>
                  <strong className="block text-sm text-white">Client browser / PWA</strong>
                  <small className="text-xs text-slate-400">React + Vite arayüzü</small>
                </div>
                <MonitorSmartphone className="w-5 h-5 text-[#A4E8C2]" />
              </div>

              <div className="p-4 rounded-xl border border-white/15 bg-[#272E49] flex items-center justify-between">
                <div>
                  <strong className="block text-sm text-white">Vercel Serverless Proxy</strong>
                  <small className="text-xs text-slate-400">Gizli API anahtarı, server-side çağrı</small>
                </div>
                <Server className="w-5 h-5 text-[#A4E8C2]" />
              </div>

              <div className="p-4 rounded-xl border border-white/15 bg-[#272E49] flex items-center justify-between">
                <div>
                  <strong className="block text-sm text-white">Gemini Flash Engine</strong>
                  <small className="text-xs text-slate-400">Structured goal & task JSON output</small>
                </div>
                <BrainCircuit className="w-5 h-5 text-[#A4E8C2]" />
              </div>

              <div className="p-4 rounded-xl border border-white/15 bg-[#272E49] flex items-center justify-between">
                <div>
                  <strong className="block text-sm text-white">Progress engine</strong>
                  <small className="text-xs text-slate-400">LocalStorage, adaptive check-in, fallback</small>
                </div>
                <ChartNoAxesCombined className="w-5 h-5 text-[#A4E8C2]" />
              </div>
            </div>
          </div>
        </section>

        {/* Build Timeline Section */}
        <section id="build" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFDA] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">03 · İnşa süreci</span>
              <h2 className="font-serif text-4xl sm:text-6xl tracking-tight text-[#241E2B] mt-1">
                Fikri ürüne çevirirken öğrendiklerim.
              </h2>
            </div>
            <p className="text-sm text-[#766F82] max-w-md">
              Bu proje, AI ile kod üretmekten çok, AI çıktısını güvenilir bir ürüne bağlama egzersiziydi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-6 rounded-2xl border border-[#E5DFDA] bg-white space-y-3">
              <span className="font-serif text-4xl text-[#C85A32] block">01</span>
              <h3 className="font-bold text-base text-[#241E2B]">Problemi daralttım</h3>
              <p className="text-xs text-[#766F82] leading-relaxed">“Her hedef” iddiasını, ilk sürümde öğrenme, kodlama ve sınav rotalarına indirdim.</p>
            </div>

            <div className="p-6 rounded-2xl border border-[#E5DFDA] bg-white space-y-3">
              <span className="font-serif text-4xl text-[#C85A32] block">02</span>
              <h3 className="font-bold text-base text-[#241E2B]">Akışı tasarladım</h3>
              <p className="text-xs text-[#766F82] leading-relaxed">Hedef, tanı testi, plan, günlük görev ve check-in zincirini tek deneyimde birleştirdim.</p>
            </div>

            <div className="p-6 rounded-2xl border border-[#E5DFDA] bg-white space-y-3">
              <span className="font-serif text-4xl text-[#C85A32] block">03</span>
              <h3 className="font-bold text-base text-[#241E2B]">Güvenliği düzelttim</h3>
              <p className="text-xs text-[#766F82] leading-relaxed">API anahtarını frontend bundle'dan çıkarıp Vercel serverless proxy katmanına taşıdım.</p>
            </div>

            <div className="p-6 rounded-2xl border border-[#E5DFDA] bg-white space-y-3">
              <span className="font-serif text-4xl text-[#C85A32] block">04</span>
              <h3 className="font-bold text-base text-[#241E2B]">Sınırlamayı belgeledim</h3>
              <p className="text-xs text-[#766F82] leading-relaxed">LocalStorage tabanlı MVP yapısını, Supabase entegrasyonu için hazır mimariyle açıkça anlattım.</p>
            </div>
          </div>
        </section>

        {/* Copyable CV Section */}
        <section className="bg-[#F6E7DF] border border-[#C85A32]/30 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-[#C85A32]">CV İçin Hazır İfade</h3>
            <p className="text-sm text-[#C85A32] font-medium max-w-2xl leading-relaxed">
              {cvBulletText}
            </p>
          </div>

          <button
            onClick={handleCopyCv}
            className="px-5 py-3 rounded-xl font-bold text-sm text-white bg-[#1E2338] hover:bg-[#272E49] transition-all shrink-0 flex items-center gap-2 shadow-md hover:-translate-y-0.5"
          >
            <Copy className="w-4 h-4" /> Cümleyi Kopyala
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5DFDA] py-8 px-6 text-xs text-[#766F82] bg-white mt-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Erkan Efe · AdımAI case study</span>
          <div className="flex items-center gap-6 font-semibold">
            <a href="https://github.com/Laplace158/adim-ai" target="_blank" rel="noreferrer" className="hover:text-[#C85A32]">GitHub</a>
            <button onClick={onOpenApp} className="hover:text-[#C85A32]">Live demo</button>
            <a href="mailto:sorryelvator@gmail.com" className="hover:text-[#C85A32] flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> İletişim</a>
          </div>
        </div>
      </footer>

      {/* Copy Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E2338] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#A4E8C2]" /> CV cümlesi panoya kopyalandı.
        </div>
      )}
    </div>
  );
};
