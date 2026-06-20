/* =========================================================
   Resmiye Serbest — CV Sitesi · script.js
   Tema geçişi + 4 dilli (TR/EN/DE/AR) i18n + canlı sayaç
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var STORAGE_KEY = "cv-theme";
  var mql = window.matchMedia("(prefers-color-scheme: dark)");

  /* 1) Başlangıç teması: kayıtlı tercih > sistem tercihi > açık */
  function getInitialTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return mql.matches ? "dark" : "light";
  }

  /* 2) Temayı uygula ve düğme etiketini güncelle */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"
      );
    }
  }

  applyTheme(getInitialTheme());

  /* 3) Düğmeye tıklayınca temayı değiştir ve kaydet */
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* 4) Kullanıcı manuel seçim yapmadıysa sistem temasını izle */
  function onSystemChange(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  }

  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", onSystemChange);
  } else if (typeof mql.addListener === "function") {
    mql.addListener(onSystemChange); /* eski tarayıcı uyumu */
  }

  /* 5) Footer yılını otomatik güncelle */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================================
     6) ÇOK DİLLİ DESTEK (i18n) — TR / EN / DE / AR
     ========================================================= */
  var translations = {
    tr: {
      _meta: { name: "Türkçe", flag: "🇹🇷", code: "TR", locale: "tr-TR", dir: "ltr" },
      "nav.about": "Hakkımda",
      "nav.experience": "Deneyim",
      "nav.education": "Eğitim",
      "nav.skills": "Yetenekler",
      "nav.services": "Hizmetler",
      "nav.contact": "İletişim",
      "hero.eyebrow": "Merhaba, ben",
      "hero.role": "Otomasyon & Ar-Ge Tasarım Mühendisi",
      "hero.lead":
        "Kariyerimin farklı dönemlerinde hem Ar-Ge tasarım hem de endüstriyel otomasyon departmanlarında derinlemesine görev aldım. Her iki disiplinin de süreçlerine hâkim, tasarım masasından saha devreye almaya kadar uçtan uca düşünebilen çok yönlü bir mühendisim.",
      "hero.cta_contact": "İletişime Geç",
      "hero.cta_cv": "CV'yi İndir",
      "social.email": "E-posta",
      "social.location": "Serdivan, Sakarya",
      "about.title": "Hakkımda",
      "about.p1":
        "Mekatronik kökenli bir mühendis olarak iki ayrı disiplinde sağlam bir temel edindim. Ar-Ge tasarım dönemimde teknik tasarım, ürün geliştirme ve dokümantasyon süreçlerinde; otomasyon dönemimde ise PLC, HMI/SCADA ve saha devreye alma süreçlerinde uzmanlaştım. Bu çok yönlü altyapı, problemlere hem tasarım hem de uygulama gözüyle bakabilmemi sağlıyor.",
      "about.info_location": "Konum",
      "about.info_birth": "Doğum Tarihi",
      "about.info_license": "Ehliyet",
      "about.info_languages": "Diller",
      "about.info_languages_value": "İngilizce",
      "about.stat_disciplines": "Mühendislik Disiplini",
      "about.stat_roles": "Profesyonel Görev",
      "about.stat_academic": "Akademik Kademe",
      "exp.title": "İş Deneyimi",
      "exp.exp1_meta": "Temmuz 2024 — Eylül 2025",
      "exp.exp1_tag": "Otomasyon & Saha",
      "exp.exp1_role": "Otomasyon Mühendisi",
      "exp.exp1_p1": "Endüstriyel otomasyon sistemlerinin sahada devreye alınması ve test edilmesi.",
      "exp.exp1_p2": "Sistem arızalarının teşhisi, hata giderme ve kesintisiz üretim sürekliliğinin sağlanması.",
      "exp.exp1_p3": "PLC ve sürücü parametrelerinin optimize edilerek sistem veriminin artırılması.",
      "exp.exp2_meta": "Kasım 2023 — Temmuz 2024",
      "exp.exp2_tag": "Ar-Ge & Teknik Tasarım",
      "exp.exp2_role": "Proje Mühendisi",
      "exp.exp2_p1": "Ürün ve sistemlerin teknik resimlerinin çıkartılması ve üretime aktarılması.",
      "exp.exp2_p2": "Doğru montajın sağlanması için tasarım ile üretim arasında köprü kurulması.",
      "exp.exp2_p3": "Ar-Ge projelerinin tasarımı, dokümantasyonu ve sürekli geliştirilmesi.",
      "edu.title": "Eğitim",
      "edu.edu1_meta": "Şubat 2025 — Günümüz",
      "edu.edu1_degree": "Yüksek Lisans · Mekatronik",
      "edu.edu1_tag": "Devam ediyor",
      "edu.edu2_meta": "Ekim 2021 — Ağustos 2024",
      "edu.edu2_degree": "Lisans · Mekatronik Mühendisliği",
      "edu.edu2_tag": "GNO 2.49",
      "edu.edu3_meta": "Eylül 2018 — Haziran 2020",
      "edu.edu3_degree": "Ön Lisans · Mekatronik Programı",
      "edu.edu3_tag": "GNO 3.43",
      "edu.edu4_meta": "Eylül 2012 — Haziran 2016",
      "edu.edu4_degree": "Lise · Bilişim Teknolojileri / Web Programcılığı",
      "edu.edu4_tag": "Diploma 81",
      "skills.title": "Yetenekler",
      "skills.g1_title": "Otomasyon & Saha Mühendisliği",
      "skills.g1_s1": "PLC Programlama",
      "skills.g1_s2": "HMI/SCADA Tasarımı",
      "skills.g1_s3": "Sürücü Sistemleri",
      "skills.g1_s4": "Saha Devreye Alma",
      "skills.g1_s5": "Endüstriyel Haberleşme Protokolleri",
      "skills.g2_title": "Ar-Ge & Teknik Tasarım",
      "skills.g2_s1": "CAD/CAM Modelleme (SolidWorks · AutoCAD · Inventor)",
      "skills.g2_s2": "Ürün Geliştirme",
      "skills.g2_s3": "Prototipleme",
      "skills.g2_s4": "Mekanik/Elektriksel Tasarım Süreçleri",
      "skills.g2_s5": "İnovasyon & Konsept Tasarım",
      "skills.g3_title": "Yapay Zeka & Mühendislik Teknolojileri",
      "skills.g3_s1": "Mühendislik & Yazılım Süreçlerinde AI Entegrasyonu",
      "skills.g3_s2": "Claude Code · LLM Prompt Engineering",
      "skills.g3_s3": "Otonom Kodlama Asistanlığı",
      "skills.g3_s4": "Veri Analizi",
      "skills.g3_s5": "İnovatif Teknoloji Okuryazarlığı",
      "services.title": "Mühendislik Çözüm Ortaklığı & Elektrik Hizmetleri",
      "services.intro":
        "Geniş uzman ağımız ve stratejik çözüm ortaklarımızla, endüstriyel tesislerden konut projelerine kadar uçtan uca elektrik, projelendirme ve taahhüt hizmetleri sunuyoruz.",
      "services.s1_title": "Elektrik Keşif, Metraj & Hakediş",
      "services.s1_desc": "Saha keşfi, metraj çıkarımı ve hakediş hazırlama hizmetleri.",
      "services.s2_title": "Teknik Şartname & Danışmanlık",
      "services.s2_desc": "Teknik şartname, tekliflendirme ve mühendislik danışmanlığı.",
      "services.s3_title": "Ruhsat & Uygulama Projeleri",
      "services.s3_desc": "Ruhsat ve uygulama projelerinin çizimi ve onay süreçleri.",
      "services.s4_title": "Endüstriyel Tesis & GES Projeleri",
      "services.s4_desc": "Endüstriyel tesis ve Güneş Enerji Santrali (GES) projelendirmesi.",
      "services.s5_title": "Villa, Konut & Taahhüt İşleri",
      "services.s5_desc": "Villa ve konut elektrik uygulamaları ile anahtar teslim taahhüt.",
      "quote.title": "Hizmet / Proje Teklif Talebi",
      "quote.subtitle": "Projenizin detaylarını bırakın, en kısa sürede sizinle iletişime geçelim.",
      "form.name_label": "Ad Soyad",
      "form.name_ph": "Adınız Soyadınız",
      "form.email_label": "E-posta",
      "form.email_ph": "ornek@eposta.com",
      "form.service_label": "Hizmet Kategorisi",
      "form.service_opt0": "Bir hizmet seçin…",
      "form.service_opt1": "Elektrik Keşif, Metraj & Hakediş Hazırlama",
      "form.service_opt2": "Teknik Şartname, Tekliflendirme ve Danışmanlık",
      "form.service_opt3": "Ruhsat & Uygulama Projeleri Çizimi",
      "form.service_opt4": "Endüstriyel Tesis & GES Projeleri",
      "form.service_opt5": "Villa, Konut Elektrik Uygulamaları & Taahhüt",
      "form.service_opt6": "Diğer / Genel Danışmanlık",
      "form.details_label": "Proje Detayları",
      "form.details_ph": "Projenizin kapsamı, konumu ve beklentileriniz…",
      "form.submit": "Teklif Talebi Gönder",
      "form.status": "Teşekkürler {name}! E-posta uygulamanız taslakla açılıyor.",
      "form.mail_subject": "Teklif Talebi — {service}",
      "form.mail_name": "Ad Soyad",
      "form.mail_email": "E-posta",
      "form.mail_service": "Hizmet Kategorisi",
      "form.mail_details": "Proje Detayları",
      "contact.title": "İletişim",
      "contact.lead": "Otomasyon ve Ar-Ge tasarım projeleri ile iş birlikleri için bana her zaman ulaşabilirsiniz.",
      "badge.total": "Toplam {n} ziyaret",
      "badge.live": "• Şu an sayfada {n} ziyaretçi var",
      "badge.total_short": "Toplam: {n}",
      "badge.live_short": "Canlı: {n}"
    },

    en: {
      _meta: { name: "English", flag: "🇬🇧", code: "EN", locale: "en-US", dir: "ltr" },
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.education": "Education",
      "nav.skills": "Skills",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "hero.eyebrow": "Hello, I'm",
      "hero.role": "Automation & R&D Design Engineer",
      "hero.lead":
        "Across different stages of my career I have worked in depth in both R&D design and industrial automation departments. I am a versatile engineer who has mastered the processes of both disciplines and can think end-to-end, from the design desk to on-site commissioning.",
      "hero.cta_contact": "Get in Touch",
      "hero.cta_cv": "Download CV",
      "social.email": "Email",
      "social.location": "Serdivan, Sakarya",
      "about.title": "About Me",
      "about.p1":
        "As an engineer with a mechatronics background, I have built a solid foundation in two distinct disciplines. During my R&D design period I specialised in technical design, product development and documentation; in my automation period I focused on PLC, HMI/SCADA and on-site commissioning. This versatile background lets me approach problems with both a design and an implementation perspective.",
      "about.info_location": "Location",
      "about.info_birth": "Date of Birth",
      "about.info_license": "Driving Licence",
      "about.info_languages": "Languages",
      "about.info_languages_value": "English",
      "about.stat_disciplines": "Engineering Disciplines",
      "about.stat_roles": "Professional Roles",
      "about.stat_academic": "Academic Levels",
      "exp.title": "Work Experience",
      "exp.exp1_meta": "July 2024 — September 2025",
      "exp.exp1_tag": "Automation & Field",
      "exp.exp1_role": "Automation Engineer",
      "exp.exp1_p1": "On-site commissioning and testing of industrial automation systems.",
      "exp.exp1_p2": "Diagnosing system faults, troubleshooting and ensuring uninterrupted production continuity.",
      "exp.exp1_p3": "Improving system efficiency by optimising PLC and drive parameters.",
      "exp.exp2_meta": "November 2023 — July 2024",
      "exp.exp2_tag": "R&D & Technical Design",
      "exp.exp2_role": "Project Engineer",
      "exp.exp2_p1": "Producing technical drawings of products and systems and transferring them to production.",
      "exp.exp2_p2": "Bridging design and production to ensure correct assembly.",
      "exp.exp2_p3": "Design, documentation and continuous improvement of R&D projects.",
      "edu.title": "Education",
      "edu.edu1_meta": "February 2025 — Present",
      "edu.edu1_degree": "Master's · Mechatronics",
      "edu.edu1_tag": "Ongoing",
      "edu.edu2_meta": "October 2021 — August 2024",
      "edu.edu2_degree": "Bachelor's · Mechatronics Engineering",
      "edu.edu2_tag": "GPA 2.49",
      "edu.edu3_meta": "September 2018 — June 2020",
      "edu.edu3_degree": "Associate Degree · Mechatronics Program",
      "edu.edu3_tag": "GPA 3.43",
      "edu.edu4_meta": "September 2012 — June 2016",
      "edu.edu4_degree": "High School · Information Technologies / Web Programming",
      "edu.edu4_tag": "Diploma 81",
      "skills.title": "Skills",
      "skills.g1_title": "Automation & Field Engineering",
      "skills.g1_s1": "PLC Programming",
      "skills.g1_s2": "HMI/SCADA Design",
      "skills.g1_s3": "Drive Systems",
      "skills.g1_s4": "On-Site Commissioning",
      "skills.g1_s5": "Industrial Communication Protocols",
      "skills.g2_title": "R&D & Technical Design",
      "skills.g2_s1": "CAD/CAM Modelling (SolidWorks · AutoCAD · Inventor)",
      "skills.g2_s2": "Product Development",
      "skills.g2_s3": "Prototyping",
      "skills.g2_s4": "Mechanical/Electrical Design Processes",
      "skills.g2_s5": "Innovation & Concept Design",
      "skills.g3_title": "Artificial Intelligence & Engineering Technologies",
      "skills.g3_s1": "AI Integration in Engineering & Software Processes",
      "skills.g3_s2": "Claude Code · LLM Prompt Engineering",
      "skills.g3_s3": "Autonomous Coding Assistance",
      "skills.g3_s4": "Data Analysis",
      "skills.g3_s5": "Innovative Technology Literacy",
      "services.title": "Engineering Solution Partnership & Electrical Services",
      "services.intro":
        "With our broad network of experts and strategic solution partners, we deliver end-to-end electrical, engineering and turnkey contracting services — from industrial facilities to residential projects.",
      "services.s1_title": "Electrical Survey, Quantity Take-off & Progress Billing",
      "services.s1_desc": "Site surveys, quantity take-off and progress payment (billing) preparation services.",
      "services.s2_title": "Technical Specification & Consultancy",
      "services.s2_desc": "Technical specifications, tendering and engineering consultancy.",
      "services.s3_title": "Permit & Application Projects",
      "services.s3_desc": "Drafting of permit and application projects and approval processes.",
      "services.s4_title": "Industrial Facility & Solar Power Plant Projects",
      "services.s4_desc": "Engineering of industrial facilities and solar power plants (SPP).",
      "services.s5_title": "Villa, Residential & Contracting Works",
      "services.s5_desc": "Villa and residential electrical works with turnkey contracting.",
      "quote.title": "Service / Project Quote Request",
      "quote.subtitle": "Leave the details of your project and we will get back to you as soon as possible.",
      "form.name_label": "Full Name",
      "form.name_ph": "Your Full Name",
      "form.email_label": "Email",
      "form.email_ph": "example@email.com",
      "form.service_label": "Service Category",
      "form.service_opt0": "Select a service…",
      "form.service_opt1": "Electrical Survey, Quantity Take-off & Progress Billing",
      "form.service_opt2": "Technical Specification, Tendering & Consultancy",
      "form.service_opt3": "Drafting of Permit & Application Projects",
      "form.service_opt4": "Industrial Facility & Solar Power Plant Projects",
      "form.service_opt5": "Villa & Residential Electrical Works & Contracting",
      "form.service_opt6": "Other / General Consultancy",
      "form.details_label": "Project Details",
      "form.details_ph": "Scope, location and expectations of your project…",
      "form.submit": "Send Quote Request",
      "form.status": "Thank you {name}! Your email app is opening with a draft.",
      "form.mail_subject": "Quote Request — {service}",
      "form.mail_name": "Full Name",
      "form.mail_email": "Email",
      "form.mail_service": "Service Category",
      "form.mail_details": "Project Details",
      "contact.title": "Contact",
      "contact.lead": "You can always reach me for collaborations on automation and R&D design projects.",
      "badge.total": "{n} total visits",
      "badge.live": "• {n} visitors on the page now",
      "badge.total_short": "Total: {n}",
      "badge.live_short": "Live: {n}"
    },

    de: {
      _meta: { name: "Deutsch", flag: "🇩🇪", code: "DE", locale: "de-DE", dir: "ltr" },
      "nav.about": "Über mich",
      "nav.experience": "Erfahrung",
      "nav.education": "Ausbildung",
      "nav.skills": "Fähigkeiten",
      "nav.services": "Leistungen",
      "nav.contact": "Kontakt",
      "hero.eyebrow": "Hallo, ich bin",
      "hero.role": "Automatisierungs- & F&E-Konstruktionsingenieurin",
      "hero.lead":
        "In verschiedenen Phasen meiner Laufbahn war ich sowohl in der F&E-Konstruktion als auch in der industriellen Automatisierung intensiv tätig. Ich bin eine vielseitige Ingenieurin, die die Prozesse beider Disziplinen beherrscht und end-to-end denkt – vom Konstruktionstisch bis zur Inbetriebnahme vor Ort.",
      "hero.cta_contact": "Kontakt aufnehmen",
      "hero.cta_cv": "Lebenslauf herunterladen",
      "social.email": "E-Mail",
      "social.location": "Serdivan, Sakarya",
      "about.title": "Über mich",
      "about.p1":
        "Als Ingenieurin mit Mechatronik-Hintergrund habe ich in zwei unterschiedlichen Disziplinen ein solides Fundament aufgebaut. In meiner F&E-Phase habe ich mich auf technische Konstruktion, Produktentwicklung und Dokumentation spezialisiert; in meiner Automatisierungsphase auf SPS, HMI/SCADA und die Inbetriebnahme vor Ort. Dieser vielseitige Hintergrund erlaubt es mir, Probleme sowohl aus Konstruktions- als auch aus Umsetzungssicht zu betrachten.",
      "about.info_location": "Standort",
      "about.info_birth": "Geburtsdatum",
      "about.info_license": "Führerschein",
      "about.info_languages": "Sprachen",
      "about.info_languages_value": "Englisch",
      "about.stat_disciplines": "Ingenieurdisziplinen",
      "about.stat_roles": "Berufliche Positionen",
      "about.stat_academic": "Akademische Stufen",
      "exp.title": "Berufserfahrung",
      "exp.exp1_meta": "Juli 2024 — September 2025",
      "exp.exp1_tag": "Automatisierung & Feld",
      "exp.exp1_role": "Automatisierungsingenieurin",
      "exp.exp1_p1": "Inbetriebnahme und Test industrieller Automatisierungssysteme vor Ort.",
      "exp.exp1_p2": "Diagnose von Systemstörungen, Fehlerbehebung und Sicherstellung einer unterbrechungsfreien Produktion.",
      "exp.exp1_p3": "Steigerung der Systemeffizienz durch Optimierung von SPS- und Antriebsparametern.",
      "exp.exp2_meta": "November 2023 — Juli 2024",
      "exp.exp2_tag": "F&E & Technische Konstruktion",
      "exp.exp2_role": "Projektingenieurin",
      "exp.exp2_p1": "Erstellung technischer Zeichnungen von Produkten und Systemen und Überführung in die Produktion.",
      "exp.exp2_p2": "Brückenschlag zwischen Konstruktion und Produktion zur Sicherstellung der korrekten Montage.",
      "exp.exp2_p3": "Konstruktion, Dokumentation und kontinuierliche Verbesserung von F&E-Projekten.",
      "edu.title": "Ausbildung",
      "edu.edu1_meta": "Februar 2025 — Heute",
      "edu.edu1_degree": "Master · Mechatronik",
      "edu.edu1_tag": "Laufend",
      "edu.edu2_meta": "Oktober 2021 — August 2024",
      "edu.edu2_degree": "Bachelor · Mechatronik-Ingenieurwesen",
      "edu.edu2_tag": "Notenschnitt 2,49",
      "edu.edu3_meta": "September 2018 — Juni 2020",
      "edu.edu3_degree": "Vordiplom · Mechatronik-Programm",
      "edu.edu3_tag": "Notenschnitt 3,43",
      "edu.edu4_meta": "September 2012 — Juni 2016",
      "edu.edu4_degree": "Gymnasium · Informationstechnologie / Webprogrammierung",
      "edu.edu4_tag": "Diplom 81",
      "skills.title": "Fähigkeiten",
      "skills.g1_title": "Automatisierung & Feldtechnik",
      "skills.g1_s1": "SPS-Programmierung",
      "skills.g1_s2": "HMI/SCADA-Design",
      "skills.g1_s3": "Antriebssysteme",
      "skills.g1_s4": "Inbetriebnahme vor Ort",
      "skills.g1_s5": "Industrielle Kommunikationsprotokolle",
      "skills.g2_title": "F&E & Technische Konstruktion",
      "skills.g2_s1": "CAD/CAM-Modellierung (SolidWorks · AutoCAD · Inventor)",
      "skills.g2_s2": "Produktentwicklung",
      "skills.g2_s3": "Prototyping",
      "skills.g2_s4": "Mechanische/Elektrische Konstruktionsprozesse",
      "skills.g2_s5": "Innovation & Konzeptdesign",
      "skills.g3_title": "Künstliche Intelligenz & Ingenieurtechnologien",
      "skills.g3_s1": "KI-Integration in Ingenieur- & Softwareprozesse",
      "skills.g3_s2": "Claude Code · LLM Prompt Engineering",
      "skills.g3_s3": "Autonome Programmierassistenz",
      "skills.g3_s4": "Datenanalyse",
      "skills.g3_s5": "Innovative Technologiekompetenz",
      "services.title": "Engineering-Lösungspartnerschaft & Elektrodienstleistungen",
      "services.intro":
        "Mit unserem breiten Expertennetzwerk und strategischen Lösungspartnern bieten wir durchgängige Elektro-, Planungs- und schlüsselfertige Auftragsleistungen – von Industrieanlagen bis zu Wohnprojekten.",
      "services.s1_title": "Elektro-Aufmaß, Mengenermittlung & Abrechnung",
      "services.s1_desc": "Vor-Ort-Aufnahme, Mengenermittlung und Erstellung von Abrechnungen.",
      "services.s2_title": "Technische Spezifikation & Beratung",
      "services.s2_desc": "Technische Spezifikationen, Angebotserstellung und Ingenieurberatung.",
      "services.s3_title": "Genehmigungs- & Ausführungsprojekte",
      "services.s3_desc": "Erstellung von Genehmigungs- und Ausführungsprojekten sowie Freigabeprozesse.",
      "services.s4_title": "Industrieanlagen- & Solarkraftwerk-Projekte",
      "services.s4_desc": "Planung von Industrieanlagen und Solarkraftwerken (PV).",
      "services.s5_title": "Villa-, Wohn- & Auftragsarbeiten",
      "services.s5_desc": "Elektroarbeiten für Villen und Wohnungen mit schlüsselfertiger Ausführung.",
      "quote.title": "Dienstleistungs- / Projektanfrage",
      "quote.subtitle": "Hinterlassen Sie die Details Ihres Projekts, wir melden uns schnellstmöglich bei Ihnen.",
      "form.name_label": "Vor- und Nachname",
      "form.name_ph": "Ihr Vor- und Nachname",
      "form.email_label": "E-Mail",
      "form.email_ph": "beispiel@email.com",
      "form.service_label": "Leistungskategorie",
      "form.service_opt0": "Wählen Sie eine Leistung…",
      "form.service_opt1": "Elektro-Aufmaß, Mengenermittlung & Abrechnung",
      "form.service_opt2": "Technische Spezifikation, Angebot & Beratung",
      "form.service_opt3": "Erstellung von Genehmigungs- & Ausführungsprojekten",
      "form.service_opt4": "Industrieanlagen- & Solarkraftwerk-Projekte",
      "form.service_opt5": "Villa- & Wohnungselektrik & Auftragsausführung",
      "form.service_opt6": "Sonstiges / Allgemeine Beratung",
      "form.details_label": "Projektdetails",
      "form.details_ph": "Umfang, Standort und Erwartungen Ihres Projekts…",
      "form.submit": "Anfrage senden",
      "form.status": "Vielen Dank {name}! Ihre E-Mail-App öffnet sich mit einem Entwurf.",
      "form.mail_subject": "Angebotsanfrage — {service}",
      "form.mail_name": "Vor- und Nachname",
      "form.mail_email": "E-Mail",
      "form.mail_service": "Leistungskategorie",
      "form.mail_details": "Projektdetails",
      "contact.title": "Kontakt",
      "contact.lead": "Für Kooperationen bei Automatisierungs- und F&E-Konstruktionsprojekten können Sie mich jederzeit erreichen.",
      "badge.total": "Insgesamt {n} Besuche",
      "badge.live": "• {n} Besucher gerade auf der Seite",
      "badge.total_short": "Gesamt: {n}",
      "badge.live_short": "Live: {n}"
    },

    ar: {
      _meta: { name: "العربية", flag: "🇸🇦", code: "AR", locale: "ar-EG", dir: "rtl" },
      "nav.about": "نبذة عني",
      "nav.experience": "الخبرة",
      "nav.education": "التعليم",
      "nav.skills": "المهارات",
      "nav.services": "الخدمات",
      "nav.contact": "تواصل",
      "hero.eyebrow": "مرحبًا، أنا",
      "hero.role": "مهندسة أتمتة وتصميم بحث وتطوير",
      "hero.lead":
        "خلال مراحل مختلفة من مسيرتي المهنية عملت بعمق في قسمي تصميم البحث والتطوير والأتمتة الصناعية. أنا مهندسة متعددة المهارات أتقن عمليات كلا التخصصين وأفكر بشكل متكامل من طاولة التصميم حتى التشغيل في الموقع.",
      "hero.cta_contact": "تواصل معي",
      "hero.cta_cv": "تحميل السيرة الذاتية",
      "social.email": "البريد الإلكتروني",
      "social.location": "سيرديفان، ساكاريا",
      "about.title": "نبذة عني",
      "about.p1":
        "بصفتي مهندسة ذات خلفية في الميكاترونيكس، بنيت أساسًا متينًا في تخصصين مختلفين. خلال فترة البحث والتطوير تخصصت في التصميم الفني وتطوير المنتجات والتوثيق؛ وفي فترة الأتمتة ركزت على وحدات التحكم المنطقية القابلة للبرمجة (PLC) وأنظمة HMI/SCADA والتشغيل في الموقع. تتيح لي هذه الخلفية المتنوعة معالجة المشكلات من منظوري التصميم والتنفيذ معًا.",
      "about.info_location": "الموقع",
      "about.info_birth": "تاريخ الميلاد",
      "about.info_license": "رخصة القيادة",
      "about.info_languages": "اللغات",
      "about.info_languages_value": "الإنجليزية",
      "about.stat_disciplines": "تخصصات هندسية",
      "about.stat_roles": "مناصب مهنية",
      "about.stat_academic": "مراحل أكاديمية",
      "exp.title": "الخبرة العملية",
      "exp.exp1_meta": "يوليو 2024 — سبتمبر 2025",
      "exp.exp1_tag": "الأتمتة والميدان",
      "exp.exp1_role": "مهندسة أتمتة",
      "exp.exp1_p1": "تشغيل واختبار أنظمة الأتمتة الصناعية في الموقع.",
      "exp.exp1_p2": "تشخيص أعطال الأنظمة وإصلاحها وضمان استمرارية الإنتاج دون انقطاع.",
      "exp.exp1_p3": "رفع كفاءة النظام من خلال تحسين معاملات الـ PLC وأنظمة المحركات.",
      "exp.exp2_meta": "نوفمبر 2023 — يوليو 2024",
      "exp.exp2_tag": "البحث والتطوير والتصميم الفني",
      "exp.exp2_role": "مهندسة مشاريع",
      "exp.exp2_p1": "إعداد الرسومات الفنية للمنتجات والأنظمة ونقلها إلى الإنتاج.",
      "exp.exp2_p2": "الربط بين التصميم والإنتاج لضمان التركيب الصحيح.",
      "exp.exp2_p3": "تصميم مشاريع البحث والتطوير وتوثيقها وتطويرها المستمر.",
      "edu.title": "التعليم",
      "edu.edu1_meta": "فبراير 2025 — حتى الآن",
      "edu.edu1_degree": "ماجستير · ميكاترونيكس",
      "edu.edu1_tag": "مستمر",
      "edu.edu2_meta": "أكتوبر 2021 — أغسطس 2024",
      "edu.edu2_degree": "بكالوريوس · هندسة الميكاترونيكس",
      "edu.edu2_tag": "المعدل 2.49",
      "edu.edu3_meta": "سبتمبر 2018 — يونيو 2020",
      "edu.edu3_degree": "دبلوم · برنامج الميكاترونيكس",
      "edu.edu3_tag": "المعدل 3.43",
      "edu.edu4_meta": "سبتمبر 2012 — يونيو 2016",
      "edu.edu4_degree": "ثانوية · تقنية المعلومات / برمجة الويب",
      "edu.edu4_tag": "الشهادة 81",
      "skills.title": "المهارات",
      "skills.g1_title": "هندسة الأتمتة والميدان",
      "skills.g1_s1": "برمجة وحدات التحكم المنطقية (PLC)",
      "skills.g1_s2": "تصميم HMI/SCADA",
      "skills.g1_s3": "أنظمة المحركات (Drives)",
      "skills.g1_s4": "التشغيل في الموقع",
      "skills.g1_s5": "بروتوكولات الاتصال الصناعي",
      "skills.g2_title": "البحث والتطوير والتصميم الفني",
      "skills.g2_s1": "النمذجة CAD/CAM (SolidWorks · AutoCAD · Inventor)",
      "skills.g2_s2": "تطوير المنتجات",
      "skills.g2_s3": "بناء النماذج الأولية",
      "skills.g2_s4": "عمليات التصميم الميكانيكي/الكهربائي",
      "skills.g2_s5": "الابتكار والتصميم المفاهيمي",
      "skills.g3_title": "الذكاء الاصطناعي وتقنيات الهندسة",
      "skills.g3_s1": "دمج الذكاء الاصطناعي في العمليات الهندسية والبرمجية",
      "skills.g3_s2": "Claude Code · هندسة موجّهات النماذج اللغوية",
      "skills.g3_s3": "المساعدة في البرمجة الذاتية",
      "skills.g3_s4": "تحليل البيانات",
      "skills.g3_s5": "الإلمام بالتقنيات المبتكرة",
      "services.title": "شراكة الحلول الهندسية والخدمات الكهربائية",
      "services.intro":
        "بفضل شبكتنا الواسعة من الخبراء وشركاء الحلول الاستراتيجيين، نقدم خدمات كهربائية وهندسية ومقاولات متكاملة من الألف إلى الياء — من المنشآت الصناعية إلى المشاريع السكنية.",
      "services.s1_title": "المسح الكهربائي والحصر والمستخلصات",
      "services.s1_desc": "خدمات المسح الميداني وحساب الكميات وإعداد المستخلصات.",
      "services.s2_title": "المواصفات الفنية والاستشارات",
      "services.s2_desc": "المواصفات الفنية وإعداد العروض والاستشارات الهندسية.",
      "services.s3_title": "مشاريع التراخيص والتنفيذ",
      "services.s3_desc": "إعداد مشاريع التراخيص والتنفيذ وإجراءات الموافقة.",
      "services.s4_title": "مشاريع المنشآت الصناعية ومحطات الطاقة الشمسية",
      "services.s4_desc": "هندسة المنشآت الصناعية ومحطات الطاقة الشمسية.",
      "services.s5_title": "أعمال الفلل والمساكن والمقاولات",
      "services.s5_desc": "أعمال كهرباء الفلل والمساكن مع التنفيذ بنظام تسليم المفتاح.",
      "quote.title": "طلب عرض سعر للخدمة / المشروع",
      "quote.subtitle": "اترك تفاصيل مشروعك وسنتواصل معك في أقرب وقت ممكن.",
      "form.name_label": "الاسم الكامل",
      "form.name_ph": "اسمك الكامل",
      "form.email_label": "البريد الإلكتروني",
      "form.email_ph": "example@email.com",
      "form.service_label": "فئة الخدمة",
      "form.service_opt0": "اختر خدمة…",
      "form.service_opt1": "المسح الكهربائي والحصر وإعداد المستخلصات",
      "form.service_opt2": "المواصفات الفنية وإعداد العروض والاستشارات",
      "form.service_opt3": "إعداد مشاريع التراخيص والتنفيذ",
      "form.service_opt4": "مشاريع المنشآت الصناعية ومحطات الطاقة الشمسية",
      "form.service_opt5": "أعمال كهرباء الفلل والمساكن والمقاولات",
      "form.service_opt6": "أخرى / استشارات عامة",
      "form.details_label": "تفاصيل المشروع",
      "form.details_ph": "نطاق مشروعك وموقعه وتوقعاتك…",
      "form.submit": "إرسال طلب العرض",
      "form.status": "شكرًا لك {name}! يتم فتح تطبيق البريد لديك بمسودة.",
      "form.mail_subject": "طلب عرض سعر — {service}",
      "form.mail_name": "الاسم الكامل",
      "form.mail_email": "البريد الإلكتروني",
      "form.mail_service": "فئة الخدمة",
      "form.mail_details": "تفاصيل المشروع",
      "contact.title": "تواصل",
      "contact.lead": "يمكنك دائمًا التواصل معي من أجل التعاون في مشاريع الأتمتة وتصميم البحث والتطوير.",
      "badge.total": "إجمالي {n} زيارة",
      "badge.live": "• يوجد {n} زائر على الصفحة الآن",
      "badge.total_short": "الإجمالي: {n}",
      "badge.live_short": "مباشر: {n}"
    }
  };

  var LANG_KEY = "cv-lang";
  var SUPPORTED = ["tr", "en", "de", "ar"];
  var currentLang = "tr";

  function t(key) {
    var dict = translations[currentLang] || translations.tr;
    return dict[key] != null ? dict[key] : (translations.tr[key] || key);
  }

  function format(str, vars) {
    return str.replace(/\{(\w+)\}/g, function (m, k) {
      return vars && vars[k] != null ? vars[k] : m;
    });
  }

  /* Tüm [data-i18n] ve [data-i18n-ph] öğelerini seçili dile çevir */
  function translatePage(lang) {
    var dict = translations[lang] || translations.tr;
    var meta = dict._meta;

    /* <html> lang ve yön (dir) ayarı — Arapça için RTL */
    root.setAttribute("lang", lang);
    root.setAttribute("dir", meta.dir);

    /* Metin içerikleri */
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (dict[key] != null) nodes[i].textContent = dict[key];
    }

    /* Placeholder'lar */
    var phNodes = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < phNodes.length; j++) {
      var phKey = phNodes[j].getAttribute("data-i18n-ph");
      if (dict[phKey] != null) phNodes[j].setAttribute("placeholder", dict[phKey]);
    }

    /* Select kutusunda seçili dili işaretle */
    var selectEl = document.getElementById("lang-select");
    if (selectEl && selectEl.value !== lang) selectEl.value = lang;
  }

  function setLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "tr";
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    translatePage(lang);
    renderBadge(); /* sayaç metnini de yeni dile çevir */
  }

  function getInitialLang() {
    var saved;
    try {
      saved = localStorage.getItem(LANG_KEY);
    } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "tr").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : "tr";
  }

  /* Dil seçimi — native <select> değişikliğini dinle */
  var langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", function () {
      setLanguage(langSelect.value);
    });
  }

  /* =========================================================
     7) Teklif Talebi formu — seçili dile göre e-posta taslağı
     ========================================================= */
  var form = document.getElementById("quote-form");
  var status = document.getElementById("quote-status");
  var TARGET_EMAIL = "rsmyserbest@gmail.com";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var details = form.details.value.trim();

      var subject = format(t("form.mail_subject"), { service: service });
      var body =
        t("form.mail_name") + ": " + name + "\n" +
        t("form.mail_email") + ": " + email + "\n" +
        t("form.mail_service") + ": " + service + "\n\n" +
        t("form.mail_details") + ":\n" + details + "\n";

      var mailto =
        "mailto:" + TARGET_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      if (status) {
        status.textContent = format(t("form.status"), { name: name });
      }
      form.reset();
    });
  }

  /* =========================================================
     8) Ziyaretçi sayacı — toplam (localStorage) + anlık (simülasyon)
     ========================================================= */
  var totalEl = document.querySelector(".visit-badge__total");
  var liveEl = document.querySelector(".visit-badge__live");
  var visitTotal = 1;
  var activeNow = 2;
  var badgeMq = window.matchMedia("(max-width: 480px)");

  function renderBadge() {
    if (!totalEl || !liveEl) return;
    var nTotal = visitTotal.toLocaleString(
      (translations[currentLang]._meta.locale) || "tr-TR"
    );
    if (badgeMq.matches) {
      totalEl.innerHTML =
        format(t("badge.total_short"), { n: "<strong>" + nTotal + "</strong>" });
      liveEl.innerHTML =
        format(t("badge.live_short"), { n: "<strong>" + activeNow + "</strong>" });
    } else {
      totalEl.innerHTML =
        format(t("badge.total"), { n: "<strong>" + nTotal + "</strong>" });
      liveEl.innerHTML =
        format(t("badge.live"), { n: "<strong>" + activeNow + "</strong>" });
    }
  }

  if (totalEl && liveEl) {
    var VISIT_KEY = "cv-visit-count";
    try {
      var stored = parseInt(localStorage.getItem(VISIT_KEY), 10);
      visitTotal = (isNaN(stored) ? 0 : stored) + 1;
      localStorage.setItem(VISIT_KEY, String(visitTotal));
    } catch (e) {
      visitTotal = 1;
    }

    function tickActive() {
      activeNow = 1 + Math.floor(Math.random() * 3); /* 1, 2 veya 3 */
      renderBadge();
      window.setTimeout(tickActive, 3000 + Math.random() * 4000); /* 3–7 sn */
    }

    if (badgeMq.addEventListener) {
      badgeMq.addEventListener("change", renderBadge);
    } else if (badgeMq.addListener) {
      badgeMq.addListener(renderBadge);
    }

    tickActive();
  }

  /* =========================================================
     9) Başlangıç dilini uygula (her şey hazırlandıktan sonra)
     ========================================================= */
  setLanguage(getInitialLang());
})();
