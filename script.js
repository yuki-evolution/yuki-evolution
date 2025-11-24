gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    const line = document.querySelector('.loading-line');
    
    // 1. 模擬讀取條跑動
    gsap.to(line, { width: "100px", duration: 1.5, ease: "power2.out" });

    // 2. 點擊進入 (或者你可以設定幾秒後自動進入)
    splash.addEventListener('click', enterSite);

    function enterSite() {
        const tl = gsap.timeline();

        // LOGO 先往上飄並消失
        tl.to(".splash-logo, .splash-sub, .tap-hint", {
            y: -50,
            opacity: 0,
            duration: 0.5
        })
        // 黑色布幕往上滑開 (揭幕效果)
        .to(splash, {
            y: "-100%", 
            duration: 1.5, 
            ease: "power4.inOut"
        })
        // 主內容浮現
        .to(".main-content", {
            opacity: 1,
            duration: 1
        }, "-=1"); // 提早一點開始
        
        // 確保影片開始播放 (有時候瀏覽器會擋自動播放)
        document.getElementById('bg-video').play();
    }
});

// 滾動特效
gsap.utils.toArray('.timeline-item, .hero-text-box').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});
