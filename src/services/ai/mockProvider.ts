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
    } else if (
      lowerTitle.includes('photoshop') || 
      lowerTitle.includes('ps') || 
      lowerTitle.includes('tasarım') || 
      lowerTitle.includes('görsel') || 
      lowerTitle.includes('grafik') || 
      lowerTitle.includes('figma') || 
      lowerTitle.includes('blender') || 
      lowerTitle.includes('illüstratör') || 
      lowerTitle.includes('fotoğraf')
    ) {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Photoshop Arayüzü & Çalışma Alanı Kurulumu',
          description: 'Photoshop arayüzünü aç, araç çubukları (Toolbar), katmanlar (Layers) paneli ve belge boyutlandırma ayarlarını incele.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Temel tuval alanını oluşturup çalışma alanını kaydetmek',
          freeResourceUrl: 'https://helpx.adobe.com/tr/photoshop/user-guide.html',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Katmanlar (Layers) & Seçim Araçları',
          description: 'Lasso Tool, Quick Selection ve Magic Wand araçlarıyla obje seçimi yap, katman maskesi (Layer Mask) oluştur.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Arka planı temiz kesilmiş bir görsel elde etmek',
          freeResourceUrl: 'https://www.youtube.com',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'Renk Düzeltme & Adjustment Layers',
          description: 'Brightness/Contrast, Curves ve Hue/Saturation ayar katmanları ile görsellerde tonlama ve renk düzenlemesi yap.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Görselin renk dengesini ve kontrastını iyileştirmek',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Fırça (Brush) & Tipografi Kullanımı',
          description: 'Type Tool ile metin ekle, font aileleri, metin stilleri ve fırça (Brush) araçlarıyla estetik hizalamalar yap.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Başlık ve alt metin içeren bir tipografi çalışması çıkarmak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Fotoğraf Retouching & Leke Temizleme',
          description: 'Spot Healing Brush, Clone Stamp ve Content-Aware Fill araçlarını kullanarak fotoğraftaki lekeleri ve istenmeyen objeleri temizle.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Fotoğraftaki lekeleri doğal biçimde temizlemek',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Sosyal Medya Afiş / Banner Tasarımı',
          description: 'Öğrendiğin seçim, renk, tipografi ve katman stillerini (Drop Shadow, Stroke) kullanarak ilk özgün sosyal medya afişini tasarla.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: '1080x1080 boyutunda tamamlanmış afiş tasarımı',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Proje Çıktısı Alma & Dışa Aktarma (Export)',
          description: 'Tasarladığın projeleri PNG, JPEG ve PSD formatında dışa aktar ve portföyüne ekle.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Yüksek kaliteli PNG ve PSD çıktısını teslim almak',
          status: 'pending'
        }
      ];
    } else if (
      lowerTitle.includes('gitar') || 
      lowerTitle.includes('saz') || 
      lowerTitle.includes('müzik') || 
      lowerTitle.includes('piyano') || 
      lowerTitle.includes('keman') || 
      lowerTitle.includes('şarkı') || 
      lowerTitle.includes('akor')
    ) {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Gitar Anatomisi & Temel Sol/Sağ El Pozisyonu',
          description: 'Gitar tutuşunu, tel isimlerini (E A D G B E) ve sağ el vuruş tekniklerini incele.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Boş tellere metronomla temiz vuruşlar yapmak',
          freeResourceUrl: 'https://www.ultimate-guitar.com',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Temel Başlangıç Akorları: Em & E',
          description: 'Em (Mi Minör) ve E (Mi Majör) akorlarının parmak basılışlarını öğren ve temiz ses al.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Cızırtısız akor sesi elde etmek',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: '4/4\'lük Temel Ritim Kalıbı',
          description: 'İn-çık vuruşları ile metronom eşliğinde ritim tutma egzersizleri yap.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Tempolu şekilde 1 dakika ritim tutmak',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Geçiş Akorları: Am & C',
          description: 'Am (La Minör) ve C (Do Majör) akorlarını öğrenip akorlar arası geçiş pratiği yap.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Akor geçişlerinde ritmi aksatmamak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Tab Okuma & Basit Melodi Pratiği',
          description: 'Gitar tab sistemini kavra ve bildiğin popüler tek sesli bir melodiyi çal.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Melodiyi doğru notalarla tamamlamak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'İlk Şarkıyı Baştan Sona Çalma',
          description: 'Öğrenilen akorlar ve ritim kalıbı ile seçtiğin şarkıyı baştan sona eşlik et.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Şarkıyı ritimle tam icra etmek',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Ses Kaydı & Performans Değerlendirmesi',
          description: 'Çaldığın şarkıyı telefona kaydet, dinle ve ritim aksamalarını kontrol et.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'İlk performans kaydını tamamlamak',
          status: 'pending'
        }
      ];
    } else if (
      lowerTitle.includes('sınav') || 
      lowerTitle.includes('yks') || 
      lowerTitle.includes('kpss') || 
      lowerTitle.includes('tyt') || 
      lowerTitle.includes('ayt') || 
      lowerTitle.includes('biyoloji') || 
      lowerTitle.includes('matematik') || 
      lowerTitle.includes('fizik') || 
      lowerTitle.includes('kimya') || 
      lowerTitle.includes('ders') || 
      input.category === 'exam_study'
    ) {
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
    } else {
      // General dynamic personal goal breakdown
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: `${input.title}: Hedef Analizi & Temel Kavramlar`,
          description: `"${input.title}" hedefi için temel terimleri, gerekli araçları ve ilk adımları incele.`,
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Temel kavramları ve çalışma planını not etmek',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Çalışma Ortamı Kurulumu & İlk Pratik',
          description: 'Gerekli yazılım, araç veya materyalleri hazırlayıp ilk uygulamalı çalışmanı yap.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'İlk pratik adımı tamamlamak',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'Temel Teknikler & Kılavuz Uygulaması',
          description: 'Konuyla ilgili rehber içerikleri takip ederek başlangıç tekniklerini adım adım uygula.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Kılavuzdaki ilk 3 aşamayı başarmak',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Orta Seviye Uygulamalı Egzersiz',
          description: 'Öğrendiğin temel bilgileri birleştirerek bağımsız bir minik uygulama gerçekleştir.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Egzersizi eksiksiz tamamlamak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Takılınan Noktalar & Hata İncelemesi',
          description: 'Uygulama esnasında zorlandığın veya eksik kaldığın alanları tekrar et.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Eksik konuları giderip düzeltme yapmak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Tam Kapsamlı Uygulama / Taslak Çıktı',
          description: 'Tüm öğrendiklerini kullanarak hedefine özel ilk somut çıktını üret.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Tamamlanmış taslak çıktıyı elde etmek',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Haftalık Değerlendirme & Gelecek Rota',
          description: 'Haftalık ilerlemeni gözden geçir, elde ettiğin çıktıyı kaydet ve 2. hafta rotanı belirle.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'İlerleme özetini tamamlamak',
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

    if (
      titleLower.includes('photoshop') || 
      titleLower.includes('ps') || 
      titleLower.includes('tasarım') || 
      titleLower.includes('görsel') || 
      titleLower.includes('grafik') || 
      titleLower.includes('figma') || 
      titleLower.includes('blender') || 
      titleLower.includes('illüstratör') || 
      titleLower.includes('fotoğraf')
    ) {
      return {
        id: `diag-${Date.now()}`,
        goalId,
        category,
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: 'Photoshop\'ta orijinal görsel verisini bozmadan renk tonlaması ve kontrast düzenlemesi yapmak için hangisi kullanılır?',
            options: ['Adjustment Layers (Ayar Katmanları)', 'Rasterize Layer', 'Merge Down', 'Flatten Image'],
            correctOptionIndex: 0,
            topic: 'Photoshop Katman Mantığı',
            explanation: 'Adjustment Layers (Ayar Katmanları) piksel silmeden renk ve ışık ayarı yapmayı sağlar.'
          },
          {
            id: 'q2',
            question: 'Fotoğraftaki leke veya istenmeyen küçük objeleri arka plan dokusuna uygun temizlemek için hangi araç tercih edilir?',
            options: ['Spot Healing Brush / Content-Aware', 'Crop Tool', 'Pen Tool', 'Bucket Fill'],
            correctOptionIndex: 0,
            topic: 'Retouching & Fotoğraf Düzeltme',
            explanation: 'Spot Healing Brush çevre dokuyu analiz ederek lekeleri akıllıca temizler.'
          },
          {
            id: 'q3',
            question: 'Photoshop öğrenimindeki ana hedefiniz ve mevcut seviyeniz nedir?',
            options: ['Sıfırdan arayüz ve katman mantığını öğrenmek', 'Sosyal medya afiş ve içerikleri tasarlamak', 'Fotoğraf rötuş ve renk ayarları yapmak', 'İleri düzey manipülasyon çalışmaları üretmek'],
            correctOptionIndex: 0,
            topic: 'Seviye ve Beklenti Değerlendirmesi',
            explanation: '7 günlük rotanız seçtiğiniz seviyeye göre şekillenecektir.'
          }
        ]
      };
    } else if (
      titleLower.includes('gitar') || 
      titleLower.includes('saz') || 
      titleLower.includes('müzik') || 
      titleLower.includes('piyano') || 
      titleLower.includes('keman') || 
      titleLower.includes('şarkı') || 
      titleLower.includes('akor')
    ) {
      return {
        id: `diag-${Date.now()}`,
        goalId,
        category,
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            question: 'Gitarın standart akort düzeninde en kalın (6.) tel hangi notaya karşılık gelir?',
            options: ['E (Mi)', 'A (La)', 'D (Re)', 'G (Sol)'],
            correctOptionIndex: 0,
            topic: 'Gitar Anatomisi & Notalar',
            explanation: '6. en kalın tel Mi (E) sesine akort edilir.'
          },
          {
            id: 'q2',
            question: 'İki parmakla basılan en temel ve kolay gitar akorlarından biri hangisidir?',
            options: ['Em (Mi Minör)', 'F (Fa Majör)', 'Bm (Si Minör)', 'G7'],
            correctOptionIndex: 0,
            topic: 'Temel Akor Bilgisi',
            explanation: 'Em (Mi Minör) başlangıç için en rahat basılan temel akordur.'
          },
          {
            id: 'q3',
            question: 'Gitar çalmadaki ana hedefiniz ve mevcut seviyeniz nedir?',
            options: ['Sıfırdan ilk şarkımı ritimle çalmak', 'Akor geçişlerimi hızlandırmak', 'Metronomla ritim kaçırmadan çalmak', 'Tab okuyarak solo ve melodiler icra etmek'],
            correctOptionIndex: 0,
            topic: 'Seviye ve Beklenti Değerlendirmesi',
            explanation: '7 günlük rotanız seçtiğiniz seviyeye göre şekillenecektir.'
          }
        ]
      };
    } else if (titleLower.includes('yapay zeka') || titleLower.includes('chatgpt') || titleLower.includes('ai')) {
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
