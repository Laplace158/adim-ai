import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Sparkles, ArrowRight, Code, Languages, GraduationCap, Calendar, Clock, BarChart3, ChevronLeft, ChevronRight, Play, ExternalLink, Flame, MessageSquareQuote, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { FocusTimerWidget } from './FocusTimer/FocusTimerWidget';

interface LandingPageProps {
  onStartGoal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGoal }) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const testimonials = [
    {
      quote: "Yıllar süren yanlış başlangıçlardan sonra nihayet React ve Tailwind'de ilk projemi tamamladım. Belirsiz bir 'React öğren' listesi yerine her gün ne yapacağımı söyleyen tek bir eyleme sahip olmak harikaydı.",
      author: "Erkan A.",
      role: "Kendi Kendini Yetiştirmiş Geliştirici",
      badge: "Yazılım Projesi • 42 Gün"
    },
    {
      quote: "Japonca Hiragana ve Katakana alfabesini öğrenirken hep pes ediyordum. AdımAI günlük 25 dakikalık odak seansları ve Tofugu linkleriyle 2 haftada seyahat cümlelerimi konuşmamı sağladı.",
      author: "Selin K.",
      role: "Tasarımcı & Gezgin",
      badge: "Dil Öğrenimi • 28 Gün"
    },
    {
      quote: "YKS Biyoloji ve Matematik çalışırken konu dağları arasında kayboluyordum. Süreç bittiğinde elime verilen somut kanıt listesi ve deneme analizleri netlerimi %35 artırdı.",
      author: "Mert Y.",
      role: "YKS Sayısal Öğrencisi",
      badge: "Sınav Hazırlığı • 60 Gün"
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx(prev => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-20 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 px-4">
        <div className="inline-flex items-center gap-2 p-1 pl-3 pr-3.5 rounded-full bg-[#C85A32]/10 border border-[#C85A32]/30 text-[#C85A32] text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
          <span>ADIMAI V2.0 CANLI</span>
          <span className="text-slate-400">•</span>
          <span className="font-semibold text-slate-700">HEDEFLER SOHBETLERDE UNUTULMAZ &rarr;</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Herhangi bir hedefi<br />
          <span className="font-serif italic font-normal text-[#C85A32]">1. Hafta eylem planına dönüştür.</span>
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Bir başka ucu açık yapılacaklar listesi veya yapay zeka makalesi değil — iki dakika içinde günlük odak adımları, zaman tahminleri ve hedefe özel kaynaklar.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={onStartGoal} className="w-full sm:w-auto shadow-xl font-extrabold text-base bg-[#C85A32] text-white hover:bg-[#B04A26] group">
            Ücretsiz Planımı Oluştur &rarr;
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-stone-500 pt-1">
          <span>KREDİ KARTI GEREKMEZ</span>
          <span>•</span>
          <span>SOHBET PENCERESİ DEĞİL</span>
          <span>•</span>
          <span>CANLI ADAPTİF TAKİP</span>
        </div>
      </section>

      {/* Why Most Goals Stall Section (FocusAI Inspired Dark Problem Grid) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#C85A32] font-bold text-[11px] uppercase tracking-wider">
              PROBLEM & ÇÖZÜM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Çoğu hedef neden <span className="font-serif italic font-normal text-[#C85A32]">başlamadan yarım kalır?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Öğrencileri, geliştiricileri ve kendi kendini yetiştirenleri yarı yolda bırakan 4 engel — ve AdımAI'nın her birini nasıl çözdüğü.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">ENGEL 1</span>
              <h3 className="font-bold text-base text-white">Büyük Hedefler Çok Büyüyüp Göz Korkutur</h3>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="text-[#C85A32] font-bold block">ADIMAI NASIL ÇÖZER:</span>
                <p>Hedefinizi günlük 15-30 dakikalık net mikro adımlara böleriz. Bugün yapacağınız tek bir adımı bilirsiniz.</p>
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">ENGEL 2</span>
              <h3 className="font-bold text-base text-white">ChatGPT Uzun Bir Liste Verir, Sonra Unutulur</h3>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="text-[#C85A32] font-bold block">ADIMAI NASIL ÇÖZER:</span>
                <p>Planınız sohbet penceresinde kalmaz. Panonuzda canlı yaşar; zorlandığınızda veya geri kaldığınızda adaptif olarak yenilenir.</p>
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">ENGEL 3</span>
              <h3 className="font-bold text-base text-white">Yapılacaklar Uygulamaları Planlamakla Vakit Harcatır</h3>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="text-[#C85A32] font-bold block">ADIMAI NASIL ÇÖZER:</span>
                <p>Karmaşık formlarla zaman kaybetmezsiniz. Hedefinizi kendi doğal cümlenizle yazarsınız, yapay zeka saniyeler içinde rotayı çıkarır.</p>
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">ENGEL 4</span>
              <h3 className="font-bold text-base text-white">Ne İzleyeceğinizi veya Okuyacağınızı Bilemezsiniz</h3>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="text-[#C85A32] font-bold block">ADIMAI NASIL ÇÖZER:</span>
                <p>Her görevin içinde doğrulanmış YouTube videoları, kaynak bağlantıları ve forum özetleri hazır olarak gelir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Grid (FocusAI Inspired) */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="terracotta" className="font-semibold">NASIL ÇALIŞIR?</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AdımAI İle <span className="font-serif italic font-normal text-[#C85A32]">İlerleme Ritimleri</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4 border-stone-200">
            <span className="text-xs font-mono font-bold text-[#C85A32] tracking-wider block">01 / AKILLI BÖLÜMLEME</span>
            <h3 className="text-xl font-bold text-slate-900">Otomatik Görev Dağılımı</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Herhangi bir hedef yazın veya hazır şablonlardan birini seçin — net süre tahminleri ve ilk gün adımıyla sıralı görev dizisi elde edin.
            </p>
          </Card>

          <Card className="space-y-4 border-stone-200">
            <span className="text-xs font-mono font-bold text-[#C85A32] tracking-wider block">02 / GERÇEKÇİ SÜRE MOTORU</span>
            <h3 className="text-xl font-bold text-slate-900">Matematiksel Gün Hesabı</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Süre uydurmak yok. Günde ayırabileceğiniz dakika ve haftalık devamlılığınıza göre matematiksel minimum ve maksimum gün hesaplanır.
            </p>
          </Card>

          <Card className="space-y-4 border-stone-200">
            <span className="text-xs font-mono font-bold text-[#C85A32] tracking-wider block">03 / ADAPTİF YENİDEN DÜZENLEME</span>
            <h3 className="text-xl font-bold text-slate-900">Takılma ve Temposuzluk Tespiti</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Birkaç gün aksattığınızda veya zorlandığınızda yapay zeka planı sıfırlamaz; adımları basitleştirip ritminizi korumanızı sağlar.
            </p>
          </Card>

          <Card className="space-y-4 border-stone-200">
            <span className="text-xs font-mono font-bold text-[#C85A32] tracking-wider block">04 / DOĞRULANMIŞ KAYNAKLAR</span>
            <h3 className="text-xl font-bold text-slate-900">Hedefe Özel Video ve İçerik</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Gitar için Ultimate Guitar, yazılım için MDN/Patika, dil için Duolingo/Tofugu gibi konunuza %100 özel doğrulanmış kaynaklar.
            </p>
          </Card>
        </div>

        {/* Live Focus Timer Showcase Widget */}
        <div className="pt-4 max-w-xl mx-auto">
          <FocusTimerWidget taskTitle="Örnek Görev: 25 Dakikalık Odak Seansı" defaultMinutes={25} />
        </div>
      </section>

      {/* Testimonials Carousel (FocusAI Inspired - Image 4) */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="space-y-2">
          <Badge variant="indigo" className="font-semibold">KULLANICI DENEYİMLERİ</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            İnsanlar aslında <span className="font-serif italic font-normal text-[#C85A32]">işleri bitirmek ister.</span>
          </h2>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6 relative max-w-2xl mx-auto">
          <Badge variant="terracotta" className="text-xs">{testimonials[activeTestimonialIdx].badge}</Badge>
          
          <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed font-serif">
            "{testimonials[activeTestimonialIdx].quote}"
          </p>

          <div className="pt-2 border-t border-slate-800">
            <span className="font-bold text-white text-sm block">{testimonials[activeTestimonialIdx].author}</span>
            <span className="text-xs text-slate-400">{testimonials[activeTestimonialIdx].role}</span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrevTestimonial}
              className="p-2 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title="Önceki Deneyim"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeTestimonialIdx ? 'bg-[#C85A32] w-5' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextTestimonial}
              className="p-2 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              title="Sonraki Deneyim"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Ready-to-use Popular Templates Quick Picker */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Popüler Şablonlarla Hemen Başlayın</h2>
          <p className="text-xs text-stone-600">Tek tıkla hazır rotanızı oluşturabilirsiniz</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card hoverable onClick={onStartGoal} className="space-y-2 border-stone-200 text-left group">
            <span className="text-[10px] font-bold text-[#C85A32] bg-[#C85A32]/10 px-2 py-0.5 rounded-full inline-block">MÜZİK & DERS</span>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#C85A32] transition-colors">Gitar Başlangıcı</h4>
            <p className="text-[11px] text-stone-500 line-clamp-2">1 Haftada Temel Akorlar, Ritim Kalıpları ve İlk Şarkı Çalma</p>
          </Card>

          <Card hoverable onClick={onStartGoal} className="space-y-2 border-stone-200 text-left group">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">DİL ÖĞRENİMİ</span>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#C85A32] transition-colors">Seyahat Japoncası</h4>
            <p className="text-[11px] text-stone-500 line-clamp-2">Hiragana/Katakana Temeli ve Günlük Konuşma Cümleleri</p>
          </Card>

          <Card hoverable onClick={onStartGoal} className="space-y-2 border-stone-200 text-left group">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">YAZILIM</span>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#C85A32] transition-colors">React & Tailwind App</h4>
            <p className="text-[11px] text-stone-500 line-clamp-2">Sıfırdan Vite+React Uygulaması Geliştirip Vercel'de Yayınlama</p>
          </Card>

          <Card hoverable onClick={onStartGoal} className="space-y-2 border-stone-200 text-left group">
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block">SINAV HAZIRLIĞI</span>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#C85A32] transition-colors">YKS Sayısal Tekrar</h4>
            <p className="text-[11px] text-stone-500 line-clamp-2">Biyoloji ve Matematik Konu Özetleri & Çıkmış Soru Analizleri</p>
          </Card>
        </div>
      </section>

      {/* Safety Notice Disclaimer */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Önemli Güvenlik Bildirimi:</span> AdımAI yalnızca eğitim, yazılım ve dil hedeflerinde rehberlik sunar. Tıbbi, hukuki, finansal veya psikolojik konularda tavsiye verilmez.
          </div>
        </div>
      </section>
    </div>
  );
};

