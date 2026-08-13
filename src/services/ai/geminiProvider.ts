import { AIProvider } from './types';
import { 
  GoalAnalysisResult, 
  GoalCategory, 
  GoalInput, 
  DiagnosticTest, 
  Plan, 
  CheckinDifficulty, 
  PlanTask, 
  Evidence 
} from '../../types';
import { mockAIProvider } from './mockProvider';
import { calculateTimeline } from '../../utils/timelineCalculator';

// Default Gemini API Key from environment variable or localStorage
let lastGenerationSource: 'gemini' | 'mock' = 'mock';
export function getLastGenerationSource() { return lastGenerationSource; }

export class GeminiAIProvider implements AIProvider {
  private getApiKey(): string {
    const customKey = localStorage.getItem('adimai_gemini_api_key');
    if (customKey && customKey.trim().length > 10) return customKey.trim();
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  // Working models prioritized by live availability
  private availableModels = [
    'gemini-3.6-flash',
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'gemini-2.5-pro'
  ];

  private buildGoalPrompt(input: GoalInput): string {
    return `Sen "AdımAI" adında uzman bir Türkçe kişisel hedef rehberisin.
GÖREVİN: Kullanıcının girdiği hedef cümlesini GERÇEK BİR AKILLI CHATBOT VE UZMAN KOÇ GİBİ analiz edip kişiselleştirilmiş 7 günlük uygulama planı oluşturmak.

KULLANICININ TAM HEDEF CÜMLESİ:
"${input.title}"

KULLANICI BİLGİLERİ:
- Kategori: ${input.category === 'language_learning' ? 'Dil Öğrenimi' : input.category === 'coding_project' ? 'Yazılım / Kodlama Projesi' : 'Sınav / Ders Çalışma'}
- Seçilen Seviye: ${input.currentLevel}
- Günlük Süre: ${input.dailyMinutes} dakika
- Haftalık Çalışma: ${input.daysPerWeek} gün
- İstenen Çıktı: "${input.desiredOutcome || input.title}"
- Sadece Ücretsiz Kaynaklar: ${input.preferFreeResources ? 'Evet' : 'Hayır'}

ÖNEMLİ DEĞERLENDİRME VE ADAPTASYON KURALLARI:
1. CÜMLE ANALİZİ: Kullanıcı cümlesini harfiyen incele!
   - Eğer cümle belirsizse (örn: "dil öğrenmek istiyorum ama hangi dil bilmiyorum", "yazılım öğrenmek istiyorum" vb.):
     "isOriginalGoalRealistic": false işaretle.
     "explanation": Chatbot gibi kullanıcıya empati kurarak yol göster. Dil seçimi/teknoloji seçimi konusunda kılavuzluk yapacağını belirt.
     "alternativeGoal": Kullanıcının belirsizliğini netleştiren somut bir başlık yaz (örn: "7 Günde Dil Seçimi ve Temel İngilizce Başlangıcı").
     GÖREVLER: 1. Gün dil/teknoloji seçimi ve hedef analizi, 2. Gün temel selamlaşma/kurulum, 3. Gün en sık kullanılan yapılardan başlamalı.
   - Eğer cümle spesifikse (örn: "Python ile pandas veri analizi botu", "Almanca A2 konuşma", "YKS Biyoloji Sistemler"):
     Görevleri TAMAMEN ve SADECE bu spesifik konunun adım adım pratik uygulamalarına ayır. Jenerik şablon KULLANMA.
2. SEVİYE UYUMU: Kullanıcı "${input.currentLevel}" seviyesindedir. Görev zorluklarını bu seviyeye göre ölçekle.
3. HER GÜN İÇİN ÜCRETSİZ TÜRKÇE/GLOBAL KAYNAK URL'Sİ ÖNER (BTK Akademi, YouTube, MDN, Khan Academy, Duolingo, Python.org vb.).
4. Yanıtın SADECE geçerli JSON olmalı. Markdown kod bloğu veya açıklama EKLEME.

JSON ŞEMASI:
{
  "goalSummary": "Kullanıcının hedefine özel kısa Türkçe başlık",
  "category": "${input.category}",
  "realisticAssessment": {
    "isOriginalGoalRealistic": true veya false,
    "explanation": "Detaylı ve yardımsever Türkçe değerlendirme açıklaması",
    "alternativeGoal": "Netleştirilmiş veya doğrulanmış hedef cümlesi"
  },
  "assumptions": ["Varsayım 1", "Varsayım 2", "Varsayım 3"],
  "milestones": [
    {"day": 1, "title": "Kilometre Taşı 1", "successCriteria": "Başarı kriteri 1"},
    {"day": 3, "title": "Kilometre Taşı 2", "successCriteria": "Başarı kriteri 2"},
    {"day": 7, "title": "Kilometre Taşı 3", "successCriteria": "Başarı kriteri 3"}
  ],
  "tasks": [
    {
      "dayNumber": 1,
      "title": "1. Gün Spesifik Görev Başlığı",
      "description": "2-3 cümlelik detaylı, pratik ve kullanıcının cümlesine ÖZEL görev açıklaması.",
      "taskType": "learning_and_practice",
      "durationMinutes": ${input.dailyMinutes},
      "difficulty": 1,
      "successCriteria": "1. Gün somut tamamlanma kriteri",
      "freeResourceUrl": "https://www.btkakademi.gov.tr"
    }
  ],
  "finalEvidence": ["Hedef sonunda oluşacak somut kanıt 1", "Kanıt 2"]
}`;
  }

  async analyzeGoal(input: GoalInput): Promise<GoalAnalysisResult> {
    const apiKey = this.getApiKey();

    if (!apiKey || apiKey.length < 5) {
      console.warn('[GeminiAI] API Key tanımlı değil, Akıllı Mock Provider kullanılıyor.');
      lastGenerationSource = 'mock';
      return mockAIProvider.analyzeGoal(input);
    }

    const prompt = this.buildGoalPrompt(input);

    for (const model of this.availableModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        console.log(`[GeminiAI] ${model} modeli çağrılıyor...`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.4,
              maxOutputTokens: 4096
            }
          })
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errText = await response.text();
          console.warn(`[GeminiAI] ${model} HTTP ${response.status}: ${errText.substring(0, 150)}`);
          continue;
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) continue;

        let jsonText = rawText.trim();
        if (jsonText.startsWith('```json')) {
          jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonText.startsWith('```')) {
          jsonText = jsonText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        const parsed = JSON.parse(jsonText);
        const calcTimeline = calculateTimeline(input);

        const result: GoalAnalysisResult = {
          goalSummary: parsed.goalSummary || input.title,
          category: input.category,
          realisticAssessment: {
            isOriginalGoalRealistic: parsed.realisticAssessment?.isOriginalGoalRealistic ?? true,
            explanation: parsed.realisticAssessment?.explanation || calcTimeline.explanation,
            alternativeGoal: parsed.realisticAssessment?.alternativeGoal || input.title,
            minDays: calcTimeline.minDays,
            maxDays: calcTimeline.maxDays,
            confidence: calcTimeline.confidence,
            consistencyFactor: calcTimeline.consistencyFactor,
            requiredTotalMinutes: calcTimeline.requiredTotalMinutes
          },
          assumptions: parsed.assumptions || [
            `Mevcut Seviye: ${input.currentLevel}`,
            `Günde ${input.dailyMinutes} dakika odaklı çalışma`,
            `Haftada ${input.daysPerWeek} gün disiplinli pratik`
          ],
          milestones: parsed.milestones || [],
          tasks: (parsed.tasks || []).map((t: any, idx: number) => ({
            id: `task-ai-${Date.now()}-${idx + 1}`,
            dayNumber: idx + 1,
            title: t.title || `Gün ${idx + 1} Görevi`,
            description: t.description || '',
            taskType: (t.taskType as any) || (input.category === 'coding_project' ? 'coding' : 'learning_and_practice'),
            durationMinutes: input.dailyMinutes,
            difficulty: Math.min(5, Math.max(1, t.difficulty || (idx + 1))),
            successCriteria: t.successCriteria || 'Görevi eksiksiz tamamlamak',
            freeResourceUrl: t.freeResourceUrl || undefined,
            status: 'pending' as const
          })),
          finalEvidence: parsed.finalEvidence || []
        };

        // Ensure 7 tasks exist
        while (result.tasks.length < 7) {
          const n = result.tasks.length + 1;
          result.tasks.push({
            id: `task-ai-pad-${Date.now()}-${n}`,
            dayNumber: n,
            title: `${n}. Gün Pekiştirme ve Pratik Simülasyonu`,
            description: 'Hafta boyunca öğrenilen konuları gözden geçir ve mini projen/senaryon üzerinde pratik yap.',
            taskType: input.category === 'coding_project' ? 'coding' : 'review',
            durationMinutes: input.dailyMinutes,
            difficulty: Math.min(5, n),
            successCriteria: 'Öğrenilen temel becerileri bağımsız olarak uygulayabilmek',
            status: 'pending'
          });
        }
        result.tasks = result.tasks.slice(0, 7);

        lastGenerationSource = 'gemini';
        console.log(`[GeminiAI] ✅ ${model} ile hedef başarıyla analiz edildi!`);
        return result;
      } catch (err) {
        console.warn(`[GeminiAI] ${model} hatası:`, err);
      }
    }

    console.warn('[GeminiAI] Tüm canlı AI çağrıları başarısız oldu, Akıllı Mock Provider devreye girdi.');
    lastGenerationSource = 'mock';
    return mockAIProvider.analyzeGoal(input);
  }

  async generateDiagnosticTest(goalId: string, category: GoalCategory, goalTitle?: string, currentLevel?: string): Promise<DiagnosticTest> {
    const apiKey = this.getApiKey();
    if (!apiKey) return mockAIProvider.generateDiagnosticTest(goalId, category, goalTitle, currentLevel);

    const prompt = `Sen AdımAI seviye ve tanı testi motorusun.
KULLANICININ TAM HEDEFİ: "${goalTitle || 'Kişisel Başarı ve Öğrenim Hedefi'}"
HEDEF KATEGORİSİ: ${category}
KULLANICININ BEYAN ETTİĞİ SEVİYE: "${currentLevel || 'başlangıç'}"

GÖREVİN:
Kullanıcının tam olarak yazdığı hedefteki ("${goalTitle}") gerçek seviyesini (Başlangıç seviyesinde mi, Orta seviyede mi, İleri düzeyde mi) ve bu spesifik alandaki hazır bulunuşluğunu / beklentilerini ölçen HEDEFE %100 ÖZEL 4 adet çoktan seçmeli Türkçe soru oluştur.
JENERİK SORU SORMA. Eğer hedef yapay zeka ise yapay zeka araçları/kullanımı hakkında; dil ise o spesifik dil yapısı/kelimeler hakkında; yazılım ise o spesifik teknoloji hakkında sorular sor.

SADECE ŞU JSON FORMATINDA DÖNDÜR:
{
  "questions": [
    {
      "id": "q1",
      "question": "Kullanıcının hedefine özel soru metni...",
      "options": ["Seçenek A", "Seçenek B", "Seçenek C", "Seçenek D"],
      "correctOptionIndex": 0,
      "topic": "İlgili Konu Başlığı",
      "explanation": "Doğru seçeneğin kısa açıklaması"
    }
  ]
}`;

    for (const model of this.availableModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.3 }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            let jsonText = rawText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
            const parsed = JSON.parse(jsonText);
            if (parsed.questions && Array.isArray(parsed.questions)) {
              return {
                id: `diag-${Date.now()}`,
                goalId,
                category,
                questions: parsed.questions,
                createdAt: new Date().toISOString()
              };
            }
          }
        }
      } catch (err) {
        console.warn(`Diagnostic test generation failed on ${model}:`, err);
      }
    }

    return mockAIProvider.generateDiagnosticTest(goalId, category);
  }

  async evaluateDiagnosticTest(testId: string, answers: Record<string, number>): Promise<{ score: number; topicScores: Record<string, number> }> {
    return mockAIProvider.evaluateDiagnosticTest(testId, answers);
  }

  async generatePlan(goalId: string, analysis: GoalAnalysisResult): Promise<Plan> {
    return {
      id: `plan-${Date.now()}`,
      goalId,
      version: 1,
      assumptions: analysis.assumptions,
      estimatedMinDays: analysis.realisticAssessment.minDays,
      estimatedMaxDays: analysis.realisticAssessment.maxDays,
      tasks: analysis.tasks,
      milestones: analysis.milestones,
      createdAt: new Date().toISOString()
    };
  }

  async evaluateCheckinAndAdapt(
    goalId: string, 
    currentTask: PlanTask, 
    difficulty: CheckinDifficulty
  ): Promise<{ newPlanVersion?: number; updatedTask?: PlanTask; message: string }> {
    return mockAIProvider.evaluateCheckinAndAdapt(goalId, currentTask, difficulty);
  }

  async generateEvidence(goalId: string, category: GoalCategory, title: string): Promise<Evidence[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) return mockAIProvider.generateEvidence(goalId, category, title);

    const prompt = `Sen AdımAI hedef kanıtı ve çıktı üretici motorusun.
Kullanıcı Hedefi: "${title}"
Kategori: ${category}

Kullanıcının bu hedefi başardığını kanıtlayan 3 adet Türkçe kanıt maddesi üret.
SADECE GEÇERLİ JSON DÖNDÜR:
{
  "evidences": [
    {
      "type": "${category === 'coding_project' ? 'github_link' : category === 'language_learning' ? 'speech_evaluation' : 'exam_report'}",
      "title": "Kanıt Başlığı",
      "content": "Kanıt detay ve başarı raporu içeriği..."
    }
  ]
}`;

    for (const model of this.availableModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", temperature: 0.4 }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            let jsonText = rawText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
            const parsed = JSON.parse(jsonText);
            if (parsed.evidences && Array.isArray(parsed.evidences)) {
              return parsed.evidences.map((ev: any, idx: number) => ({
                id: `ev-ai-${Date.now()}-${idx}`,
                goalId,
                type: ev.type || (category === 'coding_project' ? 'github_link' : 'speech_evaluation'),
                title: ev.title || 'Hedef Kanıt Raporu',
                content: ev.content || 'Kullanıcının başarı performans çıktısı',
                url: category === 'coding_project' ? 'https://github.com/demo-user/project' : undefined,
                createdAt: new Date().toISOString()
              }));
            }
          }
        }
      } catch (err) {
        console.warn(`Evidence generation failed on ${model}:`, err);
      }
    }

    return mockAIProvider.generateEvidence(goalId, category, title);
  }
}

export const geminiAIProvider = new GeminiAIProvider();

