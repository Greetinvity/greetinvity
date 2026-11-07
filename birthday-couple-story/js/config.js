/**
 * ====================================================================
 * PENGATURAN PESANAN PASANGAN / COUPLE (CONFIG.JS)
 * ====================================================================
 * Berkas ini dirancang khusus untuk pesanan ucapan ulang tahun pasangan
 * (pacar, suami/istri, ayang, crush). Cukup edit teks & foto di bawah ini!
 * ====================================================================
 */

window.COUPLE_CONFIG = {
    // 1. DATA PASANGAN (PENERIMA)
    recipient: {
        name: "Nabila Aurelia",            // Nama lengkap pacar/pasangan
        nickname: "Ayang Nabila",          // Panggilan sayang
        age: 21,                           // Usia ulang tahun
        dateText: "24 November 2026",      // Tanggal ulang tahun
        gender: "female",                  // "female" atau "male"
    },

    // 2. DATA PENGIRIM (PEMESAN)
    sender: {
        name: "Daffa Althaf",              // Nama pengirim (klien)
        nickname: "Daffa",                 // Panggilan pengirim
        whatsappNumber: "6281234567890",   // Nomor WA klien untuk tombol balasan terima kasih
        relationshipDuration: "730 Hari (2 Tahun)", // Lama pacaran / hubungan
    },

    // 3. SLIDE 1: COVER SAMBUTAN LUCU
    slide1: {
        badge: "✨ OFFICIAL BIRTHDAY OF MY FAVORITE PERSON ✨",
        title: "Happy Birthday,",
        subtitle: "Hari ini semesta libur berputar sebentar demi merayakan ulang tahun manusia paling lucu, paling gemesin, dan paling ngangenin di dunia ini!",
        funnyQuote: "“Terima kasih sudah lahir ke dunia ini, dan terima kasih sudah memilihku jadi pasanganmu (pilihan yang sangat tepat tentunya haha)!” 💖"
    },

    // 4. SLIDE 2: KALKULATOR KADAR BUCIN (LOVE METER)
    slide2: {
        title: "Tes Kadar Bucin & Rasa Sayang 📈💘",
        subtitle: "Banyak yang nanya seberapa sayang sih aku sama kamu? Coba tekan tombol di bawah ini berkali-kali untuk mengukurnya:",
        targetPercent: 9999,
        overflowMessage: "ERROR: KADAR CINTA MELUAP! 💥 Angkanya gak muat karena rasa sayangku ke kamu udah melampaui galaksi Bima Sakti!"
    },

    // 5. SLIDE 3: 3D CAKE & TIUP LILIN
    slide3: {
        title: "Make a Wish & Tiup Lilin 🎂",
        subtitle: "Kue 3D ini bisa kamu putar 360°! Pejamkan mata, bayangkan wajah ganteng/cantik aku, buat harapan terbaikmu, lalu tekan tombol tiup!",
        wishRevealed: "✨ Harapanmu telah meluncur ke langit! Semoga bahagia selalu, makin sayang sama aku, dan rezekimu lancar terus ya sayang! 🕊️"
    },

    // 6. SLIDE 4: GALERI KENANGAN "MOMEN MANIS & RANDOM KITA"
    slide4: {
        title: "Lembaran Jejak Kenangan Kita 📸🎬",
        subtitle: "Kumpulan momen di mana kita tertawa bareng, makan bareng, dan bikin memori yang gak bakal pernah aku lupakan:",
        photos: [
            {
                url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
                caption: "Waktu kencan pertama yang sok jaim padahal salting parah ☕",
                date: "Maret 2025"
            },
            {
                url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
                caption: "Nongkrong di pantai sampai malam sambil ngobrolin masa depan 🌊",
                date: "Agustus 2025"
            },
            {
                url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
                caption: "Senyum manis yang selalu berhasil bikin hari-hariku tenang ✨",
                date: "Januari 2026"
            }
        ],
        video: {
            title: "Video Kompilasi Momen Lucu Kita 🎬",
            embedUrl: "https://www.youtube.com/embed/2g811Eo7K8U"
        }
    },

    // 7. SLIDE 5: KUIS KEJUJURAN HUBUNGAN ("SIAPA YANG PALING...")
    slide5: {
        title: "Kuis Kejujuran Hubungan Kita 🤫🤣",
        subtitle: "Jawab dengan jujur ya, jangan ada dusta di antara kita!",
        questions: [
            {
                q: "Kalau ditanya 'Mau makan di mana?', siapa yang paling sering jawab 'Terserah'?",
                options: ["Ayang (Kamu)", "Aku"],
                correct: 0,
                funFeedback: "Tuh kan ngaku! Giliran ditawarin nasi goreng gamau, mie gamau, akhirnya bingung sendiri haha! 😂"
            },
            {
                q: "Siapa yang kalau lagi ngambek mukanya paling gemesin sedunia?",
                options: ["Ayang (Kamu dong!)", "Aku"],
                correct: 0,
                funFeedback: "Iya kamu! Mau cemberut kaya gimanapun tetep paling cantik dan lucu di mataku! 🥺❤️"
            },
            {
                q: "Siapa orang yang paling beruntung di dunia ini?",
                options: ["Aku (karena dapetin kamu)", "Kamu (karena dapetin aku)", "Dua-duanya sama-sama beruntung! ✨"],
                correct: 2,
                funFeedback: "Bener banget! Kita berdua sama-sama beruntung dipertemukan oleh semesta! 🥂"
            }
        ]
    },

    // 8. SLIDE 6: KUPON CINTA INTERAKTIF (BISA DI-KLAIM!)
    slide6: {
        title: "Kupon Cinta Resmi Pasangan 🎫✨",
        subtitle: "Ketuk kupon di bawah ini untuk mengklaimnya! Berlaku seumur hidup tanpa tanggal kedaluwarsa:",
        coupons: [
            {
                id: 1,
                emoji: "😇",
                title: "Kupon Bebas Ngambek 24 Jam",
                desc: "Berlaku saat ayang lagi sensitif/pusing. Otomatis dimaafin dan disayang tanpa didebat!"
            },
            {
                id: 2,
                emoji: "🍟",
                title: "Kupon Traktir Makanan Favorit",
                desc: "Bisa ditukar kapan saja saat ayang mendadak lapar tengah malam atau lagi BM jajanan!"
            },
            {
                id: 3,
                emoji: "💆",
                title: "Kupon Pijit & Dengerin Curhat",
                desc: "Layanan pijit pundak + telinga setia mendengar keluh kesah seharian penuh."
            },
            {
                id: 4,
                emoji: "🎬",
                title: "Kupon Bebas Pilih Film Nonton",
                desc: "Ayang berhak menentukan film bioskop atau series Netflix tanpa diprotes sama sekali!"
            }
        ]
    },

    // 9. SLIDE 7: BUKET BUNGA & PELUK VIRTUAL
    slide7: {
        title: "Sebuket Doa & Peluk Hangat 💐💖",
        message: "Kuberikan buket bunga abadi ini untukmu. Seperti kelopak bunga yang selalu mekar indah, semoga kamu selalu dikelilingi kebahagiaan, dijauhkan dari hal-hal yang bikin sedih, dan selalu merasa dicintai.",
        quote: "“In a room full of art, I would still stare at you.” 🌸"
    },

    // 10. SLIDE 8: KADO SPESIAL & SURAT CINTA PENUTUP
    slide8: {
        title: "Kado Spesial & Surat Dari Hatiku 🎁💌",
        giftTitle: "Tiket Staycation & Romantic Dinner Berdua!",
        giftDescription: "Voucher ini resmi berlaku untuk kita berdua healing santai! Plus kado fisik rahasia yang udah kukirim ke rumahmu 📦✨",
        closingLetter: "Selamat ulang tahun sayangku. Terima kasih sudah menjadi rumah ternyaman buat aku pulang, terima kasih sudah menerima segala kurang dan lebihku. Di usiamu yang baru ini, jadilah pribadi yang paling bahagia ya. Aku akan selalu ada di sampingmu untuk mendukung semua mimpimu. I love you to the moon and back! ❤️",
    },

    // 11. MUSIK
    music: {
        title: "Sweet Acoustic Lo-Fi Birthday Melody",
        customMp3Url: "",
        autoPlay: true
    }
};
