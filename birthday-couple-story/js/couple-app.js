/**
 * CoupleApp.js - 8-Slide Playful & Romantic Couple Story Experience
 * Features: Love Meter Climax, 3D Cake Blow, Love Coupons Claim, Relationship Quiz, Flower Rain, & WhatsApp Thanks
 */

let currentSlide = 1;
const totalSlides = 8;
let loveMeterValue = 0;
let isLoveMeterMaxed = false;
let isUnboxed = false;
let isMusicStarted = false;

document.addEventListener('DOMContentLoaded', () => {
    initCoupleConfig();
    initSlideNavigation();
    initSlide2LoveMeter();
    initSlide3Cake();
    initSlide4Gallery();
    initSlide5Quiz();
    initSlide6Coupons();
    initSlide7Bouquet();
    initSlide8Gift();
    initMusicController();
    initKeyboardNavigation();
});

/**
 * 1. Configuration & DOM Hydration
 */
function initCoupleConfig() {
    const cfg = window.COUPLE_CONFIG || {};
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('to') || urlParams.get('name') || cfg.recipient.name || "Nabila Aurelia";
    const nick = urlParams.get('nick') || cfg.recipient.nickname || "Ayang Nabila";
    const age = urlParams.get('age') || cfg.recipient.age || 21;
    const senderName = urlParams.get('from') || cfg.sender.name || "Daffa Althaf";
    const senderNick = cfg.sender.nickname || "Daffa";
    const senderWa = urlParams.get('wa') || cfg.sender.whatsappNumber || "6281234567890";
    const duration = cfg.sender.relationshipDuration || "2 Tahun Indah";

    // Bind text
    document.querySelectorAll('.js-name').forEach(el => el.textContent = name);
    document.querySelectorAll('.js-nick').forEach(el => el.textContent = nick);
    document.querySelectorAll('.js-age').forEach(el => el.textContent = age);
    document.querySelectorAll('.js-age-badge').forEach(el => el.textContent = `Level ${age}`);
    document.querySelectorAll('.js-sender').forEach(el => el.textContent = senderName);
    document.querySelectorAll('.js-sender-nick').forEach(el => el.textContent = senderNick);
    document.querySelectorAll('.js-duration').forEach(el => el.textContent = duration);

    // Slide 1 Custom Texts
    if (cfg.slide1) {
        const badgeEl = document.getElementById('slide1-badge');
        if (badgeEl) badgeEl.textContent = `✨ LEVEL UP CHAPTER ${age} FOR AYANG ✨`;
        const subEl = document.getElementById('slide1-sub');
        if (subEl && cfg.slide1.subtitle) subEl.textContent = cfg.slide1.subtitle;
        const quoteEl = document.getElementById('slide1-quote');
        if (quoteEl && cfg.slide1.funnyQuote) quoteEl.textContent = cfg.slide1.funnyQuote;
    }

    // Slide 8 Letter Custom Texts
    if (cfg.slide8) {
        const gTitle = document.getElementById('slide8-gift-title');
        if (gTitle && cfg.slide8.giftTitle) gTitle.textContent = cfg.slide8.giftTitle;
        const gDesc = document.getElementById('slide8-gift-desc');
        if (gDesc && cfg.slide8.giftDescription) gDesc.textContent = cfg.slide8.giftDescription;
        const letter = document.getElementById('slide8-letter');
        if (letter && cfg.slide8.closingLetter) letter.textContent = cfg.slide8.closingLetter;
    }

    // Prepare WhatsApp thank you button
    const waBtn = document.getElementById('btn-couple-wa-thanks');
    if (waBtn) {
        const cleanWa = senderWa.replace(/[^0-9]/g, '');
        const waText = `Ayangggg *${senderNick}*! 🥺💖\n\nMakasih banyak yaaa buat website ulang tahunnya, gemes, lucu, dan bikin terharu banget liat momen kita! Kupon cintanya bakal langsung aku pake ya haha! Love you so much sayangku! 🥰✨`;
        waBtn.href = `https://api.whatsapp.com/send?phone=${cleanWa}&text=${encodeURIComponent(waText)}`;
    }
}

/**
 * 2. Multi-Slide Navigation System (8 Slides)
 */
function initSlideNavigation() {
    goToSlide(1, false);
}

function goToSlide(slideIndex, playSound = true) {
    if (slideIndex < 1 || slideIndex > totalSlides) return;

    // Start background music on user's first click
    if (!isMusicStarted && window.coupleSound) {
        const cfg = window.COUPLE_CONFIG || {};
        const customUrl = cfg.music ? cfg.music.customMp3Url : null;
        window.coupleSound.toggleMusic(customUrl);
        isMusicStarted = true;
        updateMusicUi(true);
    }

    if (playSound && window.coupleSound) {
        window.coupleSound.playPageFlip();
    }

    // Hide all slides
    const slides = document.querySelectorAll('.story-slide-screen');
    slides.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    // Show target slide
    const target = document.getElementById(`couple-slide-${slideIndex}`);
    if (target) {
        target.style.display = 'flex';
        void target.offsetWidth;
        target.classList.add('active');

        if (window.gsap) {
            gsap.fromTo(target.querySelector('.slide-inner-card'), 
                { opacity: 0, y: 25, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
            );
        }
    }

    currentSlide = slideIndex;

    // Update Progress Fill
    const fill = document.getElementById('couple-progress-fill');
    if (fill) {
        const pct = (slideIndex / totalSlides) * 100;
        fill.style.width = `${pct}%`;
    }

    // Update Steppers
    document.querySelectorAll('.couple-stepper-item').forEach(step => {
        const num = parseInt(step.getAttribute('data-step'), 10);
        if (num === slideIndex) {
            step.classList.add('active');
        } else if (num < slideIndex) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    // Update Text Indicator
    const indicatorText = document.getElementById('couple-step-text');
    if (indicatorText) {
        indicatorText.textContent = `Halaman ${slideIndex} dari ${totalSlides}`;
    }

    // Special Trigger for Slide 3 (3D Cake)
    if (slideIndex === 3) {
        if (!window.coupleCake && window.initCoupleCake) {
            window.initCoupleCake();
        }
        setTimeout(() => {
            if (window.coupleCake) window.coupleCake.onResize();
        }, 80);
    }

    // Special Trigger for Slide 7 (Bouquet Bloom)
    if (slideIndex === 7 && playSound && window.coupleSound) {
        setTimeout(() => {
            window.coupleSound.playFlowerBloom();
            spawnRomanticHearts(15);
        }, 300);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.goToSlide = goToSlide;

/**
 * 3. Slide 2: Interactive Love Meter (Kalkulator Kadar Bucin)
 */
function initSlide2LoveMeter() {
    const btn = document.getElementById('btn-boost-love-meter');
    const numberEl = document.getElementById('love-meter-number');
    const fillEl = document.getElementById('love-meter-fill');
    const heartIcon = document.getElementById('love-meter-heart');
    const statusMsg = document.getElementById('love-meter-status-msg');

    if (!btn || !numberEl) return;

    btn.addEventListener('click', () => {
        if (isLoveMeterMaxed) {
            // Already climaxed, just rain hearts
            if (window.coupleSound) window.coupleSound.playHeartRain();
            spawnRomanticHearts(20);
            return;
        }

        loveMeterValue += Math.floor(Math.random() * 400) + 300;

        // Rising sound frequency as value climbs
        const freq = Math.min(400 + (loveMeterValue * 0.35), 1800);
        if (window.coupleSound) window.coupleSound.playLoveMeterTick(freq);

        if (loveMeterValue >= 9999) {
            loveMeterValue = 9999;
            isLoveMeterMaxed = true;
            numberEl.textContent = "9999%+++";
            if (fillEl) fillEl.style.width = "100%";
            if (heartIcon) heartIcon.classList.add('heart-super-glow');

            if (statusMsg) {
                statusMsg.innerHTML = `💥 <strong>ERROR: KADAR CINTA MELUAP!</strong><br>Angkanya gak muat karena rasa sayangku ke kamu udah melampaui galaksi Bima Sakti! 🚀💖`;
                statusMsg.classList.add('overflow-active');
            }

            btn.textContent = "💖 Cintaku Meledak Untukmu!";
            if (window.coupleSound) window.coupleSound.playLoveMeterClimax();
            fireCoupleConfetti();
            spawnRomanticHearts(25);
            showToast("💘 Love Meter Meledak! Rasa sayangku 1000000% buat kamu!");
        } else {
            numberEl.textContent = `${loveMeterValue}%`;
            const fillPct = Math.min((loveMeterValue / 9999) * 100, 95);
            if (fillEl) fillEl.style.width = `${fillPct}%`;

            if (heartIcon) {
                heartIcon.style.transform = `scale(${1 + (loveMeterValue / 10000) * 0.8})`;
            }
        }
    });
}

/**
 * 4. Slide 3: 3D Cake Candle Blow
 */
function initSlide3Cake() {
    const blowBtn = document.getElementById('btn-couple-blow');
    const cakeStatus = document.getElementById('couple-cake-status');
    const wishBox = document.getElementById('couple-cake-wish-box');

    window.triggerCoupleCandleBlow = () => {
        if (!window.coupleCake || window.coupleCake.isBlown) return;

        if (window.coupleSound) {
            window.coupleSound.playCandleBlow();
        }

        window.coupleCake.blowCandle(() => {
            if (cakeStatus) {
                cakeStatus.textContent = "✨ LILIN TELAH PADAM! Doamu sedang di-ACC semesta! 🕊️";
                cakeStatus.classList.add('blown');
            }
            if (blowBtn) {
                blowBtn.textContent = "✨ Harapan Ayang Terkirim! 🌟";
                blowBtn.disabled = true;
            }
            if (wishBox) {
                wishBox.classList.add('active');
            }

            fireCoupleConfetti();
            showToast("🎂 Selamat Ulang Tahun Ayang! Make a wish yang terindah!");
        });
    };

    if (blowBtn) {
        blowBtn.addEventListener('click', window.triggerCoupleCandleBlow);
    }
}

/**
 * 5. Slide 4: Galeri Kenangan Manis & Random
 */
function initSlide4Gallery() {
    const tabPhotos = document.getElementById('couple-tab-photos');
    const tabVideo = document.getElementById('couple-tab-video');
    const viewPhotos = document.getElementById('couple-view-photos');
    const viewVideo = document.getElementById('couple-view-video');
    const grid = document.getElementById('couple-polaroid-grid');

    const cfg = window.COUPLE_CONFIG || {};
    const photos = (cfg.slide4 && cfg.slide4.photos) || [];

    if (grid) {
        grid.innerHTML = '';
        photos.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'couple-polaroid-card';
            card.innerHTML = `
                <div class="couple-tape-top"></div>
                <div class="couple-polaroid-img" onclick="openCoupleLightbox('${item.url}', '${escapeHtml(item.caption)}')">
                    <img src="${item.url}" alt="${escapeHtml(item.caption)}" loading="lazy">
                </div>
                <div class="couple-polaroid-meta">
                    <span class="couple-photo-date">${escapeHtml(item.date)}</span>
                    <p class="couple-photo-caption">"${escapeHtml(item.caption)}"</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Video
    const videoEmbed = document.getElementById('couple-video-embed');
    if (videoEmbed && cfg.slide4 && cfg.slide4.video && cfg.slide4.video.embedUrl) {
        videoEmbed.innerHTML = `
            <iframe 
                src="${cfg.slide4.video.embedUrl}" 
                title="Momen Lucu Kita" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    }

    if (tabPhotos && tabVideo && viewPhotos && viewVideo) {
        tabPhotos.addEventListener('click', () => {
            tabPhotos.classList.add('active');
            tabVideo.classList.remove('active');
            viewPhotos.style.display = 'grid';
            viewVideo.style.display = 'none';
            if (window.coupleSound) window.coupleSound.playClick();
        });

        tabVideo.addEventListener('click', () => {
            tabVideo.classList.add('active');
            tabPhotos.classList.remove('active');
            viewPhotos.style.display = 'none';
            viewVideo.style.display = 'block';
            if (window.coupleSound) window.coupleSound.playClick();
        });
    }
}

window.openCoupleLightbox = (url, caption) => {
    const modal = document.getElementById('couple-lightbox-modal');
    const img = document.getElementById('couple-lightbox-img');
    const cap = document.getElementById('couple-lightbox-caption');

    if (!modal || !img) return;

    img.src = url;
    if (cap) cap.textContent = caption;
    modal.classList.add('active');

    if (window.coupleSound) window.coupleSound.playClick();
};

window.closeCoupleLightbox = () => {
    const modal = document.getElementById('couple-lightbox-modal');
    if (modal) modal.classList.remove('active');
};

/**
 * 6. Slide 5: Kuis Kejujuran Hubungan ("Siapa yang paling...")
 */
function initSlide5Quiz() {
    const container = document.getElementById('couple-quiz-container');
    const cfg = window.COUPLE_CONFIG || {};
    const questions = (cfg.slide5 && cfg.slide5.questions) || [];

    if (!container) return;
    container.innerHTML = '';

    questions.forEach((q, qIndex) => {
        const card = document.createElement('div');
        card.className = 'couple-quiz-card';
        card.innerHTML = `
            <div class="couple-quiz-badge">Ronde ${qIndex + 1} dari ${questions.length}</div>
            <h3 class="couple-quiz-question">${escapeHtml(q.q)}</h3>
            <div class="couple-quiz-options" id="quiz-opt-grid-${qIndex}">
                ${q.options.map((opt, optIndex) => `
                    <button class="couple-quiz-opt-btn" onclick="answerCoupleQuiz(${qIndex}, ${optIndex})">
                        ${escapeHtml(opt)}
                    </button>
                `).join('')}
            </div>
            <div class="couple-quiz-feedback" id="quiz-feedback-box-${qIndex}"></div>
        `;
        container.appendChild(card);
    });
}

window.answerCoupleQuiz = (qIndex, optIndex) => {
    const cfg = window.COUPLE_CONFIG || {};
    const q = cfg.slide5.questions[qIndex];
    if (!q) return;

    const optGrid = document.getElementById(`quiz-opt-grid-${qIndex}`);
    const fb = document.getElementById(`quiz-feedback-box-${qIndex}`);
    if (!optGrid || !fb) return;

    const buttons = optGrid.querySelectorAll('.couple-quiz-opt-btn');
    buttons.forEach(b => b.disabled = true);

    buttons[optIndex].classList.add('selected');
    fb.innerHTML = `😂 <strong>Hasil Analisis Cinta:</strong> ${escapeHtml(q.funFeedback)}`;
    fb.classList.add('active');

    if (window.coupleSound) window.coupleSound.playQuizSuccess();
    fireCoupleConfetti();
};

/**
 * 7. Slide 6: Kupon Cinta Interaktif (Bisa Di-Klaim!)
 */
function initSlide6Coupons() {
    const container = document.getElementById('couple-coupons-grid');
    const cfg = window.COUPLE_CONFIG || {};
    const coupons = (cfg.slide6 && cfg.slide6.coupons) || [];

    if (!container) return;
    container.innerHTML = '';

    coupons.forEach(item => {
        const card = document.createElement('div');
        card.className = 'couple-coupon-item';
        card.id = `coupon-card-${item.id}`;
        card.onclick = () => claimCoupon(item.id);

        card.innerHTML = `
            <div class="coupon-stamp-seal" id="coupon-stamp-${item.id}">TERKLAIM ✨</div>
            <div class="coupon-emoji">${item.emoji}</div>
            <div class="coupon-info">
                <h4 class="coupon-title">${escapeHtml(item.title)}</h4>
                <p class="coupon-desc">${escapeHtml(item.desc)}</p>
                <div class="coupon-action-hint">👉 Ketuk kartu ini untuk klaim</div>
            </div>
        `;
        container.appendChild(card);
    });
}

window.claimCoupon = (couponId) => {
    const card = document.getElementById(`coupon-card-${couponId}`);
    const stamp = document.getElementById(`coupon-stamp-${couponId}`);
    if (!card || !stamp) return;

    if (card.classList.contains('claimed')) {
        showToast("🎫 Kupon ini sudah terklaim dan aktif selamanya!");
        return;
    }

    card.classList.add('claimed');
    stamp.classList.add('stamped');

    if (window.coupleSound) {
        window.coupleSound.playCouponStamp();
    }

    fireCoupleConfetti();
    showToast("🎉 Kupon Berhasil Diklaim! Siap kamu pakai ke ayang!");
};

/**
 * 8. Slide 7: Buket Bunga Mekar & Peluk Hangat
 */
function initSlide7Bouquet() {
    const rainBtn = document.getElementById('btn-couple-rain-hearts');
    if (rainBtn) {
        rainBtn.addEventListener('click', () => {
            if (window.coupleSound) {
                window.coupleSound.playHeartRain();
            }
            spawnRomanticHearts(25);
            fireCoupleConfetti();
            showToast("💖 Ribuan peluk hangat & cium online terkirim!");
        });
    }
}

function spawnRomanticHearts(count = 15) {
    const layer = document.getElementById('couple-petals-layer');
    if (!layer) return;

    const emojis = ['💖', '🌸', '💐', '✨', '🤍', '🥰', '🌷', '💍'];

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'couple-floating-particle';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = `${Math.random() * 95}vw`;
        heart.style.fontSize = `${20 + Math.random() * 22}px`;
        heart.style.animationDuration = `${3.5 + Math.random() * 3.5}s`;

        layer.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 6500);
    }
}

/**
 * 9. Slide 8: Kado Spesial & Surat Cinta Penutup
 */
function initSlide8Gift() {
    const giftBox = document.getElementById('couple-gift-box');
    const giftContent = document.getElementById('couple-gift-opened');
    const tapHint = document.getElementById('couple-gift-hint');

    if (!giftBox) return;

    giftBox.addEventListener('click', () => {
        if (isUnboxed) return;
        isUnboxed = true;

        giftBox.classList.add('shaking');

        if (window.coupleSound) {
            window.coupleSound.playGiftUnbox();
        }

        setTimeout(() => {
            giftBox.classList.remove('shaking');
            giftBox.style.display = 'none';
            if (tapHint) tapHint.style.display = 'none';

            if (giftContent) {
                giftContent.style.display = 'block';
                if (window.gsap) {
                    gsap.fromTo(giftContent, 
                        { opacity: 0, scale: 0.88 },
                        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
                    );
                }
            }

            fireCoupleConfetti();
            spawnRomanticHearts(20);
            showToast("🎁 Kado & Surat Cinta Terbuka!");
        }, 600);
    });
}

/**
 * 10. Music Controller
 */
function initMusicController() {
    const musicBtn = document.getElementById('btn-couple-music-toggle');
    if (!musicBtn) return;

    musicBtn.addEventListener('click', () => {
        if (!window.coupleSound) return;
        const cfg = window.COUPLE_CONFIG || {};
        const customUrl = cfg.music ? cfg.music.customMp3Url : null;
        const isPlaying = window.coupleSound.toggleMusic(customUrl);
        updateMusicUi(isPlaying);
    });
}

function updateMusicUi(isPlaying) {
    const musicBtn = document.getElementById('btn-couple-music-toggle');
    if (!musicBtn) return;

    if (isPlaying) {
        musicBtn.innerHTML = `<span>🎵</span> <span>BGM: Nyala</span>`;
        musicBtn.classList.add('playing');
    } else {
        musicBtn.innerHTML = `<span>🔇</span> <span>BGM: Hening</span>`;
        musicBtn.classList.remove('playing');
    }
}

/**
 * 11. Keyboard Navigation
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    });
}

function fireCoupleConfetti() {
    if (!window.confetti) return;
    confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#93c5fd', '#f472b6', '#fef08a', '#ffffff', '#e0e7ff', '#fbcfe8']
    });
}

function showToast(msg) {
    const toast = document.getElementById('couple-toast-popup');
    if (!toast) return;

    toast.textContent = msg;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3200);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
