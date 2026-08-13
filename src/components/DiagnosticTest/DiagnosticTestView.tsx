import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ArrowRight, BrainCircuit } from 'lucide-react';
import { DiagnosticTest } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface DiagnosticTestViewProps {
  test: DiagnosticTest;
  onCompleteTest: (score: number, topicScores: Record<string, number>) => void;
}

export const DiagnosticTestView: React.FC<DiagnosticTestViewProps> = ({
  test,
  onCompleteTest
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{ score: number; topicScores: Record<string, number> } | null>(null);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    const topicScores: Record<string, number> = {};

    test.questions.forEach(q => {
      const userAns = selectedAnswers[q.id];
      const isCorrect = userAns === q.correctOptionIndex;
      if (isCorrect) correctCount++;
      topicScores[q.topic] = isCorrect ? 100 : 40;
    });

    const finalScore = Math.round((correctCount / test.questions.length) * 100);
    const result = { score: finalScore, topicScores };
    setScoreResult(result);
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    if (scoreResult) {
      onCompleteTest(scoreResult.score, scoreResult.topicScores);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="terracotta" className="font-semibold">
          <BrainCircuit className="w-3.5 h-3.5 mr-1 text-[#C85A32]" />
          Seviye ve Tanı Testi
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Başlangıç Seviyenizi Ölçelim
        </h2>
        <p className="text-sm text-slate-600">
          Planı size mükemmel uyarlamak için {test.questions.length} kısa tanı sorusunu yanıtlayın.
        </p>
      </div>

      <Card className="border-stone-200 shadow-sm space-y-6">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {test.questions.map((q, qIdx) => (
              <div key={q.id} className="space-y-3 pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C85A32] bg-[#C85A32]/10 px-2.5 py-0.5 rounded-full border border-[#C85A32]/20">
                    Soru {qIdx + 1} / {test.questions.length} • {q.topic}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{q.question}</h4>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#C85A32] bg-[#C85A32]/10 text-slate-900 font-bold ring-2 ring-[#C85A32]'
                            : 'border-stone-200 bg-white text-slate-700 hover:bg-stone-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C85A32]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                size="lg"
                disabled={Object.keys(selectedAnswers).length < test.questions.length}
                className="w-full sm:w-auto font-bold bg-[#C85A32] text-white hover:bg-[#b04b27]"
              >
                Testi Tamamla ve Sonucu Gör
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-extrabold">
              %{scoreResult?.score}
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Tanı Testi Değerlendirildi!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {scoreResult && scoreResult.score >= 70
                  ? 'Tebrikler! Güçlü bir temel seviyeye sahipsiniz. Görevlerinizi bu ritme göre hazırlıyoruz.'
                  : 'Harika bir başlangıç! Temel eksikleri kapatmak için görevlerinizi adım adım mikro adımlarla başlatıyoruz.'}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-2 max-w-md mx-auto text-xs">
              <span className="font-bold text-slate-800 block">Konu Başarı Dağılımı:</span>
              {scoreResult && Object.entries(scoreResult.topicScores).map(([topic, sc]) => (
                <div key={topic} className="flex justify-between items-center text-slate-600">
                  <span>{topic}</span>
                  <span className="font-semibold text-slate-900">%{sc}</span>
                </div>
              ))}
            </div>

            <div>
              <Button size="lg" onClick={handleFinish} className="w-full sm:w-auto">
                Kişiselleştirilmiş Planımı Aç
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
