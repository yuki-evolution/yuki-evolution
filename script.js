// 註冊 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // 1. Hero 區塊進場動畫
    const tl = gsap.timeline();

    tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5 // 等影片稍微載入一下
    });

    // 文字特效：從模糊變清晰
    tl.from(".glitch-text", {
        scale: 1.1,
        filter: "blur(10px)",
        duration: 1.2
    }, "-=1.2");

    // 2. YouTube 背景視差滾動 (Parallax)
    // 當往下滑動時，影片會稍微往下移動並放大，製造景深
    gsap.to(".video-container iframe", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 100, 
        scale: 1.2 
    });

    // 3. 時間軸 (Timeline) 逐一浮現動畫
    document.querySelectorAll('.timeline-item').forEach(item => {
        gsap.fromTo(item, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%", // 進入視窗 85% 處開始
                    end: "top 60%",
                    toggleActions: "play none none reverse", // 往回滾會消失
                    toggleClass: "active"
                }
            }
        );
    });

    // 4. 標題文字進場
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
});

