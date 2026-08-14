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
import { calculateTimeline } from '../../utils/timelineCalculator';

export class MockAIProvider implements AIProvider {
  async analyzeGoal(input: GoalInput): Promise<GoalAnalysisResult> {
    const realisticAssessment = calculateTimeline(input);

    const assumptions = [
      `Mevcut seviye: ${input.currentLevel}`,
      `Haftada ${input.daysPerWeek} gün çalışma disiplini`,
      `Günde ${input.dailyMinutes} dakika odaklanmış pratik`,
      input.preferFreeResources ? 'Yalnızca erişilebilir ücretsiz kaynaklar kullanılacak' : 'Ücretsiz ve açık topluluk kaynakları'
    ];

    let milestones = [
      { day: 7, title: 'Temel kavramlar & İlk Uygulama', successCriteria: 'Temel 50 kelime veya ilk komut paneli' },
      { day: 14, title: 'Orta Seviye Senaryolar', successCriteria: '10 pratik senaryo tamamlama' },
      { day: 30, title: 'İlk Proje / Canlı Değerlendirme', successCriteria: 'Tamamlanmış portföy çıktısı ve test başarısı' }
    ];

    let tasks: PlanTask[] = [];
    const lowerTitle = input.title.toLowerCase();

    // Check if goal is vague (e.g. "hangi dil bilmiyorum")
    const isVagueLanguageGoal = lowerTitle.includes('hangi dil') || lowerTitle.includes('bilmiyorum') || lowerTitle.includes('karar ver');

    if (isVagueLanguageGoal && input.category === 'language_learning') {
      realisticAssessment.isOriginalGoalRealistic = false;
      realisticAssessment.explanation = 'Belirli bir hedef dil seçilmeden dil öğrenmeye başlamak odağı dağıtır. İlk 7 günümüzü dil seçimi ve temel İngilizceye giriş olarak yapılandırdık.';
      realisticAssessment.alternativeGoal = '7 Günde Hedef Dilini Seçme ve Temel İngilizceye Giriş';

      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Dil Seçimi ve Amaç Analizi',
          description: 'Neden dil öğrenmek istediğini (kariyer, seyahat, hobi) belirle. İngilizce, Almanca ve İspanyolca avantajlarını karşılaştırarak hedef dilini seç.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Hedef öğrendiğin dili kesinleştirip bir deftere not etmek',
          freeResourceUrl: 'https://www.youtube.com',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Seçilen Dilde Alfabe ve Telaffuz Mantığı',
          description: 'Seçtiğin dilin (örn. İngilizce) alfabe yapısını, özel okunuş kurallarını ve seslerini incele.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Temel telaffuz kurallarını öğrenip 5 örnek ses kaydı almak',
          freeResourceUrl: 'https://www.duolingo.com',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'En Sık Kullanılan 20 Temel Kelime & Selamlaşma',
          description: 'Günlük hayatta en çok kullanılan 20 kelime ve selamlaşma kalıbını pratik et.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: '20 kelimeyi takılmadan ezberden söyleyebilmek',
          freeResourceUrl: 'https://quizlet.com',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Basit Cümle Kurma Yapısı',
          description: 'Kişi zamirleri (Ben, Sen, O) ve temel özne-fiil dizilimi ile ilk 5 cümleni oluştur.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: '5 doğru cümle kalıbı yazmak',
          freeResourceUrl: 'https://www.bbc.co.uk/learningenglish',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Kendini Tanıtma Cümleleri',
          description: 'Adını, yaşını ve nereden geldiğini ifade eden 3 cümlelik tanıtım paragrafı hazırla.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Kendini tanıtma paragrafını sesli şekilde telaffuz etmek',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Haftalık Kelime & Yapı Tekrarı',
          description: 'Hafta boyunca öğrendiğin kelimeleri ve cümle yapılarını tekrar et.',
          taskType: 'exam_quiz',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Mini quizde 10 sorudan 8 doğru başarmak',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Seçilen Dilde İlk Simülasyon',
          description: 'Seçtiğin dilde 1 dakikalık sesli tanıtım ve gelecek hafta çalışma planını kesinleştir.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: '1 dakikalık ses kaydını tamamlamak',
          status: 'pending'
        }
      ];
    } else if (input.category === 'language_learning') {
      const langName = lowerTitle.includes('almanca') ? 'Almanca' : lowerTitle.includes('fransızca') ? 'Fransızca' : lowerTitle.includes('ispanyolca') ? 'İspanyolca' : lowerTitle.includes('japonca') ? 'Japonca' : 'İngilizce';
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: `${langName} Alfabe ve Temel Ses İfadeleri`,
          description: `${langName} harf okunuşlarını, vokal sesleri ve temel selamlaşma sözcüklerini çalış.`,
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: '15 temel ifadeyi doğru telaffuz etmek',
          freeResourceUrl: 'https://www.duolingo.com',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: `${langName} Günlük Kalıplar ve Nezaket Sözleri`,
          description: 'Teşekkür etme, rica etme ve soru sorma cümle kalıplarını tekrar et.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: '3 kısa diyalog senaryosunu taklit etmek',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: `${langName} Sayılar ve Zaman İfadeleri`,
          description: '1-100 arası sayılar, saat söyleme ve gün isimlerini çalış.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Sayıları ve saati takılmadan söylemek',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: `${langName} Cümle Kurma ve Özne Zamirleri`,
          description: 'Ben, sen, o zamirleri ve şimdiki zaman fiil çekimlerini pratik et.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: '5 kurallı cümle oluşturmak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: `${langName} Yön Sorma ve Mekanlar`,
          description: 'Nerede, nasıl gidilir, sağa/sola dön ifadelerini haritada dene.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Adres tarifi senaryosunu başarmak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: `${langName} Kelime Kartı Değerlendirmesi`,
          description: 'Öğrenilen 50 kelimeyi gözden geçir ve hatalı kelimeleri not et.',
          taskType: 'exam_quiz',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: '%80 üzeri hatırlama oranı',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: `${langName} Konuşma Simülasyonu`,
          description: 'Öğrenilen kalıplarla 2 dakikalık konuşma veya ses kaydı yap.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Ses kaydını eksiksiz tamamlamak',
          status: 'pending'
        }
      ];
    } else if (input.category === 'coding_project') {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Geliştirme Ortamı ve Vite+React Kurulumu',
          description: 'VS Code, Node.js doğrulaması yap ve `npm create vite@latest` komutu ile projeni başlat.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Projeyi localde çalıştırıp ekranda "Hello World" görmek',
          freeResourceUrl: 'https://developer.mozilla.org/tr/',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Bileşen Arayüzü (UI) ve CSS Şablonu',
          description: 'Ana bileşeni oluştur, Tailwind veya sade CSS kart stillerini ekle.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Temiz ve responsive bir kart bileşeni basmak',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'State Yönetimi ve Form Inputları',
          description: 'useState hook kullanarak kullanıcı girdilerini state içinde sakla.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Form submit edildiğinde veriyi loglayabilmek',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Veri Listeleyici ve Filter Mantığı',
          description: 'Eleman listesini map() fonksiyonu ile render et.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Dinamik ekleme ve silme işlemini başarmak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'LocalStorage Kalıcılık Katmanı',
          description: 'Sayfa yenilendiğinde verilerin kaybolmaması için localStorage entegrasyonu yaz.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Yenileme sonrası verilerin korunduğunu test etmek',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'GitHub Reposu ve README Dokümantasyonu',
          description: 'GitHub üzerinde yeni repo aç, git push yap ve projen için profesyonel README.md yaz.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'GitHub reponun yayında ve kodların güncel olması',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Vercel Deployment ve Canlı Demo',
          description: 'Projeyi Vercel üzerine deploy et ve canlı linkini al.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Canlı çalışan HTTPS bağlantısı almak',
          status: 'pending'
        }
      ];
    } else {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Sınav Müfredatı & Konu Analizi',
          description: 'Eksik konuları listeleyip öncelik sırasına koy.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'En zayıf 3 konuyu belirlemek',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: '1. Temel Konu Özeti ve Soru Çözümü',
          description: 'Konu özetini oku ve 20 soru çöz.',
          taskType: 'exam_quiz',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'En az 15 doğru cevap',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'Hatalı Sorular ve Yanlış Analizi',
          description: 'Dün yanlış yapılan soruların çözüm videolarını incele.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Yanlış yapılan soruların mantığını kavramak',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: '2. Konu Derinleşme ve Zamana Karşı Test',
          description: 'Süre tutarak 25 test sorusu çöz.',
          taskType: 'exam_quiz',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Süre sınırında testi bitirmek',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Zayıf Nokta Tekrarı',
          description: 'Hata yapılan soru tipleriyle ilgili 10 özgün soru çöz.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: '%80 başarı sağlamak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Genel Deneme Sınavı',
          description: 'Sınav formatında mini deneme sınavını tamamla.',
          taskType: 'exam_quiz',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Denemeyi tamamlayıp net hesabı yapmak',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Haftalık Başarı Raporu ve Plan Güncelleme',
          description: 'Haftalık net artışını incele ve gelecek haftanın planını kesinleştir.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Gelecek hafta hedeflerini kaydetmek',
          status: 'pending'
        }
      ];
    }

    return {
      goalSummary: input.title,
      category: input.category,
      realisticAssessment,
      assumptions,
      milestones,
      tasks,
      finalEvidence: [
        input.category === 'coding_project' ? 'GitHub Reposu ve Canlı Demo Bağlantısı' : 'Ustalık Raporu ve Konuşma/Sınav Skoru',
        'CV Özgeçmiş Maddeleri (TR & EN)',
        'Tamamlanmış Proje İlerleme Kartı'
      ]
    };
  }

  async generateDiagnosticTest(goalId: string, category: GoalCategory, goalTitle?: string, currentLevel?: string): Promise<DiagnosticTest> {
    const titleLower = (goalTitle || '').toLowerCase();

    if (titleLower.includes('yapay zeka') || titleLower.includes('chatgpt') || titleLower.includes('ai')) {
      return {
        id: `diag-${Date.now()}`,
        goalId,
        category,
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: 'Yapay zeka araçlarından (ChatGPT, Claude vb.) doğru ve kaliteli yanıt almak için kullanılan metin komutlarına ne ad verilir?',
            options: ['Prompt (İstem)', 'Algorithm', 'Database Query', 'Compiler'],
            correctOptionIndex: 0,
            topic: 'Yapay Zeka Okuryazarlığı',
            explanation: 'Prompt (istem), yapay zekaya yönlendirilen talimat cümleleridir.'
          },
          {
            id: 'q2',
            question: 'Bir yapay zekaya spesifik bir uzman gibi davranmasını söyleme tekniğine ne ad verilir?',
            options: ['Rol Verme (Persona/Role Prompting)', 'Zero-Shot Learning', 'Overfitting', 'Fine-Tuning'],
            correctOptionIndex: 0,
            topic: 'Prompt Engineering',
            explanation: 'Yapayan zekaya "Sen deneyimli bir İngilizce öğretmenisin" gibi rol vermek yanıt kalitesini artırır.'
          },
          {
            id: 'q3',
            question: 'Yapay zekanın kendinden emin şekilde yanlış veya uydurma bilgi üretmesi durumuna ne denir?',
            options: ['Halüsinasyon (Hallucination)', 'Bug', 'Syntax Error', 'Deadlock'],
            correctOptionIndex: 0,
            topic: 'AI Araç Kullanımı',
            explanation: 'Yapay zekalar bazen doğru olmayan bilgileri halüsinasyon görerek üretebilir, bu yüzden teyit etmek önemlidir.'
          },
          {
            id: 'q4',
            question: 'Bu hedefteki mevcut deneyim ve beklenti seviyeniz nedir?',
            options: ['Sıfırdan temel araçları kullanmayı öğrenmek', 'Pratik günlük istem (prompt) şablonları geliştirmek', 'İleri seviye kodlama ve otomasyon yapmak', 'İşimi hızlandıracak yapay zeka ipuçları edinmek'],
            correctOptionIndex: 0,
            topic: 'Beklenti ve Seviye Testi',
            explanation: 'Yanıtınız 7 günlük ritminize göre uyarlanacaktır.'
          }
        ]
      };
    } else if (category === 'language_learning') {
      return {
        id: `diag-${Date.now()}`,
        goalId,
        category,
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: '"I have been working here _____ three years." cümlesindeki boşluğa hangisi gelmelidir?',
            options: ['for', 'since', 'during', 'in'],
            correctOptionIndex: 0,
            topic: 'Dil Yapısı ve Dilbilgisi'
          },
          {
            id: 'q2',
            question: 'Yurt dışı veya günlük iletişimdeki ana amacınız hangisidir?',
            options: ['Temel seyahat ve ihtiyaç cümleleri kurmak', 'Akıcı diyalog ve sohbet etmek', 'İş ve e-posta yazışmaları yapmak', 'Dizi/Film alt yazısız anlamak'],
            correctOptionIndex: 0,
            topic: 'Hedef ve Beklenti Seviyesi'
          },
          {
            id: 'q3',
            question: '"Could you please tell me where the nearest pharmacy is?" ne anlama gelir?',
            options: [
              'En yakın eczanenin nerede olduğunu söyler misiniz?',
              'En yakın hastaneye nasıl gidebilirim?',
              'Eczaneden ilaç alabilir misiniz?',
              'Burada eczane var mı?'
            ],
            correctOptionIndex: 0,
            topic: 'Okuma ve Anlama'
          }
        ]
      };
    } else if (category === 'coding_project') {
      return {
        id: `diag-${Date.now()}`,
        goalId,
        category,
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: 'JavaScript dilinde değişken tanımlamak için önerilen modern anahtar kelime hangisidir?',
            options: ['var', 'let / const', 'def', 'dim'],
            correctOptionIndex: 1,
            topic: 'JS Fundamentals'
          },
          {
            id: 'q2',
            question: 'Git sürüm kontrol sisteminde yapılan değişiklikleri sunucuya göndermek için hangi komut kullanılır?',
            options: ['git commit', 'git pull', 'git push', 'git checkout'],
            correctOptionIndex: 2,
            topic: 'Git & Version Control'
          },
          {
            id: 'q3',
            question: 'React bileşenlerinde veri durumunu (state) saklamak için hangi hook kullanılır?',
            options: ['useEffect', 'useState', 'useRef', 'useContext'],
            correctOptionIndex: 1,
            topic: 'React Basics'
          }
        ]
      };
    } else {
      return {
        id: `diag-${Date.now()}`,
        goalId,
        category,
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: 'Verimli bir çalışma programında ders araları için önerilen ideal mola süresi nedir?',
            options: ['5-10 dakika', '30-40 dakika', 'Hiç mola vermemek', '60 dakika'],
            correctOptionIndex: 0,
            topic: 'Study Techniques'
          },
          {
            id: 'q2',
            question: 'Yanlış yapılan soruların tekrar incelenmesi neden önemlidir?',
            options: [
              'Öğrenme eksiklerini ve mantık hatalarını tespit etmek için',
              'Zaman kaybetmek için',
              'Aynı soruyu ezberlemek için',
              'Önemli değildir'
            ],
            correctOptionIndex: 0,
            topic: 'Exam Strategy'
          }
        ]
      };
    }
  }

  async evaluateDiagnosticTest(testId: string, answers: Record<string, number>): Promise<{ score: number; topicScores: Record<string, number> }> {
    // Deterministik değerlendirme
    const correctCount = Object.keys(answers).length; // Simulated
    const total = 3;
    const score = Math.round((correctCount / total) * 100);

    return {
      score,
      topicScores: {
        'Temel Bilgi': score,
        'Uygulama Pratiği': Math.max(score - 10, 50)
      }
    };
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
    if (difficulty === 'struggling' || difficulty === 'need_help') {
      const updatedTask: PlanTask = {
        ...currentTask,
        title: `[Basitleştirildi] ${currentTask.title}`,
        description: `Görev daha küçük parçaya bölündü: ${currentTask.description.substring(0, 40)}... (15 dk odaklanma).`,
        durationMinutes: Math.max(15, Math.floor(currentTask.durationMinutes * 0.6)),
        difficulty: Math.max(1, currentTask.difficulty - 1)
      };
      return {
        newPlanVersion: 2,
        updatedTask,
        message: 'Planınız zorluk seviyenize göre hafifletildi. Küçük adımlarla devam ediyoruz!'
      };
    } else if (difficulty === 'no_time') {
      const updatedTask: PlanTask = {
        ...currentTask,
        title: `[Kısa Versiyon] ${currentTask.title}`,
        durationMinutes: 10,
        description: 'Sadece 10 dakikalık hızlı tekrar görevi.'
      };
      return {
        updatedTask,
        message: 'Hiç sorun değil! Bugün için 10 dakikalık mikro tekrar hazırladık.'
      };
    }

    return {
      message: 'Tebrikler! Harika bir ilerleme kaydettiniz.'
    };
  }

  async generateEvidence(goalId: string, category: GoalCategory, title: string): Promise<Evidence[]> {
    if (category === 'coding_project') {
      return [
        {
          id: `ev-1`,
          goalId,
          type: 'github_link',
          title: 'GitHub Reposu',
          content: 'Kod deposu, commits ve versiyon geçmişi.',
          url: 'https://github.com/user/adim-ai-project',
          createdAt: new Date().toISOString()
        },
        {
          id: `ev-2`,
          goalId,
          type: 'readme_md',
          title: 'GitHub README.md Şablonu',
          content: `# ${title}\n\nDeveloped using TypeScript, React and Vite.\n\n## Key Features\n- Structured task execution\n- Adaptive progress tracking`,
          createdAt: new Date().toISOString()
        }
      ];
    }

    return [
      {
        id: `ev-1`,
        goalId,
        type: 'vocabulary_report',
        title: 'Ustalık ve Kelime Raporu',
        content: 'Tamamlanan 250 kelime ve %88 başarı skoru.',
        createdAt: new Date().toISOString()
      }
    ];
  }
}

export const mockAIProvider = new MockAIProvider();
