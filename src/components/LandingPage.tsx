import React, { useState } from 'react';
import { 
  ArrowRight, ShieldAlert, Split, Calculator, RefreshCw, BadgeCheck, 
  Sparkles, CheckCircle2, Clock, Play, BookOpen, ChevronRight, Lock
} from 'lucide-react';
import { Button } from './ui/Button';
import { FocusTimerWidget } from './FocusTimer/FocusTimerWidget';
import { GoalCategory } from '../types';

interface LandingPageProps {
  onStartGoal: () => void;
  onStartGoalWithTemplate?: (title: string, category: GoalCategory, level: 'beginner' | 'intermediate' | 'advanced') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGoal, onStartGoalWithTemplate }) => {
  const [quickGoalInput, setQuickGoalInput] = useState('');
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  const problems = [
    {
      num: '01',
      problem: 'Büyük Hedefler Göz Korkutur',
      desc: 'Büyük hedefler nereden başlanacağını bilemeyince ertelenir.',
      solution: 'AdımAI hedefinizi günlük 15-30 dakikalık tek bir mikro adıma indirir. Bugün ne yapacağınızı netleştirir.'
    },
    {
      num: '02',
      problem: 'Chatbot Cevapları Sohbet İçinde Kaybolur',
      desc: 'ChatGPT uzun bir liste verir ancak takip etmez.',
      solution: 'Planınız sohbet penceresinde kalmaz; panonuzda canlı yaşar ve aksattığınızda adaptif olarak yenilenir.'
    },
    {
      num: '03',
      problem: 'Yapılacaklar Uygulamaları Fazla Planlama İster',
      desc: 'Form doldurmak ve kategori ayarlamak vakit kaybettirir.',
      solution: 'Hedefinizi doğal cümlenizle yazarsınız; yapay zeka saniyeler içinde rotayı çıkarır.'
    },
    {
      num: '04',
      problem: 'Kullanıcı Hangi Kaynağı Kullanacağını Bilemez',
      desc: 'İçerik denizinde doğru dokümanı ve videoyu bulmak zordur.',
      solution: 'Her görevin içine hedefe özel doğrulanmış YouTube videoları, dokümanlar ve forum özetleri eklenir.'
    }
  ];

  const features = [
    {
      title: 'Akıllı Hedef Bölümleme',
      subtitle: 'Büyük hedefi günlük bir sonraki adıma indirir',
      desc: 'Kullanıcı “İngilizce öğrenmek istiyorum” dediğinde uygulama bunu ölçülebilir bir sonuca, süre aralığına ve bugün tamamlanabilecek tek bir göreve dönüştürür.',
      tags: ['Doğal Dil Girdisi', 'Mikro Görevler', 'İlk Hafta Planı']
    },
    {
      title: 'Matematiksel Süre Hesabı',
      subtitle: 'Süreyi hisle değil, kapasiteyle hesaplar',
      desc: 'Günlük dakika, haftalık devamlılık ve hedef kapsamı bir araya gelir. Sistem tek bir sihirli sayı yerine varsayımlı bir minimum ve maksimum aralık üretir.',
      tags: ['Süre Motoru', 'Varsayımlar', 'Aralık Tahmini']
    },
    {
      title: 'Adaptif Plan Güncelleme',
      subtitle: 'Kullanıcı geride kalınca planı küçültür',
      desc: '“Zorlandım”, “vaktim yoktu” ve “çok kolaydı” check-in’leri planı bozmadan rotayı yeniden ayarlar. Kullanıcıyı suçlamaz, bir sonraki uygulanabilir adımı bulur.',
      tags: ['Adaptif Check-in', 'Fallback Modu', 'İlerleme Durumu']
    },
    {
      title: 'Hedef Kanıtı & İsteğe Bağlı CV Çıktısı',
      subtitle: 'İlerlemeyi somut bir kanıta dönüştürür',
      desc: 'Proje bağlantısı, kelime ustalık raporu, mini test sonucu veya çalışma günlüğü. CV çıktısı isteğe bağlı, gerçek ilerleme her zaman görünür.',
      tags: ['Kanıt Dosyası', 'Portföy Çıktısı', 'Özgeçmiş Maddesi']
    }
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickGoalInput.trim() && onStartGoalWithTemplate) {
      onStartGoalWithTemplate(quickGoalInput.trim(), 'coding_project', 'beginner');
    } else {
      onStartGoal();
    }
  };

  return (
    <div className="space-y-24 py-8 sm:py-12">
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center space-y-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/30 text-[#C85A32] text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
          <span>ADIMAI V2.0 CANLI</span>
          <span className="text-stone-400">•</span>
          <span>SOHBET PENCERELERİNDE UNUTULMAZ</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#241E2B] tracking-tight leading-[0.95]">
          Hedefini yaz.<br />
          <em className="italic font-normal text-[#C85A32]">Gerçekçi yolunu gör.</em>
        </h1>

        <p className="text-lg sm:text-xl text-[#766F82] max-w-2xl mx-auto leading-relaxed">
          AdımAI, büyük hedefleri gerçekçi sürelere, günlük mikro görevlere ve ölçülebilir ilerlemeye dönüştürür.
        </p>

        {/* Quick Goal Input Field */}
        <form onSubmit={handleQuickSubmit} className="max-w-xl mx-auto relative flex items-center">
          <input
            type="text"
            value={quickGoalInput}
            onChange={(e) => setQuickGoalInput(e.target.value)}
            placeholder="Örn: 2 ay sonra Japonya seyahatim var, seyahat Japoncası öğrenmek istiyorum..."
            className="w-full pl-5 pr-36 py-4 rounded-2xl border border-[#E5DFDA] bg-white text-sm text-[#241E2B] placeholder:text-[#766F82]/70 focus:outline-none focus:border-[#C85A32] focus:ring-2 focus:ring-[#C85A32]/20 shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#C85A32] hover:bg-[#E06438] transition-all flex items-center gap-1.5 shadow-sm"
          >
            Plan Oluştur <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#766F82]">
          <button onClick={onStartGoal} className="hover:text-[#C85A32] underline underline-offset-4">
            Ücretsiz planımı oluştur &rarr;
          </button>
          <span>•</span>
          <a href="#how-it-works" className="hover:text-[#C85A32]">
            Nasıl çalışır? ↓
          </a>
        </div>
      </section>

      {/* 2. PROBLEM AND SOLUTION (Numbered Rows with Typographic Hierarchy) */}
      <section className="max-w-5xl mx-auto px-4 space-y-10">
        <div className="space-y-2 border-b border-[#E5DFDA] pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">PROBLEM & ÇÖZÜM</span>
          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#241E2B]">
            Neden çoğu hedef yarım kalır?
          </h2>
          <p className="text-sm text-[#766F82]">
            Geleneksel yöntemlerin tıkanma noktaları ve AdımAI'nın getirdiği somut çözümler.
          </p>
        </div>

        <div className="space-y-6">
          {problems.map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl border border-[#E5DFDA] bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C85A32]/50 transition-colors">
              <div className="flex items-start gap-5">
                <span className="font-serif text-4xl font-normal text-[#C85A32] shrink-0 leading-none">{item.num}</span>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#241E2B]">{item.problem}</h3>
                  <p className="text-xs text-[#766F82]">{item.desc}</p>
                </div>
              </div>

              <div className="md:max-w-md bg-[#F6E7DF] p-4 rounded-xl border border-[#C85A32]/20 text-xs text-[#C85A32] font-medium leading-relaxed">
                <strong className="block text-[#C85A32] font-bold mb-0.5">ADIMAI ÇÖZÜMÜ:</strong>
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE 4-STEP FEATURE BREAKDOWN */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 space-y-10 pt-6">
        <div className="space-y-2 border-b border-[#E5DFDA] pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">4 AŞAMALI SİSTEM</span>
          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-[#241E2B]">
            AdımAI Nasıl Çalışır?
          </h2>
          <p className="text-sm text-[#766F82]">
            Etkileşimli özellikleri keşfetmek için sekmelere tıklayabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3" role="tablist">
            {features.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeatureIdx(idx)}
                role="tab"
                aria-selected={idx === activeFeatureIdx}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  idx === activeFeatureIdx
                    ? 'bg-[#1E2338] text-white border-[#1E2338] shadow-md'
                    : 'bg-white text-[#766F82] border-[#E5DFDA] hover:border-[#C85A32]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl leading-none">{`0${idx + 1}`}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </div>
                <strong className="block text-sm font-bold mt-2 text-inherit">{item.title}</strong>
                <small className="block text-xs opacity-75 mt-0.5">{item.subtitle}</small>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 bg-[#1E2338] text-white p-8 sm:p-10 rounded-2xl shadow-xl min-h-[300px] flex flex-col justify-between" role="tabpanel">
            <div>
              <span className="text-xs font-mono font-bold text-[#A4E8C2] uppercase tracking-wider block mb-2">
                AŞAMA 0{activeFeatureIdx + 1}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {features[activeFeatureIdx].title}
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {features[activeFeatureIdx].desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 mt-6">
              {features[activeFeatureIdx].tags.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full border border-white/20 text-xs text-slate-200">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. POMODORO FOCUS SPACE (Dark Indigo Dedicated Space) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-[#1E2338] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#C85A32] font-bold text-[11px] uppercase tracking-wider">
              CANLI ODAK ALANI
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-white">
              25 Dakikalık Derin Odak Modu
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Görevlerinize odaklanırken yağmur sesleri ve entegre Pomodoro zamanlayıcı ile dikkatinizi koruyun.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <FocusTimerWidget taskTitle="Örnek Odak Görevi: 25 Dakikalık Pratik Seansı" defaultMinutes={25} />
          </div>
        </div>
      </section>

      {/* 5. POPULAR GOAL TEMPLATES */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#241E2B]">Popüler Şablonlarla Başlayın</h2>
          <p className="text-xs text-[#766F82]">Tek tıkla hazır rotanızı ve eylem planınızı başlatabilirsiniz</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onStartGoalWithTemplate ? onStartGoalWithTemplate('Gitar Başlangıcı', 'coding_project', 'beginner') : onStartGoal()}
            className="p-5 rounded-2xl border border-[#E5DFDA] bg-white hover:border-[#C85A32] cursor-pointer transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold text-[#C85A32] bg-[#C85A32]/10 px-2 py-0.5 rounded-full inline-block">MÜZİK & DERS</span>
            <h4 className="font-bold text-sm text-[#241E2B] group-hover:text-[#C85A32] transition-colors">Gitar Başlangıcı</h4>
            <p className="text-[11px] text-[#766F82] line-clamp-2">1 Haftada Temel Akorlar, Ritim Kalıpları ve İlk Şarkı Çalma</p>
          </div>

          <div
            onClick={() => onStartGoalWithTemplate ? onStartGoalWithTemplate('Seyahat Japoncası', 'language_learning', 'beginner') : onStartGoal()}
            className="p-5 rounded-2xl border border-[#E5DFDA] bg-white hover:border-[#C85A32] cursor-pointer transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">DİL ÖĞRENİMİ</span>
            <h4 className="font-bold text-sm text-[#241E2B] group-hover:text-[#C85A32] transition-colors">Seyahat Japoncası</h4>
            <p className="text-[11px] text-[#766F82] line-clamp-2">Hiragana/Katakana Temeli ve Günlük Konuşma Cümleleri</p>
          </div>

          <div
            onClick={() => onStartGoalWithTemplate ? onStartGoalWithTemplate('React ve Tailwind Uygulaması', 'coding_project', 'intermediate') : onStartGoal()}
            className="p-5 rounded-2xl border border-[#E5DFDA] bg-white hover:border-[#C85A32] cursor-pointer transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">YAZILIM</span>
            <h4 className="font-bold text-sm text-[#241E2B] group-hover:text-[#C85A32] transition-colors">React & Tailwind App</h4>
            <p className="text-[11px] text-[#766F82] line-clamp-2">Sıfırdan Vite+React Uygulaması Geliştirip Vercel'de Yayınlama</p>
          </div>

          <div
            onClick={() => onStartGoalWithTemplate ? onStartGoalWithTemplate('YKS Sayısal Tekrar', 'exam_study', 'intermediate') : onStartGoal()}
            className="p-5 rounded-2xl border border-[#E5DFDA] bg-white hover:border-[#C85A32] cursor-pointer transition-all space-y-2 group"
          >
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block">SINAV HAZIRLIĞI</span>
            <h4 className="font-bold text-sm text-[#241E2B] group-hover:text-[#C85A32] transition-colors">YKS Sayısal Tekrar</h4>
            <p className="text-[11px] text-[#766F82] line-clamp-2">Biyoloji ve Matematik Konu Özetleri & Çıkmış Soru Analizleri</p>
          </div>
        </div>
      </section>

      {/* 6. SECURITY & MVP NOTICE */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-[#F6E7DF] border border-[#C85A32]/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#C85A32]">
          <Lock className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold block mb-0.5">Güvenlik & Mimari Bildirimi:</strong>
            API anahtarları istemci tarafında sızdırılmaz; tüm AI çağrıları Vercel Serverless proxy katmanı üzerinden gerçekleştirilir. AdımAI eğitim, yazılım ve dil hedeflerinde rehberlik sunar.
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="max-w-4xl mx-auto text-center space-y-6 px-4 pt-6">
        <h2 className="font-serif text-4xl sm:text-6xl text-[#241E2B]">
          İlk Adımınızı Bugün Atın
        </h2>
        <p className="text-sm sm:text-base text-[#766F82] max-w-xl mx-auto">
          İster yeni bir dil öğrenin, ister bir yazılım projesini bitirin. AdımAI rotanızı 2 dakika içinde çıkarır.
        </p>
        <button
          onClick={onStartGoal}
          className="min-h-12 px-8 rounded-xl font-extrabold text-base text-white bg-[#C85A32] hover:bg-[#E06438] transition-all shadow-lg hover:-translate-y-0.5"
        >
          Ücretsiz Planımı Oluştur &rarr;
        </button>
      </section>
    </div>
  );
};
