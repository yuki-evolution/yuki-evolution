gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    const line = document.querySelector('.loading-line');
    const video = document.getElementById('bg-video');

    // 1. 讀取條動畫 (模擬 Loading)
    gsap.to(line, { width: "100px", duration: 1.5, ease: "power2.out" });

    // 2. 點擊畫面 -> 進入網站 (揭幕特效)
    if (splash) {
        splash.addEventListener('click', () => {
            const tl = gsap.timeline();

            // 確保影片播放 (某些手機需要使用者互動後才能播放)
            if(video) video.play();

            // LOGO 往上飄並淡出
            tl.to(".splash-logo, .splash-sub, .tap-hint", {
                y: -50,
                opacity: 0,
                duration: 0.5
            })
            // 黑色遮罩往上滑開 (Curtain Reveal)
            .to(splash, {
                y: "-100%", 
                duration: 1.5, 
                ease: "power4.inOut"
            })
            // 主內容浮現
            .to(".main-content", {
                opacity: 1,
                duration: 1
            }, "-=1"); // 動作稍微重疊，比較流暢
        });
    }

    // 3. 滾動時內容浮現特效
    gsap.utils.toArray('.timeline-item, .news-card').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%", // 當物件頂部到達視窗 85% 處
                toggleActions: "play none none reverse"
            },
            y: 50,      // 從下方 50px 處
            opacity: 0, // 從透明
            duration: 1
        });
    });
});
