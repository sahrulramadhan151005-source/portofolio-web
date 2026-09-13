'use client';

import { useState, useEffect, useRef } from 'react';
import { portfolioData } from './portfolio';

interface NavItem {
  id: string;
  label: string;
  path: string;
}

interface EducationItem {
  institution: string;
  major: string;
  period: string;
}

interface ExperienceItem {
  title: string;
  desc: string;
  period: string;
}

interface PhotoItem {
  title: string;
  category: string;
  image: string;
}

interface CertificateItem {
  title: string;
  category: string;
  image: string;
}

interface VideoItem {
  title: string;
  description: string;
  file: string;
}

interface DocumentItem {
  title: string;
  description: string;
  file: string;
}

interface CommentItem {
  name: string;
  comment: string;
  time: string;
}

export default function Home() {
  const { profile, initialComments, documents, videos } = portfolioData.example;
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('#home');
  const [portfolioFilter, setPortfolioFilter] = useState('documents');
  const [portfolioSearch, setPortfolioSearch] = useState('');

  // Contact form state (FormSubmit integration)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [lang, setLang] = useState<'id' | 'en' | 'su' | 'jp' | 'kr'>('id');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableLanguages = [
    { code: 'en', label: 'ENGLISH' },
    { code: 'id', label: 'INDONESIA' },
    { code: 'su', label: 'SUNDA' },
    { code: 'jp', label: 'JAPANESE' },
    { code: 'kr', label: 'KOREAN' }
  ];

  const translations = {
    id: {
      nav: [{ id: 'home', label: 'Home', path: '#home' }, { id: 'about', label: 'About', path: '#about' }, { id: 'portfolio', label: 'Portfolio', path: '#portfolio' }, { id: 'contact', label: 'Contact', path: '#contact' }] as NavItem[],
      student: "Mahasiswa S1 Manajemen Bisnis",
      tagline: "Integritas, Kepemimpinan, dan Profesionalisme dalam Pengelolaan Operasional serta Administrasi.",
      bio: "Mahasiswa S1 Manajemen Bisnis di Universitas Pasundan dengan rekam jejak kepemimpinan organisasi, manajemen keuangan, kesekretariatan, serta operasional tim.",
      explore: "Eksplorasi Portofolio",
      cv: "Unduh CV 📄",
      card: "Kartu Nama Digital",
      search: "Cari dokumen, sertifikat, atau skill...",
      contactHeader: "Hubungi Saya & Komentar",
      aiGreeting: "Halo! Saya AI Asisten Sahrul. Ada yang ingin Anda tanyakan tentang profil atau pengalaman Sahrul?",
      metrics: ["Tahun Pengalaman Organisasi", "Program Kerja Dikelola", "Dedikasi & Integritas", "Tahun Akademik Aktif"],
      educationTitle: "Pendidikan",
      experienceTitle: "Pengalaman",
      skillsExpertise: "Keahlian & Kompetensi",
      techSkills: "Keahlian Teknis",
      nonTechSkills: "Keahlian Non-Teknis",
      portfolioHeader: "Portofolio",
      tabs: { documents: "Dokumen", certificates: "Sertifikat", videos: "Video", skills: "Keahlian" },
      docLabel: "Dokumen Resmi",
      ratingTitle: "Beri Rating Portofolio Ini",
      reactionsTitle: "Reaksi Pengunjung",
      reactionsSub: "Klik emoji untuk memberikan reaksi instan!",
      contactFormTitle: "Kirim Pesan",
      contactFormSub: "Ada yang mau didiskusikan? Kirim pesan langsung ke email saya!",
      nameLabel: "Nama Anda",
      emailLabel: "Email Anda",
      messageLabel: "Pesan Anda",
      sendForm: "Kirim Pesan via Email 🚀",
      sendWhatsapp: "Kirim Pesan via WhatsApp ↗",
      successMessage: "Pesan berhasil terkirim ke email saya! Terima kasih.",
      commentsTitle: "Komentar",
      findMe: "TEMUKAN SAYA",
      pomodoroTitle: "Pengatur Waktu Fokus",
      pomodoroSub: "Mode Fokus Manajemen • Pomodoro 25 Menit",
      startTimer: "Mulai Fokus",
      pauseTimer: "Jeda",
      resetTimer: "Ulangi",
      education: [
        { institution: "Universitas Pasundan", major: "S1 Manajemen Bisnis - Fakultas Ekonomi dan Bisnis (NIM: 244010166)", period: "2024 - Sekarang" },
        { institution: "SMAIT Al-Multazam 2 Linggajati", major: "Ilmu Pengetahuan Sosial", period: "2021 - 2024" }
      ] as EducationItem[],
      experience: [
        { title: "Sekretaris Bidang Kemakmuran & Pelayanan Masjid (BKPM)", desc: "Mengabdi pada DKM Ulul 'Ilmi Universitas Pasundan Masa Jihad 2025-2026, menangani administrasi kesekretariatan, persuratan resmi, dan arsip LPJ.", period: "2025 - 2026" },
        { title: "Ketua Pelaksana Gebyar Ramadhan 1447H", desc: "Penanggung jawab utama dan pemegang keputusan operasional kegiatan acara.", period: "Feb - Mar 2025" },
        { title: "Bendahara Pelaksana Mentoring 2026", desc: "Mengelola manajemen keuangan dan anggaran (RAB) organisasi.", period: "Okt - Des 2025" }
      ] as ExperienceItem[],
      skillsData: {
        technical: ["Microsoft Office (Administrasi, Pengarsipan, Data)", "CapCut & Canva (Desain Grafis & Video)"],
        nonTechnical: ["Kepemimpinan & Manajemen Tim", "Problem Solving & Evaluasi Program", "Manajemen Waktu & Administrasi Publik"]
      },
      photosList: [
        { title: "Dokumentasi Kegiatan Kampus Unpas", category: "Universitas Pasundan", image: "/photo-1.jpg" },
        { title: "Panitia & Pengurus DKM Ulul 'Ilmi", category: "Organisasi Kerohanian", image: "/photo-2.jpg" },
        { title: "Gebyar Ramadhan 1447H Session", category: "Ketua Pelaksana", image: "/photo-3.jpg" },
        { title: "Mentoring PAI FEB & FKIP", category: "Pengurus & Panitia", image: "/photo-4.jpg" },
        { title: "Rapat Koordinasi & Evaluasi Program", category: "Manajemen Tim", image: "/photo-5.jpg" },
        { title: "Awarding & Apresiasi Prestasi", category: "Penghargaan", image: "/photo-6.jpg" },
        { title: "Diskusi Publik & Kajian Mahasiswa", category: "Akademik", image: "/photo-7.jpg" },
        { title: "Kebersamaan Pengurus DKM", category: "Keorganisasian", image: "/photo-8.jpg" },
        { title: "Kegiatan Sosial & Pengabdian", category: "Sosial Masyarakat", image: "/photo-9.jpg" },
        { title: "Potret Resmi Mahasiswa Manajemen", category: "Fakultas Ekonomi & Bisnis", image: "/photo-10.jpg" }
      ] as PhotoItem[],
      certificatesList: [
        { title: "Sertifikat Panitia & Ketua Pelaksana Gebyar Ramadhan 1447H", category: "Dewan Kemakmuran Masjid Ulul 'Ilmi Unpas (Maret 2026)", image: "/sertifikat-ramadhan.jpg" },
        { title: "Sertifikat Bendahara Pelaksana Mentoring PAI FEB & FKIP", category: "DKM Ulul 'Ilmi Universitas Pasundan (Mei 2026)", image: "/sertifikat-mentoring.jpg" },
        { title: "Sertifikat Sekretaris Bidang BKPM DKM Ulul 'Ilmi", category: "Dewan Kemakmuran Masjid Ulul 'Ilmi Unpas (Juli 2026)", image: "/sertifikat-dkm.jpg" }
      ] as CertificateItem[],
      timeAgo: "Baru saja"
    },
    en: {
      nav: [{ id: 'home', label: 'Home', path: '#home' }, { id: 'about', label: 'About', path: '#about' }, { id: 'portfolio', label: 'Portfolio', path: '#portfolio' }, { id: 'contact', label: 'Contact', path: '#contact' }] as NavItem[],
      student: "Business Management Bachelor Student",
      tagline: "Integrity, Leadership, and Professionalism in Operational and Administrative Management.",
      bio: "Business Management Student at Pasundan University with a proven track record in organizational leadership, financial management, secretariat, and team operations.",
      explore: "Explore Portfolio",
      cv: "Download CV 📄",
      card: "Digital Business Card",
      search: "Search documents, certificates, or skills...",
      contactHeader: "Contact Me & Comments",
      aiGreeting: "Hello! I am Sahrul's AI Assistant. Is there anything you'd like to ask?",
      metrics: ["Years of Org Experience", "Managed Projects", "Dedication & Integrity", "Active Academic Year"],
      educationTitle: "Education",
      experienceTitle: "Experience",
      skillsExpertise: "Skills & Expertise",
      techSkills: "Technical Skills",
      nonTechSkills: "Non-Technical Skills",
      portfolioHeader: "Portfolio",
      tabs: { documents: "Documents", certificates: "Certificates", videos: "Videos", skills: "Skills" },
      docLabel: "Official Document",
      ratingTitle: "Rate This Portfolio",
      reactionsTitle: "Visitor Reactions",
      reactionsSub: "Click emojis to celebrate and give instant feedback!",
      contactFormTitle: "Send Message",
      contactFormSub: "Have something to discuss? Send a direct message to my email!",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      sendForm: "Send Message via Email 🚀",
      sendWhatsapp: "Send via WhatsApp ↗",
      successMessage: "Message sent successfully to my email! Thank you.",
      commentsTitle: "Comments",
      findMe: "FIND ME",
      pomodoroTitle: "Focus & Productivity Timer",
      pomodoroSub: "Management Focus Mode • 25 Min Pomodoro",
      startTimer: "Start Focus",
      pauseTimer: "Pause",
      resetTimer: "Reset",
      education: [
        { institution: "Pasundan University", major: "Bachelor of Business Management - Faculty of Economics (NIM: 244010166)", period: "2024 - Present" },
        { institution: "SMAIT Al-Multazam 2 Linggajati", major: "Social Sciences", period: "2021 - 2024" }
      ] as EducationItem[],
      experience: [
        { title: "Secretary of Mosque Prosperity & Services", desc: "Serving at DKM Ulul 'Ilmi Pasundan University, handling secretariat administration, official correspondence, and archive reports.", period: "2025 - 2026" },
        { title: "Chief Executive of Gebyar Ramadhan 1447H", desc: "Main person in charge and operational decision maker for the event.", period: "Feb - Mar 2025" },
        { title: "Executive Treasurer of Mentoring 2026", desc: "Managing financial operations and organizational budget planning.", period: "Oct - Dec 2025" }
      ] as ExperienceItem[],
      skillsData: {
        technical: ["Microsoft Office (Administration, Archiving, Data)", "CapCut & Canva (Graphic Design & Video)"],
        nonTechnical: ["Leadership & Team Management", "Problem Solving & Program Evaluation", "Time Management & Public Administration"]
      },
      photosList: [
        { title: "Pasundan University Campus Activities", category: "Pasundan University", image: "/photo-1.jpg" },
        { title: "DKM Ulul 'Ilmi Committee & Board", category: "Religious Organization", image: "/photo-2.jpg" },
        { title: "Gebyar Ramadhan 1447H Session", category: "Chief Executive", image: "/photo-3.jpg" },
        { title: "PAI Mentoring FEB & FKIP", category: "Committee Board", image: "/photo-4.jpg" },
        { title: "Coordination & Program Evaluation", category: "Team Management", image: "/photo-5.jpg" },
        { title: "Awarding & Achievement Recognition", category: "Awards", image: "/photo-6.jpg" },
        { title: "Public Discussion & Student Study", category: "Academic", image: "/photo-7.jpg" },
        { title: "DKM Board Gathering", category: "Organization", image: "/photo-8.jpg" },
        { title: "Social Activities & Community Service", category: "Community", image: "/photo-9.jpg" },
        { title: "Official Management Student Portrait", category: "Economics & Business Faculty", image: "/photo-10.jpg" }
      ] as PhotoItem[],
      certificatesList: [
        { title: "Committee & Chief Executive Certificate of Gebyar Ramadhan 1447H", category: "DKM Ulul 'Ilmi Unpas (March 2026)", image: "/sertifikat-ramadhan.jpg" },
        { title: "Executive Treasurer Certificate of PAI Mentoring FEB & FKIP", category: "DKM Ulul 'Ilmi Pasundan University (May 2026)", image: "/sertifikat-mentoring.jpg" },
        { title: "Secretary of BKPM Board Certificate", category: "DKM Ulul 'Ilmi Pasundan University (July 2026)", image: "/sertifikat-dkm.jpg" }
      ] as CertificateItem[],
      timeAgo: "Just now"
    },
    su: {
      nav: [{ id: 'home', label: 'Utama', path: '#home' }, { id: 'about', label: 'Ngeunaan', path: '#about' }, { id: 'portfolio', label: 'Portofolio', path: '#portfolio' }, { id: 'contact', label: 'Taroskeun', path: '#contact' }] as NavItem[],
      student: "Mahasiswa S1 Manajemen Bisnis",
      tagline: "Integritas, Kapingpinan, jeung Profesionalisme dina Ngokolakeun Operasional sarta Administrasi.",
      bio: "Mahasiswa S1 Manajemen Bisnis di Universitas Pasundan anu gaduh pangalaman dina kapingpinan organisasi, manajemén kauangan, kasékretariatan, sareng operasional tim.",
      explore: "Jajah Portofolio",
      cv: "Unduh CV 📄",
      card: "Kartu Ngaran Digital",
      search: "Milarian dokumen, sertipikat, atanapi skill...",
      contactHeader: "Taroskeun Abdi & Komentar",
      aiGreeting: "Sampurasun! Abdi AI Asisten Sahrul. Aya anu badé ditaroskeun?",
      metrics: ["Taun Pangalaman Organisasi", "Program Kerja Dikelola", "Dedikasi & Integritas", "Taun Akademik Aktif"],
      educationTitle: "Pendidikan",
      experienceTitle: "Pangalaman",
      skillsExpertise: "Keahlian & Kompetensi",
      techSkills: "Keahlian Téknis",
      nonTechSkills: "Keahlian Non-Téknis",
      portfolioHeader: "Portofolio",
      tabs: { documents: "Dokumén", certificates: "Sertipikat", videos: "Vidéo", skills: "Keahlian" },
      docLabel: "Dokumén Resmi",
      ratingTitle: "Béré Rating Portofolio Ieu",
      reactionsTitle: "Réaksi Nu Nganjang",
      reactionsSub: "Klik émél pikeun mere réaksi instan!",
      contactFormTitle: "Kirim Pesen",
      contactFormSub: "Aya anu badé didiskusikeun? Kirim pesen langsung ka email abdi!",
      nameLabel: "Nami Anjeun",
      emailLabel: "Surat Éléktronik",
      messageLabel: "Pesen Anjeun",
      sendForm: "Kirim Pesen via Email 🚀",
      sendWhatsapp: "Kirim Pesen via WhatsApp ↗",
      successMessage: "Pesen parantos dugi ka email abdi! Hatur nuhun.",
      commentsTitle: "Komentar",
      findMe: "MANGGIHAN ABDI",
      pomodoroTitle: "Pangatur Waktos Fokus",
      pomodoroSub: "Mode Fokus • Pomodoro 25 Menit",
      startTimer: "Mimitian Fokus",
      pauseTimer: "Jeda",
      resetTimer: "Reset",
      education: [
        { institution: "Universitas Pasundan", major: "S1 Manajemen Bisnis - Fakultas Ékonomi (NIM: 244010166)", period: "2024 - Ayeuna" },
        { institution: "SMAIT Al-Multazam 2 Linggajati", major: "Élmu Pangaweruh Sosial", period: "2021 - 2024" }
      ] as EducationItem[],
      experience: [
        { title: "Sékretaris Widang Kamakmuran Masjid", desc: "Ngabdi di DKM Ulul 'Ilmi, ngatur administrasi, surat resmi, jeung arsip LPJ.", period: "2025 - 2026" },
        { title: "Ketua Pelaksana Gebyar Ramadhan", desc: "Penanggung jawab utama jeung pemegang kaputusan acara.", period: "Feb - Mar 2025" },
        { title: "Bendahara Mentoring 2026", desc: "Ngatur manajemén kauangan sarta anggaran organisasi.", period: "Okt - Des 2025" }
      ] as ExperienceItem[],
      skillsData: {
        technical: ["Microsoft Office (Administrasi, Arsip, Data)", "CapCut & Canva (Desain Grafis)"],
        nonTechnical: ["Kapingpinan & Manajemén Tim", "Ngarengsekeun Masalah", "Manajemén Waktos & Administrasi"]
      },
      photosList: [
        { title: "Dokumentasi Kampus Universitas Pasundan", category: "Universitas Pasundan", image: "/photo-1.jpg" },
        { title: "Panitia & Pangurus DKM Ulul 'Ilmi", category: "Organisasi Kerohanian", image: "/photo-2.jpg" },
        { title: "Gebyar Ramadhan 1447H", category: "Ketua Pelaksana", image: "/photo-3.jpg" },
        { title: "Mentoring PAI FEB & FKIP", category: "Pangurus", image: "/photo-4.jpg" },
        { title: "Rapat Koordinasi & Evaluasi", category: "Manajemén Tim", image: "/photo-5.jpg" },
        { title: "Awarding & Apresiasi", category: "Panghargaan", image: "/photo-6.jpg" },
        { title: "Kajian & Diskusi Mahasiswa", category: "Akademik", image: "/photo-7.jpg" },
        { title: "Kempelan Pangurus DKM", category: "Keorganisasian", image: "/photo-8.jpg" },
        { title: "Kagiatan Sosial Masyarakat", category: "Sosial", image: "/photo-9.jpg" },
        { title: "Poto Resmi Mahasiswa Manajemen", category: "Fakultas Ékonomi", image: "/photo-10.jpg" }
      ] as PhotoItem[],
      certificatesList: [
        { title: "Sertipikat Panitia & Ketua Pelaksana Gebyar Ramadhan 1447H", category: "DKM Ulul 'Ilmi Unpas (Maret 2026)", image: "/sertifikat-ramadhan.jpg" },
        { title: "Sertipikat Bendahara Mentoring PAI FEB & FKIP", category: "DKM Ulul 'Ilmi Universitas Pasundan (Méi 2026)", image: "/sertifikat-mentoring.jpg" },
        { title: "Sertipikat Sekretaris Pengurus DKM Ulul 'Ilmi", category: "DKM Ulul 'Ilmi Universitas Pasundan (Juli 2026)", image: "/sertifikat-dkm.jpg" }
      ] as CertificateItem[],
      timeAgo: "Nembé pisan"
    },
    jp: {
      nav: [{ id: 'home', label: 'ホーム', path: '#home' }, { id: 'about', label: '約', path: '#about' }, { id: 'portfolio', label: 'ポートフォリオ', path: '#portfolio' }, { id: 'contact', label: '接触', path: '#contact' }] as NavItem[],
      student: "経営学の学士号の学生", tagline: "運営および管理管理における誠実さ、リーダーシップ、プロフェッショナリズム。", bio: "組織のリーダーシップ、財務管理、チーム運営で実績のあるパスンダン大学の経営学生。", explore: "ポートフォリオを見る", cv: "履歴書をダウンロード 📄", card: "デジタル名刺", search: "ドキュメント、証明書を検索...", contactHeader: "私に連絡して", aiGreeting: "こんにちは！サフルAIアシスタントです。", metrics: ["組織経験年数", "管理されたプロジェクト", "献身と誠実さ", "アクティブな学年"], educationTitle: "教育", experienceTitle: "経験", skillsExpertise: "スキルと専門知識", techSkills: "技術スキル", nonTechSkills: "非技術スキル", portfolioHeader: "ポートフォリオ", tabs: { documents: "書類", certificates: "証明書", videos: "ビデオ", skills: "スキル" }, docLabel: "公式文書", ratingTitle: "このポートフォリオを評価する", reactionsTitle: "訪問者の反応", reactionsSub: "絵文字をクリックして反応を与えます！", contactFormTitle: "メッセージを送る", contactFormSub: "メールで直接メッセージを送ってください！", nameLabel: "あなたの名前", emailLabel: "あなたのメールアドレス", messageLabel: "あなたのメッセージ", sendForm: "メールで送信 🚀", sendWhatsapp: "WhatsApp経由で送信 ↗", successMessage: "メールが正常に送信されました！ありがとうございます。", commentsTitle: "コメント", findMe: "私を見つける", pomodoroTitle: "フォーカスタイマー", pomodoroSub: "管理フォーカスモード", startTimer: "スタート", pauseTimer: "一時停止", resetTimer: "リセット",
      education: [{ institution: "パスンダン大学", major: "経営学部 (NIM: 244010166)", period: "2024 - 現在" }, { institution: "SMAITアル・ムルタザム", major: "社会科学", period: "2021 - 2024" }] as EducationItem[],
      experience: [{ title: "モスクの繁栄と奉仕の長官", desc: "事務管理、公式書簡、アーカイブを処理します。", period: "2025 - 2026" }, { title: "ラマダンイベント最高責任者", desc: "イベントの主な責任者。", period: "2025年 2月-3月" }, { title: "メンタリング財務長官", desc: "財務業務の管理。", period: "2025年 10月-12月" }] as ExperienceItem[],
      skillsData: { technical: ["Microsoft Office (管理、アーカイブ)", "CapCut & Canva (デザイン)"], nonTechnical: ["リーダーシップ", "問題解決", "時間管理"] },
      photosList: [
        { title: "パスンダン大学キャンパス活動", category: "パスンダン大学", image: "/photo-1.jpg" },
        { title: "DKMウルル・イルミ委員会", category: "宗教組織", image: "/photo-2.jpg" },
        { title: "ラマダンイベント", category: "最高責任者", image: "/photo-3.jpg" },
        { title: "PAIメンタリング", category: "委員会", image: "/photo-4.jpg" },
        { title: "調整と評価", category: "チーム管理", image: "/photo-5.jpg" },
        { title: "受賞・実績表彰", category: "賞", image: "/photo-6.jpg" },
        { title: "公開討論と学習", category: "学術的", image: "/photo-7.jpg" },
        { title: "DKM理事会集会", category: "組織", image: "/photo-8.jpg" },
        { title: "社会活動", category: "コミュニティ", image: "/photo-9.jpg" },
        { title: "公式経営学生ポートレート", category: "経営学部", image: "/photo-10.jpg" }
      ] as PhotoItem[],
      certificatesList: [
        { title: "ゲビャール・ラマダン 1447H 委員長証明書", category: "パスンダン大学ウルル・イルミ・モスク繁栄評議会 (2026年3月)", image: "/sertifikat-ramadhan.jpg" },
        { title: "PAIメンタリング財務担当者証明書", category: "パスンダン大学 (2026年5月)", image: "/sertifikat-mentoring.jpg" },
        { title: "DKM運営役員証明書", category: "パスンダン大学 (2026年7月)", image: "/sertifikat-dkm.jpg" }
      ] as CertificateItem[],
      timeAgo: "ちょうど今"
    },
    kr: {
      nav: [{ id: 'home', label: '홈', path: '#home' }, { id: 'about', label: '소개', path: '#about' }, { id: 'portfolio', label: '포트폴리오', path: '#portfolio' }, { id: 'contact', label: '연락처', path: '#contact' }] as NavItem[],
      student: "경영학 학사 과정 학생", tagline: "운영 및 관리 관리의 무결성, 리더십 및 전문성.", bio: "조직 리더십, 재무 관리 및 팀 운영에 입증된 실적을 보유한 파순단 대학교 경영학 학생.", explore: "포트폴리오 탐색", cv: "이력서 다운로드 📄", card: "디지털 명함", search: "문서, 인증서 검색...", contactHeader: "연락주세요", aiGreeting: "안녕하세요! 사룰 AI 어시스턴트입니다.", metrics: ["조직 경험 연수", "관리된 프로젝트", "헌신과 무결성", "활성 학년도"], educationTitle: "교육", experienceTitle: "경험", skillsExpertise: "기술 및 전문성", techSkills: "기술적 인 기술", nonTechSkills: "비 기술적 기술", portfolioHeader: "포트폴리오", tabs: { documents: "문서", certificates: "인증서", videos: "비디오", skills: "기술" }, docLabel: "공식 문서", ratingTitle: "이 포트폴리오 평가", reactionsTitle: "방문자 반응", reactionsSub: "이모티콘을 클릭하여 반응하세요!", contactFormTitle: "메시지 보내기", contactFormSub: "이메일로 직접 메시지를 보내주세요!", nameLabel: "당신의 이름", emailLabel: "귀하의 이메일", messageLabel: "귀하의 메시지", sendForm: "이메일로 보내기 🚀", sendWhatsapp: "WhatsApp을 통해 보내기 ↗", successMessage: "이메일로 성공적으로 전송되었습니다! 감사합니다.", commentsTitle: "코멘트", findMe: "나를 찾아라", pomodoroTitle: "포커스 타이머", pomodoroSub: "관리 포커스 모드", startTimer: "시작", pauseTimer: "일시 중지", resetTimer: "초기화",
      education: [{ institution: "파순단 대학교", major: "경영학 (NIM: 244010166)", period: "2024 - 현재" }, { institution: "SMAIT 알-물타잠", major: "사회 과학", period: "2021 - 2024" }] as EducationItem[],
      experience: [{ title: "모스크 번영 및 서비스 장관", desc: "사무국 관리, 공식 서신 및 아카이브 보고서를 처리합니다.", period: "2025 - 2026" }, { title: "라마단 행사 최고 경영자", desc: "행사의 주요 책임자.", period: "2025년 2월-3월" }, { title: "재무 이사", desc: "재무 운영 관리.", period: "2025년 10월-12월" }] as ExperienceItem[],
      skillsData: { technical: ["Microsoft Office (관리, 보관)", "CapCut & Canva (디자인)"], nonTechnical: ["리더シップ", "문제 해결", "시간 관리"] },
      photosList: [
        { title: "파순단 대학교 캠퍼스 활동", category: "파순단 대학교", image: "/photo-1.jpg" },
        { title: "DKM 울룰 일미 위원회", category: "종교 조직", image: "/photo-2.jpg" },
        { title: "라마단 행사", category: "최고 경영자", image: "/photo-3.jpg" },
        { title: "PAI 멘토링", category: "위원회", image: "/photo-4.jpg" },
        { title: "조정 및 평가", category: "팀 관리", image: "/photo-5.jpg" },
        { title: "수상 및 성과", category: "상", image: "/photo-6.jpg" },
        { title: "공개 토론", category: "학술적", image: "/photo-7.jpg" },
        { title: "DKM 이사회 모임", category: "조직", image: "/photo-8.jpg" },
        { title: "사회 활동", category: "커뮤니티", image: "/photo-9.jpg" },
        { title: "공식 경영학 학생 초상화", category: "경영대학", image: "/photo-10.jpg" }
      ] as PhotoItem[],
      certificatesList: [
        { title: "라마단 1447H 위원장 및 위원회 수료증", category: "파순단 대학교 울룰 일미 모스크 번영 평의회 (2026년 3월)", image: "/sertifikat-ramadhan.jpg" },
        { title: "멘토링 재무 책임자 수료증", category: "파순단 대학교 (2026년 5월)", image: "/sertifikat-mentoring.jpg" },
        { title: "DKM 임원 임명 수료증", category: "파순단 대학교 (2026년 7월)", image: "/sertifikat-dkm.jpg" }
      ] as CertificateItem[],
      timeAgo: "방금 전"
    }
  };
  
  const t = translations[lang as keyof typeof translations] || translations.id;

  const [accentTheme, setAccentTheme] = useState('blue');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const dynamicSubtitle = "Operational Leader & Business Management Student.";
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [copiedLabel, setCopiedLabel] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);

  // 3D Coverflow & Auto-Swap state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % t.photosList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay, t.photosList.length]);

  const [timeLeft, setTimeLeft] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) { setIsTimerRunning(false); }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60); const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const [ratingsData, setRatingsData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sahrul_portfolio_ratings');
      if (saved) { try { return JSON.parse(saved); } catch { return { totalScore: 48, count: 10 }; } }
    }
    return { totalScore: 48, count: 10 };
  });
  const [userRated, setUserRated] = useState(false);

  const handleRatePortfolio = (stars: number) => {
    if (userRated) return;
    const newTotal = ratingsData.totalScore + stars; const newCount = ratingsData.count + 1;
    const updated = { totalScore: newTotal, count: newCount };
    setRatingsData(updated); localStorage.setItem('sahrul_portfolio_ratings', JSON.stringify(updated));
    setUserRated(true); triggerConfetti(); playSound('click');
  };
  const averageRating = (ratingsData.totalScore / ratingsData.count).toFixed(1);

  const [aiInput, setAiInput] = useState('');
  const [aiChatLog, setAiChatLog] = useState([{ sender: 'ai', text: t.aiGreeting }]);
  useEffect(() => { setAiChatLog([{ sender: 'ai', text: t.aiGreeting }]); }, [lang, t.aiGreeting]);

  const [reactions, setReactions] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sahrul_portfolio_reactions');
      if (saved) { try { return JSON.parse(saved); } catch { return { fire: 14, clap: 9, light: 12, love: 18 }; } }
    }
    return { fire: 14, clap: 9, light: 12, love: 18 };
  });
  useEffect(() => { localStorage.setItem('sahrul_portfolio_reactions', JSON.stringify(reactions)); }, [reactions]);

  const handleReaction = (key: string) => {
    setReactions((prev: Record<string, number>) => ({ ...prev, [key]: prev[key] + 1 })); triggerConfetti(); playSound('click');
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string; alpha: number; decay: number }> = []; 
    const colors = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width / 2, y: canvas.height / 2, vx: (Math.random() - 0.5) * 12, vy: (Math.random() - 0.7) * 12,
        radius: Math.random() * 3 + 2, color: colors[Math.floor(Math.random() * colors.length)], alpha: 1, decay: Math.random() * 0.02 + 0.01
      });
    }
    let animationId: number;
    const renderConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.alpha -= p.decay;
        if (p.alpha <= 0) { particles.splice(index, 1); } 
        else { ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      });
      if (particles.length > 0) animationId = requestAnimationFrame(renderConfetti); else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    renderConfetti();
  };

  const playSound = (type = 'click') => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
      osc.connect(gain); gain.connect(audioCtx.destination);
      if (type === 'click') {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start(); osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'tab') {
        osc.frequency.setValueAtTime(400, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start(); osc.stop(audioCtx.currentTime + 0.08);
      }
    } catch { /* Ignore */ }
  };

  const [comments, setComments] = useState<CommentItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sahrul_portfolio_comments');
      if (saved) { try { return JSON.parse(saved); } catch { return initialComments; } }
    }
    return initialComments;
  });
  const [nameInput, setNameInput] = useState(''); const [commentInput, setCommentInput] = useState('');
  useEffect(() => { localStorage.setItem('sahrul_portfolio_comments', JSON.stringify(comments)); }, [comments]);

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); if (!nameInput.trim() || !commentInput.trim()) return;
    triggerConfetti(); playSound('click');
    setComments([{ name: nameInput, comment: commentInput, time: t.timeAgo }, ...comments]);
    setNameInput(''); setCommentInput('');
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.contact.email}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          _subject: `Pesan Baru dari Portfolio - ${contactName}`
        })
      });

      if (response.ok) {
        triggerConfetti();
        playSound('click');
        setFormSubmitted(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setTimeout(() => setFormSubmitted(false), 5000);
      }
    } catch {
      // Handle network error
    }
  };

  const handleAiSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); if (!aiInput.trim()) return;
    const userQuery = aiInput.trim(); setAiChatLog([...aiChatLog, { sender: 'user', text: userQuery }]); setAiInput(''); playSound('click');
    setTimeout(() => {
      let reply = "Sahrul Ramadhan adalah mahasiswa S1 Manajemen Bisnis di Universitas Pasundan.";
      const lower = userQuery.toLowerCase();
      if (lower.includes('kontak') || lower.includes('wa')) reply = `Hubungi via WhatsApp di ${profile.contact.phone}`;
      setAiChatLog(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text); setCopiedLabel(label); playSound('click');
    setTimeout(() => setCopiedLabel(''), 2000);
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date(); setTimeString(now.toLocaleTimeString('id-ID')); const hour = now.getHours();
      if (hour >= 4 && hour < 11) setGreeting('Selamat Pagi 🌅');
      else if (hour >= 11 && hour < 15) setGreeting('Selamat Siang ☀️');
      else if (hour >= 15 && hour < 18) setGreeting('Selamat Sore 🌤️');
      else setGreeting('Selamat Malam 🌙');
    };
    updateClock(); const timer = setInterval(updateClock, 1000); return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsTerminalOpen(prev => !prev); playSound('click'); } };
    window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { setCursorPos({ x: e.clientX, y: e.clientY }); };
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY; setScrollProgress(Math.round((currentScroll / totalScroll) * 100));
    };
    window.addEventListener('mousemove', handleMouseMove); window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => { if (prev >= 100) { clearInterval(interval); setTimeout(() => setLoading(false), 400); return 100; } return prev + 45; });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading) return; let i = 0;
    const typingInterval = setInterval(() => {
      if (i < dynamicSubtitle.length) { setTypedText((prev) => prev + dynamicSubtitle.charAt(i)); i++; } 
      else { setIsTypingDone(true); clearInterval(typingInterval); }
    }, 40);
    return () => clearInterval(typingInterval);
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth); let height = (canvas.height = window.innerHeight);
    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    const particles: Array<{ x: number; y: number; radius: number; vx: number; vy: number; alpha: number }> = [];
    for (let i = 0; i < 30; i++) {
      particles.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.5 + 0.5, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, alpha: Math.random() * 0.3 + 0.1 });
    }
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(cursorPos.x, cursorPos.y, 0, cursorPos.x, cursorPos.y, 600);
      gradient.addColorStop(0, accentTheme === 'emerald' ? 'rgba(16, 185, 129, 0.12)' : accentTheme === 'purple' ? 'rgba(168, 85, 247, 0.12)' : accentTheme === 'amber' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(59, 130, 246, 0.12)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0; if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`; ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render(); return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animationFrameId); };
  }, [loading, accentTheme, cursorPos]);

  // Perbaikan tipe event menjadi HTMLElement agar kompatibel dengan <div> dan <a>
  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`); e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    const centerX = rect.width / 2; const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; const rotateY = ((x - centerX) / centerX) * 4;
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };
  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('opacity-100', 'translate-y-0'); entry.target.classList.remove('opacity-0', 'translate-y-10'); } });
    }, { threshold: 0.05 });
    const elements = document.querySelectorAll('.scroll-animate'); elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const themeColors = {
    blue: { primary: 'bg-blue-600 hover:bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    emerald: { primary: 'bg-emerald-600 hover:bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500/30', badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
    purple: { primary: 'bg-purple-600 hover:bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
    amber: { primary: 'bg-amber-600 hover:bg-amber-500', text: 'text-amber-400', border: 'border-amber-500/30', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
  }[accentTheme] || { primary: 'bg-blue-600 hover:bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30', badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20' };

  const whatsappUrl = `https://wa.me/${profile.contact.phone.replace('+', '')}?text=Halo%20Sahrul,%20saya%20melihat%20portfolio%20Anda.`;
  const filteredDocuments = documents.filter((doc: DocumentItem) => doc.title.toLowerCase().includes(portfolioSearch.toLowerCase()));
  const filteredCertificates = t.certificatesList.filter((item: CertificateItem) => item.title.toLowerCase().includes(portfolioSearch.toLowerCase()) || item.category.toLowerCase().includes(portfolioSearch.toLowerCase()));
  const filteredVideos = videos.filter((vid: VideoItem) => vid.title.toLowerCase().includes(portfolioSearch.toLowerCase()));

  const currentLangLabel = availableLanguages.find(l => l.code === lang)?.label || 'INDONESIA';

  if (loading) {
    return (
      <div className="fixed inset-0 z-[99999] bg-[#020617] text-white flex flex-col items-center justify-center font-sans px-4 select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617] to-[#020617] pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-md w-full space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Executive UI Edition
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-sans">
            Sahrul Ramadhan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Portfolio</span>
          </h1>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-zinc-400 px-1"><span>Loading Advanced Features</span><span className="text-blue-400 font-bold">{progress}%</span></div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
              <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-75" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500 selection:text-white pb-32 relative overflow-x-hidden">
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-[999999]"></canvas>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0"></canvas>
      <div className="fixed pointer-events-none z-[99999] w-8 h-8 rounded-full border border-white/20 bg-white/5 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block backdrop-blur-[1px]" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>

      {/* FAB Menu */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2.5">
        {isFabOpen && (
          <div className="bg-zinc-950/95 border border-white/20 rounded-2xl p-3 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 animate-fadeIn w-48 text-xs font-mono">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-emerald-600/20 text-emerald-300 transition"><span>💬</span> WhatsApp Chat</a>
            <button onClick={() => { setIsCardOpen(true); setIsFabOpen(false); playSound('click'); }} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-blue-600/20 text-blue-300 transition text-left"><span>💳</span> {t.card}</button>
            <a href={profile.contact.cv} target="_blank" rel="noopener noreferrer" onClick={() => triggerConfetti()} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-purple-600/20 text-purple-300 transition"><span>📄</span> {t.cv}</a>
          </div>
        )}
        <button onClick={() => { setIsFabOpen(!isFabOpen); playSound('click'); }} className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl flex items-center justify-center font-bold text-lg border border-white/20 transition hover:scale-110 active:scale-95">
          {isFabOpen ? '✕' : '⚡'}
        </button>
      </div>

      {/* Digital Card Modal */}
      {isCardOpen && (
        <div onClick={() => setIsCardOpen(false)} className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/20 rounded-3xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">{t.card}</span>
              <button onClick={() => setIsCardOpen(false)} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs font-bold">✕</button>
            </div>
            <div className="space-y-4 relative z-10 text-center py-4">
              <img src="/profile.jpg" alt={profile.name} className="w-24 h-24 rounded-2xl object-cover object-top mx-auto shadow-xl border border-white/10" />
              <div>
                <h3 className="text-xl font-extrabold text-white">{profile.name}</h3>
                <p className="text-xs text-blue-300 font-mono mt-1">{t.student}</p>
                <p className="text-[11px] text-zinc-400 font-mono">NIM: {profile.nim}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2 text-xs font-mono">
                <div className="flex justify-between"><span className="text-zinc-400">Email:</span> <span className="text-white truncate max-w-[200px]">{profile.contact.email}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Phone:</span> <span className="text-white">{profile.contact.phone}</span></div>
                <div className="flex justify-between"><span className="text-zinc-400">Location:</span> <span className="text-white">{profile.contact.location}</span></div>
              </div>
            </div>
            <div className="flex gap-3 relative z-10">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs text-center uppercase font-mono shadow-lg">WhatsApp</a>
              <button onClick={() => { handleCopyText(profile.contact.email, 'email_card'); setIsCardOpen(false); }} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl text-xs uppercase font-mono shadow-lg">Copy Email</button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <div className="fixed bottom-20 left-6 z-50">
        {!isAiOpen ? (
          <button onClick={() => { setIsAiOpen(true); playSound('click'); }} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20 backdrop-blur-xl transition hover:scale-105 active:scale-95">
            <span>🤖</span><span>Tanya AI</span>
          </button>
        ) : (
          <div className="bg-zinc-950 border border-white/20 rounded-3xl max-w-sm w-[340px] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-fadeIn">
            <div className="bg-zinc-900 px-4 py-3 flex justify-between items-center border-b border-white/10">
              <span className="text-xs font-bold text-white flex items-center gap-2 font-mono"><span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>AI Assistant</span>
              <button onClick={() => setIsAiOpen(false)} className="text-zinc-400 hover:text-white text-xs font-bold w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">✕</button>
            </div>
            <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs font-sans">
              {aiChatLog.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-zinc-900 text-zinc-200 border border-white/10 rounded-bl-none font-mono text-[11px]'}`}>{msg.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleAiSubmit} className="p-3 bg-zinc-900/80 border-t border-white/10 flex gap-2">
              <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} placeholder="..." className="w-full bg-zinc-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono shadow-inner" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold font-mono">Kirim</button>
            </form>
          </div>
        )}
      </div>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 p-4 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-blue-400 font-bold flex items-center gap-2">⚡ Command Palette</span>
              <button onClick={() => setIsTerminalOpen(false)} className="text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/5">ESC</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {t.nav.map((n: NavItem) => (
                <a key={n.id} href={n.path} onClick={() => { setIsTerminalOpen(false); playSound('click'); }} className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600/20 text-zinc-200 border border-white/5 transition"># {n.id}</a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <button onClick={() => { playSound('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="relative w-12 h-12 rounded-full bg-zinc-900/90 border border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all backdrop-blur-xl group" title="Kembali">
          <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36"><path className="text-zinc-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className="text-blue-500 transition-all duration-150" strokeWidth="3" strokeDasharray={`${scrollProgress}, 100`} stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
        </button>
      </div>

      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-[100] shadow-[0_0_10px_rgba(59,130,246,0.5)]">
        <div className="h-full bg-blue-500 transition-all duration-100 shadow-[0_0_15px_rgba(59,130,246,1)]" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-[#090d16]/80 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 md:gap-3 shadow-[0_10px_40px_rgb(0,0,0,0.7)]">
        {t.nav.map((nav: NavItem) => (
          <a key={nav.id} href={nav.path} onClick={() => { setActiveTab(nav.path); playSound('tab'); }} className={`px-3.5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 transform active:scale-95 hover:scale-105 ${activeTab === nav.path ? `${themeColors.primary} text-white font-semibold shadow-lg` : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
            {nav.label}
          </a>
        ))}

        <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>

        <div className="relative" ref={langMenuRef}>
          <button onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); playSound('click'); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[11px] font-mono text-zinc-300 transition-all">
            <span className="text-blue-400">🌐</span> {currentLangLabel}
            <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          {isLangMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-[#090d16]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 animate-fadeIn z-[99999]">
              {availableLanguages.map((l) => (
                <button key={l.code} onClick={() => { setLang(l.code as 'id' | 'en' | 'su' | 'jp' | 'kr'); setIsLangMenuOpen(false); playSound('click'); }} className={`w-full text-left px-4 py-2 text-xs font-mono transition-colors ${lang === l.code ? 'bg-blue-600/20 text-blue-400 font-bold border-l-2 border-blue-500' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}>{l.label}</button>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => { setIsTerminalOpen(true); playSound('click'); }} className="px-2.5 py-1.5 rounded-full bg-white/5 text-zinc-300 text-xs font-mono hover:bg-white/10 border border-white/10 hidden sm:flex items-center gap-1" title="Terminal (Ctrl+K)"><span>⌘K</span></button>
        <button onClick={() => { setIsMuted(!isMuted); playSound('click'); }} className="w-8 h-8 rounded-full bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs">{isMuted ? '🔇' : '🔊'}</button>
        
        <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>
        <div className="flex items-center gap-1.5 px-1">
          <button onClick={() => { setAccentTheme('blue'); playSound('click'); }} className={`w-3.5 h-3.5 rounded-full bg-blue-500 transition-transform ${accentTheme === 'blue' ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}></button>
          <button onClick={() => { setAccentTheme('emerald'); playSound('click'); }} className={`w-3.5 h-3.5 rounded-full bg-emerald-500 transition-transform ${accentTheme === 'emerald' ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}></button>
          <button onClick={() => { setAccentTheme('purple'); playSound('click'); }} className={`w-3.5 h-3.5 rounded-full bg-purple-500 transition-transform ${accentTheme === 'purple' ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}></button>
          <button onClick={() => { setAccentTheme('amber'); playSound('click'); }} className={`w-3.5 h-3.5 rounded-full bg-amber-500 transition-transform ${accentTheme === 'amber' ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}></button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 md:pt-44 relative z-10">
        
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-32 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono tracking-wide shadow-sm ${themeColors.badge}`}>
                <span className={`w-2 h-2 rounded-full animate-ping ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'purple' ? 'bg-purple-400' : accentTheme === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`}></span>
                <span>{greeting} • {timeString}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Online & Available</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-zinc-300 tracking-tight">Halo, saya <span className="text-white font-extrabold">{profile.name}</span></h2>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight min-h-[90px] md:min-h-[110px]">
                {t.student} <br className="hidden sm:block" />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentTheme === 'emerald' ? 'from-emerald-400 to-teal-300' : accentTheme === 'purple' ? 'from-purple-400 to-pink-300' : accentTheme === 'amber' ? 'from-amber-400 to-yellow-300' : 'from-blue-400 to-cyan-400'} text-2xl sm:text-3xl md:text-4xl`}>{typedText}</span>
                {!isTypingDone && <span className={`inline-block w-1 h-6 md:h-8 ml-1 animate-pulse align-middle ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'purple' ? 'bg-purple-400' : accentTheme === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`}></span>}
              </h1>
            </div>
            
            <p className="text-xs sm:text-sm font-mono text-blue-300/90 leading-relaxed border-l-2 border-blue-500 pl-4 py-2 bg-blue-500/5 rounded-r-2xl shadow-sm">{t.tagline}</p>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light tracking-wide">{t.bio}</p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <a href="#portfolio" onClick={() => playSound('click')} className={`${themeColors.primary} text-white font-semibold px-6 py-3 rounded-2xl text-xs md:text-sm transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 tracking-wider uppercase flex items-center gap-2`}>
                <span>{t.explore}</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>
              <a href={profile.contact.cv} onClick={() => { triggerConfetti(); playSound('click'); }} download="CV.pdf" target="_blank" rel="noopener noreferrer" className="border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white px-5 py-3 rounded-2xl text-xs md:text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 font-bold shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg><span>{t.cv}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 w-full items-center">
            {/* Dedicated Personal Profile Card */}
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card w-full max-w-sm bg-[#090d16]/90 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300 text-center space-y-4">
              <div className="absolute -right-10 -top-10 w-36 h-36 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl group-hover:scale-105 transition-transform">
                <img src="/profile.jpg" alt={profile.name} className="w-full h-full object-cover object-top" />
              </div>

              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-extrabold text-white tracking-tight">{profile.name}</h3>
                <p className="text-xs text-blue-400 font-mono">NIM: {profile.nim}</p>
                <p className="text-[11px] text-zinc-400 font-mono">Universitas Pasundan</p>
              </div>

              <div className="flex justify-center gap-2 pt-2 relative z-10">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-emerald-600/30 transition"><span>💬</span> WhatsApp</a>
                <button onClick={() => { setIsCardOpen(true); playSound('click'); }} className="px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-blue-600/30 transition"><span>💳</span> Digital Card</button>
              </div>
            </div>

            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card w-full max-w-sm bg-[#090d16]/90 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden text-center space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2"><span>⏱️</span> {t.pomodoroTitle}</h4>
              <p className="text-xs text-zinc-400 font-mono">{t.pomodoroSub}</p>
              <div className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-wider py-1">{formatTimer(timeLeft)}</div>
              <div className="flex justify-center gap-2 pt-1 font-mono text-xs">
                <button onClick={() => { setIsTimerRunning(!isTimerRunning); playSound('click'); }} className={`px-4 py-2 rounded-xl font-bold transition ${isTimerRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>{isTimerRunning ? t.pauseTimer : t.startTimer}</button>
                <button onClick={() => { setIsTimerRunning(false); setTimeLeft(1500); playSound('click'); }} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition">{t.resetTimer}</button>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT METRICS */}
        <section className="mb-20 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-xl">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-1">5+</h4><p className="text-xs font-mono text-zinc-400">{t.metrics[0]}</p>
            </div>
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-xl">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-1">10+</h4><p className="text-xs font-mono text-zinc-400">{t.metrics[1]}</p>
            </div>
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-xl">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-1">100%</h4><p className="text-xs font-mono text-zinc-400">{t.metrics[2]}</p>
            </div>
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-6 bg-zinc-900/40 border border-white/10 rounded-3xl text-center backdrop-blur-xl">
              <h4 className="text-3xl md:text-4xl font-black text-white mb-1">2026</h4><p className="text-xs font-mono text-zinc-400">{t.metrics[3]}</p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mb-32 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card md:col-span-1 bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-6 flex items-center gap-3 tracking-wide relative z-10"><span className={themeColors.text + " font-mono text-sm"}>#</span> {t.educationTitle}</h2>
                <div className="space-y-6 relative z-10">
                  {t.education.map((edu: EducationItem, idx: number) => (
                    <div key={idx} className="p-5 bg-zinc-950/60 border border-white/5 rounded-2xl shadow-inner transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="text-base font-bold text-white tracking-tight">{edu.institution}</h3>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">{edu.major}</p>
                      <span className={`inline-block mt-3 text-[10px] font-mono px-3 py-1 rounded-full border ${themeColors.badge}`}>{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card md:col-span-2 bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-6 flex items-center gap-3 tracking-wide relative z-10"><span className={themeColors.text + " font-mono text-sm"}>#</span> {t.experienceTitle}</h2>
                <div className="space-y-6 relative z-10">
                  {t.experience.map((exp: ExperienceItem, idx: number) => (
                    <div key={idx} className="p-5 bg-zinc-950/60 border border-white/5 rounded-2xl shadow-inner transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="text-base font-bold text-white tracking-tight">{exp.title}</h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-light">{exp.desc}</p>
                      <span className={`inline-block mt-3 text-[10px] font-mono px-3 py-1 rounded-full border ${themeColors.badge}`}>{exp.period}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-xl font-extrabold text-white mb-6 tracking-wide relative z-10">{t.skillsExpertise}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-3">
                <h3 className={`text-xs font-mono uppercase tracking-widest font-bold ${themeColors.text}`}>{t.techSkills}</h3>
                {t.skillsData.technical.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-950/50 px-4 py-3.5 rounded-xl border border-white/5 font-medium shadow-sm transition-transform duration-300 hover:translate-x-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'purple' ? 'bg-purple-400' : accentTheme === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`}></span><span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h3 className={`text-xs font-mono uppercase tracking-widest font-bold ${themeColors.text}`}>{t.nonTechSkills}</h3>
                {t.skillsData.nonTechnical.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-950/50 px-4 py-3.5 rounded-xl border border-white/5 font-medium shadow-sm transition-transform duration-300 hover:translate-x-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'purple' ? 'bg-purple-400' : accentTheme === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`}></span><span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="mb-32 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
          <div className="text-center mb-8"><h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{t.portfolioHeader}</h2></div>
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-400">🔍</span>
              <input type="text" value={portfolioSearch} onChange={(e) => setPortfolioSearch(e.target.value)} placeholder={t.search} className="w-full bg-zinc-900/90 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 font-mono shadow-inner transition-colors duration-300" />
              {portfolioSearch && <button onClick={() => setPortfolioSearch('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-zinc-400 hover:text-white">✕</button>}
            </div>
          </div>
          
          <div className="bg-[#090d16]/90 border border-white/10 p-2.5 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-2.5 shadow-2xl mb-12 backdrop-blur-xl max-w-4xl mx-auto">
            <button onClick={() => { setPortfolioFilter('documents'); playSound('tab'); }} className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] ${portfolioFilter === 'documents' ? 'bg-[#131c31] text-blue-400 border border-blue-500/30 shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-6 h-6 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg><span className="text-xs font-mono font-bold uppercase tracking-wider">{t.tabs.documents}</span>
            </button>
            <button onClick={() => { setPortfolioFilter('certificates'); playSound('tab'); }} className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] ${portfolioFilter === 'certificates' ? 'bg-[#131c31] text-blue-400 border border-blue-500/30 shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-6 h-6 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg><span className="text-xs font-mono font-bold uppercase tracking-wider">{t.tabs.certificates}</span>
            </button>
            <button onClick={() => { setPortfolioFilter('videos'); playSound('tab'); }} className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] ${portfolioFilter === 'videos' ? 'bg-[#131c31] text-blue-400 border border-blue-500/30 shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-6 h-6 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg><span className="text-xs font-mono font-bold uppercase tracking-wider">{t.tabs.videos}</span>
            </button>
            <button onClick={() => { setPortfolioFilter('skills'); playSound('tab'); }} className={`flex flex-col items-center justify-center py-4 px-3 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] ${portfolioFilter === 'skills' ? 'bg-[#131c31] text-blue-400 border border-blue-500/30 shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
              <svg className="w-6 h-6 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg><span className="text-xs font-mono font-bold uppercase tracking-wider">{t.tabs.skills}</span>
            </button>
          </div>

          <div className="animate-fadeIn">
            {portfolioFilter === 'documents' && (
              <div className="space-y-8 animate-fadeIn">
                {filteredDocuments.map((doc: DocumentItem, idx: number) => (
                  <div key={idx} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <span className={`text-[10px] font-mono px-3 py-1 rounded-full border font-semibold tracking-wider uppercase shadow-sm ${themeColors.badge}`}>{t.docLabel}</span>
                        <h3 className="text-lg md:text-xl font-bold text-white mt-2 tracking-tight">{doc.title}</h3>
                        <p className="text-xs text-zinc-400 font-mono mt-1">{doc.description}</p>
                      </div>
                      <a href={doc.file} onClick={() => playSound('click')} target="_blank" rel="noopener noreferrer" className={`${themeColors.primary} text-white text-xs font-mono font-bold px-5 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-105 shadow-lg shrink-0`}>Buka Tab Baru ↗</a>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black h-[500px] shadow-inner"><iframe src={doc.file} className="w-full h-full" title={doc.title}></iframe></div>
                  </div>
                ))}
              </div>
            )}
            {portfolioFilter === 'certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                {filteredCertificates.map((item: CertificateItem, idx: number) => (
                  <div key={idx} className="bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
                    <div className="h-60 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6"><span className={`text-[10px] font-mono px-3 py-1 rounded-full border font-semibold tracking-wider uppercase shadow-sm ${themeColors.badge}`}>{item.category}</span><h3 className="text-base font-bold text-white mt-3 tracking-tight">{item.title}</h3></div>
                  </div>
                ))}
              </div>
            )}
            {portfolioFilter === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                {filteredVideos.map((vid: VideoItem, idx: number) => (
                  <div key={idx} className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30">
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{vid.title}</h3>
                    <p className="text-xs text-zinc-400 mb-6 font-mono font-light">{vid.description}</p>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-inner">
                      <video src={vid.file} controls autoPlay loop muted className="w-full h-full object-cover">Browser Anda tidak mendukung tag video.</video>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {portfolioFilter === 'skills' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl animate-fadeIn">
                <div className="space-y-4">
                  <h3 className={`text-sm font-mono uppercase tracking-widest font-bold ${themeColors.text}`}>{t.techSkills}</h3>
                  {t.skillsData.technical.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-950/60 px-4 py-3.5 rounded-2xl border border-white/5 font-medium shadow-sm transition-transform duration-300 hover:translate-x-1">
                      <span className={`w-2 h-2 rounded-full ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'purple' ? 'bg-purple-400' : accentTheme === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`}></span><span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className={`text-sm font-mono uppercase tracking-widest font-bold ${themeColors.text}`}>{t.nonTechSkills}</h3>
                  {t.skillsData.nonTechnical.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-zinc-300 bg-zinc-950/60 px-4 py-3.5 rounded-2xl border border-white/5 font-medium shadow-sm transition-transform duration-300 hover:translate-x-1">
                      <span className={`w-2 h-2 rounded-full ${accentTheme === 'emerald' ? 'bg-emerald-400' : accentTheme === 'purple' ? 'bg-purple-400' : accentTheme === 'amber' ? 'bg-amber-400' : 'bg-blue-400'}`}></span><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3D INTERACTIVE COVERFLOW PHOTO GALLERY */}
        <section 
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          className="mb-24 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden [perspective:1400px] select-none">
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617] z-20 pointer-events-none"></div>
            
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center [transform-style:preserve-3d]">
              {t.photosList.map((item: PhotoItem, idx: number) => {
                const offset = (idx - currentIndex + t.photosList.length) % t.photosList.length;
                let adjustedOffset = offset;
                if (offset > t.photosList.length / 2) {
                  adjustedOffset = offset - t.photosList.length;
                }

                const absOffset = Math.abs(adjustedOffset);
                const isActive = adjustedOffset === 0;

                const translateX = adjustedOffset * 220;
                const translateZ = -absOffset * 160;
                const rotateY = adjustedOffset * -30;
                const scale = isActive ? 1.12 : Math.max(0.68, 1 - absOffset * 0.16);
                const opacity = Math.max(0.2, 1 - absOffset * 0.32);
                const zIndex = 50 - absOffset;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      playSound('click');
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    className={`absolute w-[200px] sm:w-[280px] md:w-[350px] h-[330px] sm:h-[370px] md:h-[420px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out shadow-[0_30px_70px_rgba(0,0,0,0.85)] bg-zinc-950 border ${isActive ? 'border-blue-500 shadow-[0_30px_80px_rgba(59,130,246,0.55)] ring-2 ring-blue-500/30' : 'border-white/15 hover:border-white/40'}`}
                  >
                    <div className="w-full h-full relative pointer-events-none">
                      <img src={item.image} alt={item.title || "Gallery item"} className="w-full h-full object-cover" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STAR RATING & EMOJI */}
        <section className="mb-20 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl text-center shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-white">{t.ratingTitle}</h4>
              <p className="text-xs text-zinc-400 font-mono">Rating: <span className="text-yellow-400 font-bold">{averageRating} / 5.0</span> ({ratingsData.count} review)</p>
              <div className="flex justify-center gap-2 pt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => handleRatePortfolio(star)} disabled={userRated} className="text-2xl transition transform hover:scale-125 active:scale-95">⭐</button>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div><h4 className="text-sm font-bold text-white">{t.reactionsTitle}</h4><p className="text-xs text-zinc-400 font-mono mt-0.5">{t.reactionsSub}</p></div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleReaction('fire')} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1.5 transition active:scale-95"><span>🔥</span><span className="font-mono">{reactions.fire}</span></button>
                <button onClick={() => handleReaction('clap')} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1.5 transition active:scale-95"><span>👏</span><span className="font-mono">{reactions.clap}</span></button>
                <button onClick={() => handleReaction('light')} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1.5 transition active:scale-95"><span>💡</span><span className="font-mono">{reactions.light}</span></button>
                <button onClick={() => handleReaction('love')} className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs flex items-center gap-1.5 transition active:scale-95"><span>❤️</span><span className="font-mono">{reactions.love}</span></button>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & COMMENTS */}
        <section id="contact" className="mb-20 scroll-mt-36 scroll-animate opacity-0 translate-y-10 transition-all duration-700">
          <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-5">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 tracking-tight"><span className={themeColors.text + " font-mono text-sm font-bold"}>04</span> / {t.contactHeader}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* FormSubmit Connected Contact Form */}
            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-8 bg-zinc-950/80 border border-white/10 rounded-3xl shadow-2xl space-y-6 backdrop-blur-xl">
              <div className="relative z-10"><h3 className="text-lg font-bold text-white mb-1 tracking-tight">{t.contactFormTitle}</h3><p className="text-xs text-zinc-400 font-mono">{t.contactFormSub}</p></div>
              
              {formSubmitted && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-mono relative z-10">
                  {t.successMessage}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs relative z-10">
                <div>
                  <label className="block text-zinc-400 mb-2 font-semibold">{t.nameLabel}</label>
                  <input 
                    type="text" 
                    name="name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-sans shadow-inner transition-colors duration-300" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 font-semibold">{t.emailLabel}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-sans shadow-inner transition-colors duration-300" 
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 font-semibold">{t.messageLabel}</label>
                  <textarea 
                    name="message"
                    rows={4} 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none font-sans shadow-inner transition-colors duration-300"
                  ></textarea>
                </div>
                <button type="submit" className={`block text-center w-full ${themeColors.primary} text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] shadow-lg tracking-wider uppercase font-sans`}>{t.sendForm}</button>
                <a href={whatsappUrl} onClick={() => playSound('click')} target="_blank" rel="noopener noreferrer" className={`block text-center w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-[1.02] shadow-lg tracking-wider uppercase font-sans mt-2`}>{t.sendWhatsapp}</a>
              </form>
            </div>

            <div onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-8 bg-zinc-950/80 border border-white/10 rounded-3xl shadow-2xl flex flex-col justify-between space-y-6 backdrop-blur-xl">
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between tracking-tight"><span>{t.commentsTitle} ({comments.length})</span><span className={`text-xs font-mono px-2.5 py-1 rounded-full border shadow-sm animate-pulse ${themeColors.badge}`}>Live & Saved</span></h3>
                <form onSubmit={handleAddComment} className="space-y-3 mb-6">
                  <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="..." className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono shadow-inner transition-colors duration-300" required />
                  <div className="flex gap-2">
                    <input type="text" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="..." className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono shadow-inner transition-colors duration-300" required />
                    <button type="submit" className={`${themeColors.primary} text-white px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 transform active:scale-95 hover:scale-105 shrink-0 shadow-lg`}>Kirim</button>
                  </div>
                </form>
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {comments.map((item: CommentItem, idx: number) => (
                    <div key={idx} className="p-3.5 bg-zinc-900/60 border border-white/5 rounded-2xl flex justify-between items-center text-xs shadow-sm transition-all duration-300 hover:border-blue-500/30">
                      <div className="space-y-1"><span className={`font-bold font-mono tracking-wide ${themeColors.text}`}>{item.name}</span><p className="text-zinc-300 font-sans">{item.comment}</p></div>
                      <span className="text-[10px] font-mono text-zinc-500 shrink-0 ml-2">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white tracking-tight">{t.findMe}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={profile.socials.linkedin.url} target="_blank" rel="noopener noreferrer" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} onClick={() => playSound('click')} className="spotlight-card p-6 bg-zinc-950/80 border border-white/10 rounded-3xl shadow-xl backdrop-blur-xl flex items-center gap-5 transition-all duration-300 hover:border-blue-500/50 hover:scale-[1.02] active:scale-95 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform relative z-10">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div className="relative z-10"><h4 className="text-base font-bold text-white tracking-tight">{profile.socials.linkedin.label}</h4><p className="text-xs text-zinc-400 font-mono mt-0.5">{profile.socials.linkedin.sub}</p></div>
              </a>
              <a href={profile.socials.instagram.url} target="_blank" rel="noopener noreferrer" onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} onClick={() => playSound('click')} className="spotlight-card p-6 bg-zinc-950/80 border border-white/10 rounded-3xl shadow-xl backdrop-blur-xl flex items-center gap-5 transition-all duration-300 hover:border-pink-500/50 hover:scale-[1.02] active:scale-95 group">
                <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform relative z-10">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="relative z-10"><h4 className="text-base font-bold text-white tracking-tight">Instagram</h4><p className="text-xs text-zinc-400 font-mono mt-0.5">{profile.socials.instagram.sub}</p></div>
              </a>
              <div onClick={() => handleCopyText(profile.contact.email, 'email')} onMouseMove={handleCardMouseMove} onMouseLeave={handleCardMouseLeave} className="spotlight-card p-6 bg-zinc-950/80 border border-white/10 rounded-3xl shadow-xl backdrop-blur-xl flex items-center gap-5 transition-all duration-300 hover:border-red-500/50 hover:scale-[1.02] active:scale-95 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform relative z-10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2.22 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="relative z-10 overflow-hidden"><h4 className="text-base font-bold text-white tracking-tight">Email</h4><p className="text-xs text-zinc-400 font-mono mt-0.5 truncate max-w-[180px]">{copiedLabel === 'email' ? 'Copied Email! ✓' : profile.contact.email}</p></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}