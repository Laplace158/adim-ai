import React, { useState } from 'react';
import { Award, Github, ExternalLink, Copy, Check, FileText, Share2, Sparkles, BookOpen } from 'lucide-react';
import { Evidence, GoalCategory } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface EvidencePageProps {
  goalTitle: string;
  category: GoalCategory;
  evidences: Evidence[];
  masteryScorePercentage: number;
}

export const EvidencePage: React.FC<EvidencePageProps> = ({
  goalTitle,
  category,
  evidences,
  masteryScorePercentage
}) => {
  const [copiedCvTr, setCopiedCvTr] = useState(false);
  const [copiedCvEn, setCopiedCvEn] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [githubUrl, setGithubUrl] = useState('https://github.com/erkan/adim-ai-project');
  const [demoUrl, setDemoUrl] = useState('https://adim-ai.vercel.app');

  const cvBulletTr = `Next.js, TypeScript ve Supabase kullanarak kişiselleştirilmiş AI hedef planlama platformu (AdımAI) geliştirildi. Yapılandırılmış görev takibi, adaptif dinamik plan güncelleme ve portföy çıktı motoru inşa edildi.`;
  
  const cvBulletEn = `Developed and deployed a Turkish AI goal-planning platform using TypeScript, React, Supabase and Gemini API. Built structured plan generation, progress tracking, adaptive task scheduling and portfolio export features.`;

  const readmeTemplate = `# ${goalTitle}

## 🚀 Proje Hakkında
Bu proje, **AdımAI** kişisel hedef rehberi eşliğinde 7 günlük planlı çalışma ritmi ve adaptif görev takibi ile geliştirilmiştir.

## 🛠️ Kullanılan Teknolojiler
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend / Veritabanı**: Supabase PostgreSQL, Row Level Security (RLS)
- **AI Entegrasyonu**: Server-side Gemini API & Mock AI Fallback Layer

## 📊 Başarı Ölçütleri
- **Ustalık Skoru**: %${masteryScorePercentage}
- **Tamamlanan Görev Sayısı**: 7 / 7 Günlük Görevler
- **Canlı Demo**: [Demo Linki](${demoUrl})
`;

  const copyToClipboard = (text: string, type: 'tr' | 'en' | 'readme') => {
    navigator.clipboard.writeText(text);
    if (type === 'tr') {
      setCopiedCvTr(true);
      setTimeout(() => setCopiedCvTr(false), 2000);
    } else if (type === 'en') {
      setCopiedCvEn(true);
      setTimeout(() => setCopiedCvEn(false), 2000);
    } else {
      setCopiedReadme(true);
      setTimeout(() => setCopiedReadme(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge variant="emerald" className="px-3.5 py-1 text-sm">
          <Award className="w-4 h-4 text-emerald-600 mr-1.5" />
          Hedef Kanıtı & Portföy Kartı
        </Badge>
        <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#241E2B] tracking-tight">
          Başarınızı Kanıtlayın
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Tamamladığınız bu hedef için GitHub README şablonu, canlı bağlantılar ve CV özgeçmiş maddeleri.
        </p>
      </div>

      {/* Main Evidence Summary Banner */}
      <Card className="bg-slate-900 text-white space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Hedef Kanıt Kartı</span>
            <h3 className="text-xl font-bold text-white mt-1">{goalTitle}</h3>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Genel Ustalık Skoru</span>
            <span className="text-2xl font-black text-emerald-400">%{masteryScorePercentage}</span>
          </div>
        </div>

        {/* Links input box */}
        {category === 'coding_project' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                <Github className="w-4 h-4 text-slate-300" />
                GitHub Bağlantısı
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-slate-300" />
                Canlı Demo Bağlantısı
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </Card>

      {/* GitHub README Export Box */}
      {category === 'coding_project' && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-slate-900" />
              <h3 className="font-bold text-slate-900">Hazır GitHub README.md Şablonu</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(readmeTemplate, 'readme')}
            >
              {copiedReadme ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-emerald-600" />
                  Kopyalandı
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Kopyala
                </>
              )}
            </Button>
          </div>

          <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
            {readmeTemplate}
          </pre>
        </Card>
      )}

      {/* CV Bullets Box */}
      <Card className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900">Özgeçmiş (CV) Maddesi Çıktısı</h3>
          </div>
          <Badge variant="blue">İsteğe Bağlı CV Çıktısı</Badge>
        </div>

        <div className="space-y-4">
          {/* Turkish CV Bullet */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Türkçe CV Cümlesi</span>
              <button
                type="button"
                onClick={() => copyToClipboard(cvBulletTr, 'tr')}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                {copiedCvTr ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCvTr ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{cvBulletTr}</p>
          </div>

          {/* English CV Bullet */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">English Resume Bullet</span>
              <button
                type="button"
                onClick={() => copyToClipboard(cvBulletEn, 'en')}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                {copiedCvEn ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCvEn ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{cvBulletEn}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
