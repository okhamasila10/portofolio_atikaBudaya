import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import infographicImage from './POSTER INFOGRAFIS.png';
import myPhoto from './my_photo.jpeg';

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Learning cards data
  const learningCards = [
    {
      id: 1,
      title: "Pertemuan 1",
      icon: "people",
      topic: "Etika dan Budaya dalam Kehidupan Sosial",
      pertanyaanInti: "Mengapa etika dan budaya penting dalam kehidupan bermasyarakat?",
      ringkasan: "Etika mengatur perilaku baik–buruk, sedangkan budaya menjadi pedoman hidup bersama yang diwariskan. Keduanya saling berkaitan dalam membentuk sikap individu di masyarakat.",
      refleksi: "Memahami etika dan budaya membantu saya bersikap lebih sopan, menghargai perbedaan, dan berinteraksi secara bijak."
    },
    {
      id: 2,
      title: "Pertemuan 2",
      icon: "globe",
      topic: "Pengertian Kebudayaan",
      pertanyaanInti: "Apa itu kebudayaan dan apa saja isinya?",
      ringkasan: "Pada pertemuan ini dibahas bahwa kebudayaan adalah semua hal yang dipelajari manusia dalam hidup bermasyarakat, seperti cara berpikir, bertindak, nilai, norma, bahasa, dan kebiasaan sehari-hari. Kebudayaan tidak dibawa sejak lahir, tetapi dipelajari dan diwariskan dari generasi ke generasi.",
      refleksi: "Dari materi ini saya jadi sadar bahwa kebiasaan yang saya lakukan sehari-hari ternyata bagian dari budaya yang saya pelajari dari lingkungan."
    },
    {
      id: 3,
      title: "Pertemuan 3",
      icon: "people",
      topic: "Peran Keluarga dalam Budaya",
      pertanyaanInti: "Seberapa penting peran keluarga dalam membentuk budaya seseorang?",
      ringkasan: "Keluarga merupakan tempat pertama bagi seseorang untuk belajar nilai, norma, dan perilaku. Melalui keluarga, budaya diwariskan sejak kecil, sebelum individu mengenal sekolah dan masyarakat luas.",
      refleksi: "Materi ini membuat saya memahami bahwa sikap dan perilaku seseorang banyak dipengaruhi oleh didikan dan contoh yang diberikan oleh keluarga."
    },
    {
      id: 4,
      title: "Pertemuan 4",
      icon: "shield",
      topic: "Budaya dan Nilai",
      pertanyaanInti: "Bagaimana nilai berperan dalam kehidupan budaya manusia?",
      ringkasan: "Nilai adalah pedoman tentang apa yang dianggap baik dan buruk dalam masyarakat. Nilai tidak terlihat secara langsung, tetapi tercermin dari sikap, perilaku, dan tindakan manusia dalam kehidupan sehari-hari.",
      refleksi: "Saya jadi lebih paham bahwa setiap tindakan yang dilakukan manusia sebenarnya mencerminkan nilai budaya yang dianutnya."
    },
    {
      id: 5,
      title: "Pertemuan 5",
      icon: "people",
      topic: "Egoisme vs Altruisme",
      pertanyaanInti: "Apakah manusia lebih mementingkan diri sendiri atau orang lain?",
      ringkasan: "Materi ini membahas bahwa manusia sering kali bertindak berdasarkan kepentingan pribadi (egoisme), tetapi di sisi lain juga mampu peduli dan menolong orang lain (altruisme). Dalam kehidupan sehari-hari, kedua sikap ini sering muncul bersamaan tergantung situasi yang dihadapi.",
      refleksi: "Dari pertemuan ini saya merasa bahwa tidak ada manusia yang sepenuhnya egois atau sepenuhnya altruistik. Saya sendiri sering berada di tengah, kadang memikirkan diri sendiri, kadang juga memikirkan orang lain."
    },
    {
      id: 6,
      title: "Pertemuan 6",
      icon: "shield",
      topic: "Hati Nurani dan Tanggung Jawab",
      pertanyaanInti: "Mengapa setiap tindakan manusia harus disertai tanggung jawab?",
      ringkasan: "Hati nurani adalah suara dalam diri yang memberi tahu apakah suatu tindakan benar atau salah. Manusia diberi kebebasan untuk memilih, tetapi kebebasan tersebut selalu diikuti oleh tanggung jawab atas akibat dari pilihan yang dibuat.",
      refleksi: "Materi ini membuat saya lebih sadar bahwa kebebasan bukan berarti boleh berbuat sesuka hati, karena setiap tindakan pasti ada konsekuensinya."
    },
    {
      id: 7,
      title: "Pertemuan 7",
      icon: "lightbulb",
      topic: "Etika dalam Kehidupan Sehari-hari",
      pertanyaanInti: "Mengapa etika penting dalam kehidupan manusia?",
      ringkasan: "Etika membantu manusia memahami mana tindakan yang baik dan mana yang buruk. Etika tidak hanya mengatur aturan, tetapi juga mengajak manusia berpikir sebelum bertindak, terutama ketika tindakan tersebut berdampak pada orang lain.",
      refleksi: "Setelah mempelajari etika, saya jadi lebih berhati-hati dalam bersikap dan mengambil keputusan, karena setiap tindakan memiliki nilai moral di dalamnya."
    },
    {
      id: 9,
      title: "Pertemuan 9",
      icon: "lightbulb",
      topic: "Teori-teori Etika",
      pertanyaanInti: "Gimana sebenarnya cara manusia nentuin benar dan salah?",
      ringkasan: "Pada pertemuan ini dibahas berbagai teori etika yang menunjukkan bahwa cara menilai benar dan salah bisa berbeda-beda, tergantung nilai, situasi, tujuan, dan sudut pandang yang digunakan.",
      refleksi: "Materi ini membuat saya lebih berhati-hati dalam menilai suatu tindakan, karena masalah etika tidak selalu bisa dilihat dari satu sisi saja."
    },
    {
      id: 10,
      title: "Pertemuan 10",
      icon: "shield",
      topic: "Etika Terapan",
      pertanyaanInti: "Bagaimana prinsip etika diterapkan dalam menghadapi masalah nyata dalam kehidupan?",
      ringkasan: "Etika terapan membahas penerapan prinsip dan teori etika untuk menyelesaikan persoalan moral yang muncul dalam kehidupan sehari-hari dan dunia profesional.",
      refleksi: "Materi ini membuat saya menyadari bahwa etika tidak berhenti di teori, tetapi harus digunakan saat menghadapi masalah nyata."
    }
  ];

  // Handle body overflow when modals are open
  useEffect(() => {
    if (isModalOpen || showEmailPopup || selectedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, showEmailPopup, selectedCard]);

  // Handle Escape key to close modal and popups
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
          setZoomLevel(1); // Reset zoom when closing
        }
        if (showEmailPopup) {
          setShowEmailPopup(false);
        }
        if (selectedCard) {
          setSelectedCard(null);
        }
      }
    };

    if (isModalOpen || showEmailPopup || selectedCard) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, showEmailPopup, selectedCard]);

  // Handle mouse wheel zoom and global mouse events
  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen && e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel((prev) => {
          const newZoom = Math.max(0.5, Math.min(3, prev + delta));
          // Reset position when zooming out to 1x
          if (newZoom <= 1) {
            setPosition({ x: 0, y: 0 });
          }
          return newZoom;
        });
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging && zoomLevel > 1) {
        e.preventDefault();
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Calculate bounds based on zoom level
        // Allow dragging up to 30% of viewport in each direction when zoomed
        const maxDrag = Math.min(window.innerWidth, window.innerHeight) * 0.3 * (zoomLevel - 1);
        
        setPosition({
          x: Math.max(-maxDrag, Math.min(maxDrag, newX)),
          y: Math.max(-maxDrag, Math.min(maxDrag, newY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isModalOpen) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isModalOpen, isDragging, dragStart, zoomLevel]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(3, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.5, prev - 0.25));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 }); // Reset position when resetting zoom
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setZoomLevel(1); // Reset zoom when opening
    setPosition({ x: 0, y: 0 }); // Reset position when opening
  };

  // Handle drag start
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1 && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      // Calculate bounds based on zoom level
      const maxDrag = Math.min(window.innerWidth, window.innerHeight) * 0.3 * (zoomLevel - 1);
      
      setPosition({
        x: Math.max(-maxDrag, Math.min(maxDrag, newX)),
        y: Math.max(-maxDrag, Math.min(maxDrag, newY))
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleDownloadReport = () => {
    // Convert Google Docs URL to PDF export format
    const documentId = '1E1D-dKpeucnQi-_a7jOYgpa-sPO_aLvVglz2OhNIGPE';
    const pdfUrl = `https://docs.google.com/document/d/${documentId}/export?format=pdf`;
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Laporan_Etika_Budaya.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    setShowEmailPopup(true);
  };

  const handleCopyEmail = () => {
    const email = 'okhamasila10@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      // Show feedback that email was copied
      const popup = document.querySelector('.email-popup-content');
      if (popup) {
        const originalText = popup.querySelector('.email-text').textContent;
        popup.querySelector('.email-text').textContent = 'Copied!';
        setTimeout(() => {
          popup.querySelector('.email-text').textContent = originalText;
        }, 1500);
      }
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Helper function to get icon SVG based on icon type
  const getIconSVG = (iconType) => {
    const icons = {
      play: (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.8 1.83C3.03 1.4 2.06 1.39 1.28 1.79C0.49 2.18 0 2.93 0 3.75V20.25C0 21.07 0.49 21.82 1.28 22.21C2.06 22.61 3.03 22.59 3.8 22.17L18.8 13.92C19.55 13.51 20 12.79 20 12C20 11.21 19.55 10.49 18.8 10.08L3.8 1.83Z" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
        </svg>
      ),
      people: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="7" r="4" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <circle cx="19" cy="7" r="3" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <path d="M3 20C3 16 6 13 10 13C14 13 17 16 17 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M17 20C17 17 19 15 22 15" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      shield: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L21.5 3.5C22.5 3.9 23 4.8 23 5.8C23 11.2 20.5 19.5 13 23C12.3 23.3 11.7 23.3 11 23C3.5 19.5 1 11.2 1 5.8C1 4.8 1.5 3.9 2.5 3.5L12 0Z" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <path d="M12 6L16 8.5V13.5L12 16L8 13.5V8.5L12 6Z" fill="rgba(255,255,255,0.9)"/>
        </svg>
      ),
      robot: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="4" width="12" height="14" rx="2" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <rect x="10" y="1" width="4" height="3" rx="1" fill="white"/>
          <circle cx="9" cy="10" r="1.5" fill="rgba(103,148,54,0.8)"/>
          <circle cx="15" cy="10" r="1.5" fill="rgba(103,148,54,0.8)"/>
          <rect x="9" y="14" width="6" height="2" rx="1" fill="rgba(103,148,54,0.8)"/>
          <rect x="2" y="8" width="2" height="6" rx="1" fill="white"/>
          <rect x="20" y="8" width="2" height="6" rx="1" fill="white"/>
        </svg>
      ),
      globe: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M2 12H22M12 2C14.5 6 16 9.5 16 12C16 14.5 14.5 18 12 22C9.5 18 8 14.5 8 12C8 9.5 9.5 6 12 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="white"/>
        </svg>
      ),
      lightbulb: (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C6.5 0 3.5 3 3.5 6.5C3.5 8 4 9.5 5 10.5C5.5 11 6 11.5 6.5 12C7.5 13 8 14 8.5 15H11.5C12 14 12.5 13 13.5 12C14 11.5 14.5 11 15 10.5C16 9.5 16.5 8 16.5 6.5C16.5 3 13.5 0 10 0Z" fill="white" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          <path d="M7 18H13V20.5C13 21.3 12.3 22 11.5 22H8.5C7.7 22 7 21.3 7 20.5V18Z" fill="white"/>
          <path d="M8 22H12V24H8V22Z" fill="white"/>
          <circle cx="7.5" cy="8" r="1" fill="rgba(255,255,255,0.8)"/>
          <circle cx="12.5" cy="8" r="1" fill="rgba(255,255,255,0.8)"/>
        </svg>
      )
    };
    return icons[iconType] || icons.play;
  };

  const getIconClass = (iconType) => {
    const iconClasses = {
      play: 'card-icon-play',
      people: 'card-icon-people',
      shield: 'card-icon-shield',
      robot: 'card-icon-robot',
      globe: 'card-icon-globe',
      lightbulb: 'card-icon-lightbulb'
    };
    return iconClasses[iconType] || 'card-icon-play';
  };

  return (
    <div className="portfolio-container">
      <header className="portfolio-header"></header>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="profile-info">
              <h1 className="name-title">
                <span className="name-black">Okhama</span>
                <span className="name-green"> Siladata</span>
                <br />
                <span className="name-black">Devi</span>
                <span className="name-green">septe</span>
              </h1>
              
              <div className="profile-details">
                <p className="major">Computer Science Major</p>
                <p className="student-id">Student ID: 2210101015</p>
                
                <div className="personality-badge">
                  <svg className="badge-icon" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_8_15)">
                      <path d="M3 4C3 2.93913 3.42143 1.92172 4.17157 1.17157C4.92172 0.421427 5.93913 0 7 0C8.06087 0 9.07828 0.421427 9.82843 1.17157C10.5786 1.92172 11 2.93913 11 4C11 5.06087 10.5786 6.07828 9.82843 6.82843C9.07828 7.57857 8.06087 8 7 8C5.93913 8 4.92172 7.57857 4.17157 6.82843C3.42143 6.07828 3 5.06087 3 4ZM0 15.0719C0 11.9937 2.49375 9.5 5.57188 9.5H8.42813C11.5063 9.5 14 11.9937 14 15.0719C14 15.5844 13.5844 16 13.0719 16H0.928125C0.415625 16 0 15.5844 0 15.0719ZM19.5312 5.53125L15.5312 9.53125C15.2375 9.825 14.7625 9.825 14.4719 9.53125L12.4719 7.53125C12.1781 7.2375 12.1781 6.7625 12.4719 6.47188C12.7656 6.18125 13.2406 6.17813 13.5312 6.47188L15 7.94063L18.4688 4.46875C18.7625 4.175 19.2375 4.175 19.5281 4.46875C19.8188 4.7625 19.8219 5.2375 19.5281 5.52812L19.5312 5.53125Z" fill="#679436"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_8_15">
                        <path d="M0 0H20V16H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="badge-text">INFJ Personality</span>
                </div>
              </div>

              <p className="bio-text">
                Passionate about technology and creating meaningful digital experiences that make a positive impact on society.
              </p>

              <div className="bio-social">
                <a href="https://www.linkedin.com/in/okhama-siladata-devisepte-467361374?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" className="bio-social-icon" title="LinkedIn">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_bio_linkedin)">
                      <path d="M16.25 1.25H1.24609C0.558594 1.25 0 1.81641 0 2.51172V17.4883C0 18.1836 0.558594 18.75 1.24609 18.75H16.25C16.9375 18.75 17.5 18.1836 17.5 17.4883V2.51172C17.5 1.81641 16.9375 1.25 16.25 1.25ZM5.28906 16.25H2.69531V7.89844H5.29297V16.25H5.28906ZM3.99219 6.75781C3.16016 6.75781 2.48828 6.08203 2.48828 5.25391C2.48828 4.42578 3.16016 3.75 3.99219 3.75C4.82031 3.75 5.49609 4.42578 5.49609 5.25391C5.49609 6.08594 4.82422 6.75781 3.99219 6.75781ZM15.0117 16.25H12.418V12.1875C12.418 11.2188 12.3984 9.97266 11.0703 9.97266C9.71875 9.97266 9.51172 11.0273 9.51172 12.1172V16.25H6.91797V7.89844H9.40625V9.03906H9.44141C9.78906 8.38281 10.6367 7.69141 11.8984 7.69141C14.5234 7.69141 15.0117 9.42188 15.0117 11.6719V16.25Z" fill="#50514F"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_bio_linkedin">
                        <path d="M0 0H17.5V20H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <button onClick={handleEmailClick} className="bio-social-icon" title="Email">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.875 2.5C0.839844 2.5 0 3.33984 0 4.375C0 4.96484 0.277344 5.51953 0.75 5.875L9.25 12.25C9.69531 12.582 10.3047 12.582 10.75 12.25L19.25 5.875C19.7227 5.51953 20 4.96484 20 4.375C20 3.33984 19.1602 2.5 18.125 2.5H1.875ZM0 6.875V15C0 16.3789 1.12109 17.5 2.5 17.5H17.5C18.8789 17.5 20 16.3789 20 15V6.875L11.5 13.25C10.6094 13.918 9.39062 13.918 8.5 13.25L0 6.875Z" fill="#50514F"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="profile-image-wrapper">
              <img 
                src={myPhoto} 
                alt="Profile" 
                className="profile-image"
              />
              <div className="code-badge">
                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_8_26)">
                    <path d="M15.3438 0.0468683C14.6797 -0.144538 13.9883 0.242181 13.7969 0.906243L8.79688 18.4062C8.60547 19.0703 8.99219 19.7617 9.65625 19.9531C10.3203 20.1445 11.0117 19.7578 11.2031 19.0937L16.2031 1.59374C16.3945 0.929681 16.0078 0.238275 15.3438 0.0468683ZM18.4922 4.73827C18.0039 5.22656 18.0039 6.01952 18.4922 6.50781L21.9805 9.99999L18.4883 13.4922C18 13.9805 18 14.7734 18.4883 15.2617C18.9766 15.75 19.7695 15.75 20.2578 15.2617L24.6328 10.8867C25.1211 10.3984 25.1211 9.60546 24.6328 9.11718L20.2578 4.74218C19.7695 4.2539 18.9766 4.2539 18.4883 4.74218L18.4922 4.73827ZM6.51172 4.73827C6.02344 4.24999 5.23047 4.24999 4.74219 4.73827L0.367188 9.11327C-0.121094 9.60156 -0.121094 10.3945 0.367188 10.8828L4.74219 15.2578C5.23047 15.7461 6.02344 15.7461 6.51172 15.2578C7 14.7695 7 13.9766 6.51172 13.4883L3.01953 9.99999L6.51172 6.50781C7 6.01952 7 5.22656 6.51172 4.73827Z" fill="#50514F"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_8_26">
                      <path d="M0 0H25V20H0V0Z" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="education-badge">
                <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_8_31)">
                    <path d="M12.5001 1.25C12.1837 1.25 11.8712 1.30469 11.5743 1.41016L0.617301 5.36719C0.246207 5.50391 0.000112979 5.85547 0.000112979 6.25C0.000112979 6.64453 0.246207 6.99609 0.617301 7.13281L2.87902 7.94922C2.23839 8.95703 1.87511 10.1484 1.87511 11.4023V12.5C1.87511 13.6094 1.45324 14.7539 1.00402 15.6562C0.750113 16.1641 0.461051 16.6641 0.125113 17.125C0.000112981 17.293 -0.0350433 17.5117 0.0352692 17.7109C0.105582 17.9102 0.269644 18.0586 0.472769 18.1094L2.97277 18.7344C3.13683 18.7773 3.31261 18.7461 3.45714 18.6562C3.60168 18.5664 3.70324 18.418 3.73449 18.25C4.07043 16.5781 3.90246 15.0781 3.65246 14.0039C3.52746 13.4492 3.35949 12.8828 3.12511 12.3633V11.4023C3.12511 10.2227 3.52355 9.10937 4.21496 8.21875C4.71886 7.61328 5.37121 7.125 6.13683 6.82422L12.2696 4.41406C12.59 4.28906 12.9532 4.44531 13.0782 4.76562C13.2032 5.08594 13.047 5.44922 12.7267 5.57422L6.59386 7.98438C6.10949 8.17578 5.68371 8.46875 5.33605 8.82812L11.5704 11.0781C11.8673 11.1836 12.1798 11.2383 12.4962 11.2383C12.8126 11.2383 13.1251 11.1836 13.422 11.0781L24.3829 7.13281C24.754 7 25.0001 6.64453 25.0001 6.25C25.0001 5.85547 24.754 5.50391 24.3829 5.36719L13.4259 1.41016C13.129 1.30469 12.8165 1.25 12.5001 1.25ZM5.00011 15.9375C5.00011 17.3164 8.35949 18.75 12.5001 18.75C16.6407 18.75 20.0001 17.3164 20.0001 15.9375L19.4025 10.2578L13.8478 12.2656C13.4142 12.4219 12.9571 12.5 12.5001 12.5C12.0431 12.5 11.5821 12.4219 11.1525 12.2656L5.59777 10.2578L5.00011 15.9375Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_8_31">
                      <path d="M0 0H25V20H0V0Z" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="decorative-circle decorative-circle-1"></div>
          <div className="decorative-circle decorative-circle-2"></div>
          <div className="decorative-circle decorative-circle-3"></div>
        </div>
      </section>

      <section className="learnings-section">
        <div className="learnings-content">
          <div className="section-header">
            <h2 className="section-title">Ethics and Culture Course Learnings</h2>
            <p className="section-subtitle">ethics and culture</p>
            <p className="section-instructor">Dosen Pengampu: Althien John Pesurnay, M.Phil.</p>
            <div className="instructor-social">
              <a href="https://scholar.google.com/citations?user=68OpZicAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="instructor-social-icon" title="Google Scholar">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 3.5L10 1L14.5 3.5V7.5L10 10L5.5 7.5V3.5Z" fill="#50514F"/>
                  <path d="M3 8L10 12L17 8V15L10 19L3 15V8Z" fill="#50514F" opacity="0.8"/>
                  <path d="M10 12V19" stroke="#50514F" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </a>
              <a href="https://id.linkedin.com/in/althien-john-pesurnay-32660224" target="_blank" rel="noopener noreferrer" className="instructor-social-icon" title="LinkedIn">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_instructor_linkedin)">
                    <path d="M16.25 1.25H1.24609C0.558594 1.25 0 1.81641 0 2.51172V17.4883C0 18.1836 0.558594 18.75 1.24609 18.75H16.25C16.9375 18.75 17.5 18.1836 17.5 17.4883V2.51172C17.5 1.81641 16.9375 1.25 16.25 1.25ZM5.28906 16.25H2.69531V7.89844H5.29297V16.25H5.28906ZM3.99219 6.75781C3.16016 6.75781 2.48828 6.08203 2.48828 5.25391C2.48828 4.42578 3.16016 3.75 3.99219 3.75C4.82031 3.75 5.49609 4.42578 5.49609 5.25391C5.49609 6.08594 4.82422 6.75781 3.99219 6.75781ZM15.0117 16.25H12.418V12.1875C12.418 11.2188 12.3984 9.97266 11.0703 9.97266C9.71875 9.97266 9.51172 11.0273 9.51172 12.1172V16.25H6.91797V7.89844H9.40625V9.03906H9.44141C9.78906 8.38281 10.6367 7.69141 11.8984 7.69141C14.5234 7.69141 15.0117 9.42188 15.0117 11.6719V16.25Z" fill="#50514F"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_instructor_linkedin">
                      <path d="M0 0H17.5V20H0V0Z" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          <div className="learnings-grid">
            {learningCards.map((card) => (
              <button
                key={card.id}
                className="learning-card"
                onClick={() => handleCardClick(card)}
              >
                <div className="card-header">
                  <div className={`card-icon ${getIconClass(card.icon)}`}>
                    {getIconSVG(card.icon)}
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="report-section">
        <div className="report-content">
          <div className="section-header">
            <h2 className="section-title">Final Report & Infographic</h2>
            <p className="section-subtitle">Comprehensive analysis and visual representation of course insights</p>
          </div>

          <div className="report-grid">
            <div className="report-left">
              <div className="report-card">
                <div className="report-card-header">
                  <div className="report-icon">
                    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_8_144)">
                        <path d="M3 0C1.34531 0 0 1.34531 0 3V21C0 22.6547 1.34531 24 3 24H15C16.6547 24 18 22.6547 18 21V7.5H12C11.1703 7.5 10.5 6.82969 10.5 6V0H3ZM12 0V6H18L12 0ZM5.25 12H12.75C13.1625 12 13.5 12.3375 13.5 12.75C13.5 13.1625 13.1625 13.5 12.75 13.5H5.25C4.8375 13.5 4.5 13.1625 4.5 12.75C4.5 12.3375 4.8375 12 5.25 12ZM5.25 15H12.75C13.1625 15 13.5 15.3375 13.5 15.75C13.5 16.1625 13.1625 16.5 12.75 16.5H5.25C4.8375 16.5 4.5 16.1625 4.5 15.75C4.5 15.3375 4.8375 15 5.25 15ZM5.25 18H12.75C13.1625 18 13.5 18.3375 13.5 18.75C13.5 19.1625 13.1625 19.5 12.75 19.5H5.25C4.8375 19.5 4.5 19.1625 4.5 18.75C4.5 18.3375 4.8375 18 5.25 18Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_8_144">
                          <path d="M0 0H18V24H0V0Z" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="report-text">
                    <h3 className="report-title">Final Report</h3>
                    <p className="report-desc">Comprehensive analysis document</p>
                  </div>
                </div>
                <p className="report-description">
                  Pengaruh Budaya Korea dan Jepang Melalui Entertainment Terhadap Fashion Anak Muda di Indonesia
                </p>
                <button className="btn-download" onClick={handleDownloadReport}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_8_156)">
                      <path d="M9 1C9 0.446875 8.55313 0 8 0C7.44688 0 7 0.446875 7 1V8.58438L4.70625 6.29063C4.31563 5.9 3.68125 5.9 3.29063 6.29063C2.9 6.68125 2.9 7.31563 3.29063 7.70625L7.29063 11.7063C7.68125 12.0969 8.31563 12.0969 8.70625 11.7063L12.7063 7.70625C13.0969 7.31563 13.0969 6.68125 12.7063 6.29063C12.3156 5.9 11.6812 5.9 11.2906 6.29063L9 8.58438V1ZM2 11C0.896875 11 0 11.8969 0 13V14C0 15.1031 0.896875 16 2 16H14C15.1031 16 16 15.1031 16 14V13C16 11.8969 15.1031 11 14 11H10.8281L9.4125 12.4156C8.63125 13.1969 7.36562 13.1969 6.58437 12.4156L5.17188 11H2ZM13.5 12.75C13.6989 12.75 13.8897 12.829 14.0303 12.9697C14.171 13.1103 14.25 13.3011 14.25 13.5C14.25 13.6989 14.171 13.8897 14.0303 14.0303C13.8897 14.171 13.6989 14.25 13.5 14.25C13.3011 14.25 13.1103 14.171 12.9697 14.0303C12.829 13.8897 12.75 13.6989 12.75 13.5C12.75 13.3011 12.829 13.1103 12.9697 12.9697C13.1103 12.829 13.3011 12.75 13.5 12.75Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_8_156">
                        <path d="M0 0H16V16H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  Download Report
                </button>
              </div>

              <div className="highlights-card">
                <h4 className="highlights-title">Podcast Video</h4>
                <div className="youtube-container">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/y6w-cx_6XAg"
                    title="Report Highlights Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="youtube-iframe"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="infographic-card">
              <h3 className="infographic-title">Course Journey Infographic</h3>
              <div className="infographic-placeholder">
                <img 
                  src={infographicImage} 
                  alt="Course Journey Infographic" 
                  className="infographic-image"
                />
              </div>
              <div className="infographic-footer">
                <p className="infographic-text">Visual summary of key learnings and personal growth throughout the course</p>
                <button className="btn-view" onClick={handleOpenModal}>
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_8_180)">
                      <path d="M8.99995 1C6.47495 1 4.45308 2.15 2.9812 3.51875C1.5187 4.875 0.540576 6.5 0.0780762 7.61562C-0.0250488 7.8625 -0.0250488 8.1375 0.0780762 8.38437C0.540576 9.5 1.5187 11.125 2.9812 12.4812C4.45308 13.85 6.47495 15 8.99995 15C11.525 15 13.5468 13.85 15.0187 12.4812C16.4812 11.1219 17.4593 9.5 17.9249 8.38437C18.0281 8.1375 18.0281 7.8625 17.9249 7.61562C17.4593 6.5 16.4812 4.875 15.0187 3.51875C13.5468 2.15 11.525 1 8.99995 1ZM4.49995 8C4.49995 6.80653 4.97406 5.66193 5.81797 4.81802C6.66188 3.97411 7.80648 3.5 8.99995 3.5C10.1934 3.5 11.338 3.97411 12.1819 4.81802C13.0258 5.66193 13.5 6.80653 13.5 8C13.5 9.19347 13.0258 10.3381 12.1819 11.182C11.338 12.0259 10.1934 12.5 8.99995 12.5C7.80648 12.5 6.66188 12.0259 5.81797 11.182C4.97406 10.3381 4.49995 9.19347 4.49995 8ZM8.99995 6C8.99995 7.10313 8.10308 8 6.99995 8C6.77808 8 6.56558 7.9625 6.36558 7.89687C6.1937 7.84062 5.9937 7.94688 5.99995 8.12813C6.00933 8.34375 6.04058 8.55937 6.09995 8.775C6.52808 10.375 8.17495 11.325 9.77495 10.8969C11.375 10.4688 12.325 8.82188 11.8968 7.22188C11.55 5.925 10.4031 5.05312 9.12808 5C8.94683 4.99375 8.84058 5.19062 8.89683 5.36562C8.96245 5.56562 8.99995 5.77812 8.99995 6Z" fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_8_180">
                        <path d="M0 0H18V16H0V0Z" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  View Full Size
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <div className="footer-content">
          <h2 className="footer-title">Thank You for Visiting</h2>
          <p className="footer-text">
            This portfolio represents my journey through the Ethics and Culture course, showcasing not just academic achievements but personal growth and commitment to ethical technology practices.
          </p>
          <p className="footer-copyright">© 2025 Okhama Siladata Devisepte. All rights reserved.</p>
        </div>
      </footer>

      {/* Full Size Image Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Zoom Controls */}
            <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
              <button className="zoom-btn" onClick={handleZoomOut} title="Zoom Out">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <span className="zoom-level">{Math.round(zoomLevel * 100)}%</span>
              <button className="zoom-btn" onClick={handleZoomIn} title="Zoom In">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="zoom-btn" onClick={handleResetZoom} title="Reset Zoom">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12C3 7.58172 6.58172 4 11 4C13.0133 4 14.8684 4.71345 16.2913 5.92621M21 12C21 16.4183 17.4183 20 13 20C10.9867 20 9.13156 19.2866 7.70874 18.0738M7.70874 18.0738L10.5 15M7.70874 18.0738L5 20.5M16.2913 5.92621L13.5 9M16.2913 5.92621L19 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div 
              className={`modal-image-container ${isDragging ? 'dragging' : ''}`}
              style={{ 
                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img 
                src={infographicImage} 
                alt="Course Journey Infographic - Full Size" 
                className="modal-image"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* Email Popup */}
      {showEmailPopup && (
        <div className="email-popup-overlay" onClick={() => setShowEmailPopup(false)}>
          <div className="email-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="email-popup-close" onClick={() => setShowEmailPopup(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="email-popup-body">
              <svg width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="email-popup-icon">
                <path d="M1.875 2.5C0.839844 2.5 0 3.33984 0 4.375C0 4.96484 0.277344 5.51953 0.75 5.875L9.25 12.25C9.69531 12.582 10.3047 12.582 10.75 12.25L19.25 5.875C19.7227 5.51953 20 4.96484 20 4.375C20 3.33984 19.1602 2.5 18.125 2.5H1.875ZM0 6.875V15C0 16.3789 1.12109 17.5 2.5 17.5H17.5C18.8789 17.5 20 16.3789 20 15V6.875L11.5 13.25C10.6094 13.918 9.39062 13.918 8.5 13.25L0 6.875Z" fill="#679436"/>
              </svg>
              <h3 className="email-popup-title">Email Address</h3>
              <p className="email-text">okhamaasila10@gmail.com</p>
              <button className="email-copy-btn" onClick={handleCopyEmail}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 3.5C5.5 2.67157 6.17157 2 7 2H10.5C11.3284 2 12 2.67157 12 3.5V7C12 7.82843 11.3284 8.5 10.5 8.5H9.5V9.5C9.5 10.3284 8.82843 11 8 11H4.5C3.67157 11 3 10.3284 3 9.5V6C3 5.17157 3.67157 4.5 4.5 4.5H5.5V3.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M9.5 4.5H10.5C11.3284 4.5 12 5.17157 12 6V7" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Copy Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Learning Card Details Popup */}
      {selectedCard && (
        <div className="card-popup-overlay" onClick={() => setSelectedCard(null)}>
          <div className="card-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="card-popup-close" onClick={() => setSelectedCard(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="card-popup-body">
              <div className="card-popup-header">
                <div className={`card-icon ${getIconClass(selectedCard.icon)}`}>
                  {getIconSVG(selectedCard.icon)}
                </div>
                <h2 className="card-popup-title">{selectedCard.title}</h2>
              </div>
              
              {selectedCard.topic && (
                <div className="card-popup-section">
                  <h4 className="card-popup-subtitle">1. Judul Topik</h4>
                  <p className="card-popup-text">{selectedCard.topic}</p>
                </div>
              )}

              {selectedCard.pertanyaanInti && (
                <div className="card-popup-section">
                  <h4 className="card-popup-subtitle">2. Pertanyaan Inti</h4>
                  <p className="card-popup-text">{selectedCard.pertanyaanInti}</p>
                </div>
              )}

              {selectedCard.ringkasan && (
                <div className="card-popup-section">
                  <h4 className="card-popup-subtitle">3. Ringkasan</h4>
                  <p className="card-popup-text">{selectedCard.ringkasan}</p>
                </div>
              )}

              {selectedCard.refleksi && (
                <div className="card-popup-section">
                  <h4 className="card-popup-subtitle">4. Refleksi</h4>
                  <p className="card-popup-text">{selectedCard.refleksi}</p>
                </div>
              )}

              {/* Fallback for old card structure */}
              {selectedCard.details && !selectedCard.topic && (
                <div className="card-popup-section">
                  <h4 className="card-popup-subtitle">Details:</h4>
                  <p className="card-popup-text">{selectedCard.details}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
