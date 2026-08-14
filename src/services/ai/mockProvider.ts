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

    const lowerTitle = input.title.toLowerCase();

    // Generate dynamic topic-tailored milestones
    let milestones = [];
    if (lowerTitle.includes('unreal') || lowerTitle.includes('unrael') || lowerTitle.includes('unity') || lowerTitle.includes('oyun') || lowerTitle.includes('game')) {
      milestones = [
        { day: 7, title: '3D Viewport & Blueprint Temeli', successCriteria: '3D aktör yerleştirip nod bazlı Blueprint eventi bağlamak' },
        { day: 14, title: 'Karakter Kontrolü & Fizik Kuralları', successCriteria: 'Karakter hareketini ve Trigger Box etkileşimlerini tamamlamak' },
        { day: 30, title: 'Oynanabilir 3D Oyun Paketleme (EXE Build)', successCriteria: 'Oynanabilir Windows EXE mini 3D oyunu derleyip kaydetmek' }
      ];
    } else if (lowerTitle.includes('python') || lowerTitle.includes('pandas') || lowerTitle.includes('bot') || lowerTitle.includes('scraping') || lowerTitle.includes('veri')) {
      milestones = [
        { day: 7, title: 'Python Temelleri & Veri Yapıları', successCriteria: 'Döngüler, listeler ve fonksiyonlar ile konsol scripti yazmak' },
        { day: 14, title: 'Otomasyon & Veri İşleme (Pandas/Requests)', successCriteria: 'Webden veri çekip JSON/Excel dosyasına kaydetmek' },
        { day: 30, title: 'Canlı Bot / Script Portföyü', successCriteria: 'Çalışan otomasyon botunu GitHub repoda dokümante etmek' }
      ];
    } else if (lowerTitle.includes('gitar') || lowerTitle.includes('saz') || lowerTitle.includes('müzik') || lowerTitle.includes('akor')) {
      milestones = [
        { day: 7, title: 'Temel Akorlar & 4/4 Ritim', successCriteria: '3 temel akoru ve ritim kalıbını takılmadan çalmak' },
        { day: 14, title: 'Akor Geçişleri & Tab Okuma', successCriteria: '5 şarkının akor ve ritim eşliğini tamamlamak' },
        { day: 30, title: 'Tam Repertuar & Performans Kaydı', successCriteria: '10 şarkılık mini repertuarı baştan sona kaydedebilmek' }
      ];
    } else if (lowerTitle.includes('piano') || lowerTitle.includes('piyano')) {
      milestones = [
        { day: 7, title: 'Tuş Anatomisi & Sağ/Sol El Temeli', successCriteria: 'Do-Re-Mi dizisini ve temel bas sesleri çalmak' },
        { day: 14, title: 'Çift El Koordinasyonu & Basit Akorlar', successCriteria: 'Sağ el melodi ve sol el akor eşliğini birleştirmek' },
        { day: 30, title: 'Akıcı İcra & Eser Performansı', successCriteria: '3 tam eseri baştan sona ritimle çalmak' }
      ];
    } else if (lowerTitle.includes('photoshop') || lowerTitle.includes('ps') || lowerTitle.includes('tasarım') || lowerTitle.includes('görsel') || lowerTitle.includes('fotoğraf')) {
      milestones = [
        { day: 7, title: 'Katman Mantığı & Obje Seçimi', successCriteria: 'Layer Mask ve seçim araçları ile dekupe yapmak' },
        { day: 14, title: 'Renk Tonlaması & Retouching', successCriteria: 'Adjustment Layers ve Healing Brush ile fotoğraf düzenlemek' },
        { day: 30, title: 'Afiş Tasarımı & Portföy Çıktısı', successCriteria: '3 özgün sosyal medya afişini PSD/PNG teslim etmek' }
      ];
    } else if (input.category === 'language_learning' || lowerTitle.includes('dil') || lowerTitle.includes('ingilizce') || lowerTitle.includes('japonca') || lowerTitle.includes('almanca')) {
      milestones = [
        { day: 7, title: 'Temel Tanışma & Kelime Yapısı', successCriteria: '50 pratik kelime ve kendini tanıtma cümlelerini konuşmak' },
        { day: 14, title: 'Günlük Diyalog & Cümle Kalıpları', successCriteria: 'Yön sorma, alışveriş ve ihtiyaç cümlelerini söylemek' },
        { day: 30, title: 'Temel Konuşma Seviyesi (A1/A2)', successCriteria: '2 dakikalık kesintisiz sesli konuşma kaydı almak' }
      ];
    } else if (input.category === 'coding_project' || lowerTitle.includes('kod') || lowerTitle.includes('python') || lowerTitle.includes('react')) {
      milestones = [
        { day: 7, title: 'Bileşen Mimarisi & Responsive UI', successCriteria: 'React üzerinde temiz ve responsive arayüz basmak' },
        { day: 14, title: 'State & LocalStorage Katmanı', successCriteria: 'Dinamik form verilerini kaydetmek ve filtrelemek' },
        { day: 30, title: 'Canlı Uygulama & GitHub Portföyü', successCriteria: 'Vercel üzerinde yayında HTTPS demo ve README dokümanı' }
      ];
    } else {
      milestones = [
        { day: 7, title: 'Temel Kavramlar & İlk Pratik', successCriteria: 'Temel uygulama adımlarını ve ilk çıktıyı tamamlamak' },
        { day: 14, title: 'Orta Seviye Egzersizler & İlerleme', successCriteria: 'Orta aşama hedeflerini uygulamalı gerçekleştirmek' },
        { day: 30, title: 'Nihai Proje & Somut Kanıt', successCriteria: 'Hedefe özel tamamlanmış çıktıyı teslim etmek' }
      ];
    }

    let tasks: PlanTask[] = [];

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
    } else if (
      lowerTitle.includes('unreal') || 
      lowerTitle.includes('unrael') || 
      lowerTitle.includes('unity') || 
      lowerTitle.includes('oyun') || 
      lowerTitle.includes('game') || 
      lowerTitle.includes('godot')
    ) {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Unreal Engine 5 Kurulumu & 3D Viewport',
          description: 'Epic Games Launcher üzerinden Unreal Engine 5 aç, 3D Viewport görünümünü, Move/Rotate/Scale araçlarını ve sahne gezintisini (WASD) dene.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Sahneye temel Küp ve Işık (Directional Light) yerleştirmek',
          freeResourceUrl: 'https://dev.epicgames.com/community/unreal-engine/learning',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Aktörler (Actors) & Sahne Yerleşimi',
          description: 'Static Mesh Aktörlerini incele, materyal (Material) atama ve zemin/duvar mimarisini oluştur.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Basit 3D oda tasarımı tamamlamak',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'Blueprint Visual Scripting Mantığı',
          description: 'Kod yazmadan nod bazlı Blueprint sistemine gir. Event BeginPlay, Event Tick ve Print String nodlarını bağla.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Ekrana Blueprint ile mesaj yazdırmak',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Karakter Kontrolü & Girdi (Enhanced Input)',
          description: 'Third Person Character şablonunda klavye/fare hareket girdilerini incele, zıplama ve kamera açılarını ayarla.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Karakterin sahne içinde serbestçe hareket etmesini sağlamak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Fizik (Physics) & Çarpışma (Collisions)',
          description: 'Trigger Box çarpanı ekle, karaktere yaklaştığında açılan otomatik kapı veya ışık yakma Blueprint\'i hazırla.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Trigger Box ile kapı açma mekaniği kodlamak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Materyaller & Lumen Işıklandırma',
          description: 'PBR materyal parametrelerini (Base Color, Roughness, Metallic) bağla, Lumen dinamik ışıklandırmayı dene.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Gerçekçi kaplamalı ve ışıklı 3D ortam oluşturmak',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Oyun Paketi Alma (Windows EXE Build)',
          description: 'Projeni derle (Package Project -> Windows) ve bağımsız oynanabilir .exe oyun dosyasını oluştur.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Masaüstünde çalışan test oyun EXE çıktısını almak',
          status: 'pending'
        }
      ];
    } else if (
      lowerTitle.includes('python') || 
      lowerTitle.includes('pandas') || 
      lowerTitle.includes('bot') || 
      lowerTitle.includes('scraping') || 
      lowerTitle.includes('veri')
    ) {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Python Kurulumu & IDE Hazırlığı',
          description: 'Python 3.12 ve VS Code / PyCharm kurulumu yap, ilk `print("Hello Python")` scriptini çalıştır.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Python scriptini konsolda başarıyla çalıştırmak',
          freeResourceUrl: 'https://www.python.org',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Değişkenler, Veri Tipleri & Kontrol Yapıları',
          description: 'String, Integer, List, Dict tiplerini ve `if-else` koşullu ifadelerini çalış.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Koşullu karar yapısı içeren script yazmak',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'Döngüler (For/While) & Fonksiyonlar',
          description: 'Tekrarlayan işlemleri `for` döngüsü ile otomatize et, `def` ile kendi fonksiyonunu yaz.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Parametre alan ve sonuç dönen 2 fonksiyon yazmak',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Dosya İşlemleri & JSON Veri Yapıları',
          description: 'Python ile metin/JSON dosyası okuma ve yazma işlemlerini gerçekleştir.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'JSON verisini okuyup dosyaya yazmak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Requests & Web Scraper / Otomasyon',
          description: '`pip install requests beautifulsoup4` ile web sayfasından veri çekme egzersizi yap.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Web sayfasından veri çekip konsola basmak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Otomasyon Scripti Geliştirme',
          description: 'Çekilen verileri filtreleyip CSV/Excel formatında kaydeden otomasyon botunu tamamla.',
          taskType: 'coding',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Çalışan otomasyon script çıktısı elde etmek',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'GitHub Reposu & Dokümantasyon',
          description: 'Python scriptini GitHub üzerine yükle, requirements.txt ve README.md ekle.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'GitHub üzerinde kodları yayına almak',
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
      lowerTitle.includes('piano') || 
      lowerTitle.includes('piyano')
    ) {
      tasks = [
        {
          id: 'task-1',
          dayNumber: 1,
          title: 'Piyano Tuş Anatomisi & Temel Oturuş Pozisyonu',
          description: 'Piyanoda Do (C) sesini bulmayı öğren, 88 tuşlu klavye düzenini ve doğru oturuş/bilek pozisyonunu incele.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Klavyedeki tüm Do (C) seslerini doğru parmakla basmak',
          freeResourceUrl: 'https://www.youtube.com',
          status: 'pending'
        },
        {
          id: 'task-2',
          dayNumber: 2,
          title: 'Sağ El Sağlamlaştırma & Sol Anahtarı Notaları',
          description: 'Sağ el 1-5 parmak numaralandırmasını öğren ve Do-Re-Mi-Fa-Sol dizisini metronomla bas.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'Sağ el 5 parmak dizisini cızırtısız çalmak',
          status: 'pending'
        },
        {
          id: 'task-3',
          dayNumber: 3,
          title: 'Sol El Eşliği & Fa Anahtarı Giriş',
          description: 'Sol el ile Do ve Sol bas seslerini çal, çift el koordinasyonuna ilk adımı at.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Sol el bas seslerini ritme uygun vurmak',
          status: 'pending'
        },
        {
          id: 'task-4',
          dayNumber: 4,
          title: 'Temel Piyano Akorları: C (Do Majör) & G (Sol Majör)',
          description: '3 sesli Do Majör ve Sol Majör akor basılışlarını öğren ve parmak geçiş pratiği yap.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'İki akor arasında 4/4 tempo ile geçiş yapmak',
          status: 'pending'
        },
        {
          id: 'task-5',
          dayNumber: 5,
          title: 'Basit Melodi & Nota Takibi',
          description: 'Ode to Joy veya bildiğin başlangıç melodisini sağ el nota, sol el akor eşliğiyle birleştir.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 2,
          successCriteria: 'Melodiyi kesintisiz 1 dakika çalmak',
          status: 'pending'
        },
        {
          id: 'task-6',
          dayNumber: 6,
          title: 'Çift El Baştan Sona Şarkı İcrası',
          description: 'Öğrenilen melodiyi sol el akor eşliği ve sağ el melodisi ile ritme uygun icra et.',
          taskType: 'learning_and_practice',
          durationMinutes: input.dailyMinutes,
          difficulty: 3,
          successCriteria: 'Şarkıyı baştan sona çift el çalabilmek',
          status: 'pending'
        },
        {
          id: 'task-7',
          dayNumber: 7,
          title: 'Performans İncelemesi & Ses Kaydı',
          description: 'Çaldığın eseri telefonla ses kaydı al, dinle ve tempo aksaklıklarını gider.',
          taskType: 'review',
          durationMinutes: input.dailyMinutes,
          difficulty: 1,
          successCriteria: 'İlk piyano performans kaydını tamamlamak',
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
