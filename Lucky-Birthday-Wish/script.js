/**
 * EXPERIENCE ENGINE SYSTEM INITIALIZATION
 * Pure Vanilla Architecture (No external framework dependencies)
 */

document.addEventListener("DOMContentLoaded", () => {
    const Engine = {
        config: {
            targetDate: new Date("August 1, 2026 00:00:00").getTime(),
            heroStrings: [
                "Some people enter our lives and quietly become our favorite chapter.",
                "I made this little world just for you."
            ],
            secretSurpriseDialogue: [
                "Lucky...",
                "Some people become memories.",
                "Some become lessons.",
                "But very few become a beautiful part of someone's life.",
                "Thank you for becoming one of the happiest parts of mine.",
                "It's built with gratitude, memories, respect, laughter, and countless moments that made our friendship unforgettable.",
                "No matter where life takes us...",
                "You'll always be one of my favorite people.",
                "Happy Birthday once again.",
                "Keep smiling.",
                "Keep shining.",
                "Keep being the amazing person you are."
            ],
            rotatingQuotes: [
                "Friends are the family we choose.",
                "A best friend turns ordinary moments into unforgettable memories.",
                "Every laugh with you became a memory worth keeping.",
                "Some people become home without sharing the same house.",
                "Real friendship is one of life's greatest blessings.",
                "Lucky isn't just your name—you truly brought luck into my life."
            ]
        },
        state: {
            audioContextInitialized: false,
            audioPlaying: false,
            currentQuoteIndex: 0
        },
        init: function() {
            this.setupAtmosphereEngine();
            this.executeCinematicLoader();
            this.setupCursorTracker();
            this.setupChronometerEngine();
            this.setupIntersectionObservers();
            this.setupInteractionHandlers();
            this.setupQuotesCarousel();
        },

        // ==========================================================================
        // BACKGROUND ENGINES (STARS, AURORA & BACKGROUND PARTICLES)
        // ==========================================================================
        setupAtmosphereEngine: function() {
            const starsContainer = document.getElementById("starsContainer");
            const particleContainer = document.getElementById("particleContainer");
            const starCount = 120;
            const floatCount = 40;

            // Generate Static & Twinkling Star Map
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement("div");
                star.className = "star-element";
                const size = Math.random() * 2 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.animationDuration = `${Math.random() * 4 + 3}s`;
                star.style.animationDelay = `${Math.random() * 2}s`;
                starsContainer.appendChild(star);
            }

            // Generate Floating Magical Ambient Micro-Spheres
            for (let j = 0; j < floatCount; j++) {
                const particle = document.createElement("div");
                particle.style.position = "absolute";
                const size = Math.random() * 6 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = "rgba(230, 230, 250, 0.3)";
                particle.style.borderRadius = "50%;";
                particle.style.boxShadow = "0 0 10px rgba(255,255,255,0.4)";
                particle.style.top = `${Math.random() * 100}vh`;
                particle.style.left = `${Math.random() * 100}vw`;
                
                // Pure CSS inline keyframes definition injection for float vector
                particle.style.animation = `floatAmbient ${Math.random() * 15 + 15}s infinite linear`;
                particleContainer.appendChild(particle);
            }

            // Inject the runtime ambient translation keyframe system dynamically
            if (!document.getElementById("ambient-keyframes")) {
                const styleSheet = document.createElement("style");
                styleSheet.id = "ambient-keyframes";
                styleSheet.innerText = `
                    @keyframes floatAmbient {
                        0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
                        10% { opacity: 0.6; }
                        90% { opacity: 0.6; }
                        100% { transform: translateY(-100vh) translateX(${Math.random() * 60 - 30}px) scale(0.8); opacity: 0; }
                    }
                `;
                document.head.appendChild(styleSheet);
            }
        },

        setupCursorTracker: function() {
            const glow = document.getElementById("cursorGlow");
            window.addEventListener("mousemove", (e) => {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            });
        },

        // ==========================================================================
        // ACT 0: LOADER SEQUENCE CONTROLLER
        // ==========================================================================
        executeCinematicLoader: function() {
            const loaderScreen = document.getElementById("loaderScreen");
            const loaderText = document.getElementById("loaderText");
            const loaderBarFill = document.getElementById("loaderBarFill");
            const mainExperience = document.getElementById("mainExperience");

            let progress = 0;
            const phases = [
                { limit: 35, text: "Preparing something special..." },
                { limit: 70, text: "For Someone Very Special..." },
                { limit: 100, text: "Welcome Lucky ❤️" }
            ];

            const interval = setInterval(() => {
                progress += 1;
                loaderBarFill.style.width = `${progress}%`;

                const exactPhase = phases.find(p => progress <= p.limit);
                if (exactPhase && loaderText.innerText !== exactPhase.text) {
                    loaderText.style.opacity = "0";
                    setTimeout(() => {
                        loaderText.innerText = exactPhase.text;
                        loaderText.style.opacity = "1";
                    }, 200);
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loaderScreen.style.opacity = "0";
                        mainExperience.classList.remove("dynamic-hide");
                        setTimeout(() => {
                            loaderScreen.remove();
                            this.executeHeroTypewriter();
                        }, 1200);
                    }, 800);
                }
            }, 35);
        },

        // ==========================================================================
        // ACT 1: HERO SYSTEM (TYPEWRITER PIPELINE)
        // ==========================================================================
        executeHeroTypewriter: function() {
            const container = document.getElementById("heroTypewriter");
            let lineIndex = 0;
            let charIndex = 0;
            
            function type() {
                if (lineIndex < Engine.config.heroStrings.length) {
                    const currentLineText = Engine.config.heroStrings[lineIndex];
                    if (charIndex < currentLineText.length) {
                        container.innerHTML += currentLineText.charAt(charIndex);
                        charIndex++;
                        setTimeout(type, 50);
                    } else {
                        // Line end threshold reached
                        lineIndex++;
                        charIndex = 0;
                        if (lineIndex < Engine.config.heroStrings.length) {
                            setTimeout(() => {
                                container.innerHTML += "<br><br>";
                                type();
                            }, 1000);
                        }
                    }
                }
            }
            type();
        },

        // ==========================================================================
        // INTERSECTION OBSERVER PIPELINE
        // ==========================================================================
        setupIntersectionObservers: function() {
            // General entry reveal system initialization
            const genericRevealItems = document.querySelectorAll(".scroll-trigger-fade");
            const standardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("intersected");
                    }
                });
            }, { threshold: 0.12 });

            genericRevealItems.forEach(item => standardObserver.observe(item));

            // Specialized Handwritten Scroll Unfold Sequence
            const letterSection = document.getElementById("letterSection");
            const letterPaper = document.querySelector(".paper-unfold-target");
            const letterParagraphs = document.querySelectorAll(".letter-p, .letter-p-footer, .letter-signature");

            const letterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        letterPaper.classList.add("unfolded");
                        
                        // Stream lines sequentially
                        letterParagraphs.forEach((p, idx) => {
                            setTimeout(() => {
                                p.classList.add("revealed");
                            }, 600 + (idx * 250)); // Delayed stream execution matrix
                        });
                        letterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });

            if (letterSection) letterObserver.observe(letterSection);
        },

        // ==========================================================================
        // INTERACTION ARCHITECTURES (LIGHTBOX & AUDIO)
        // ==========================================================================
        setupInteractionHandlers: function() {
            // Core Audio Controller Logic Engine
            const audioBtn = document.getElementById("audioToggle");
            const statusText = audioBtn.querySelector(".audio-status-text");
            let bgAudio = null;

            audioBtn.addEventListener("click", () => {
                if (!this.state.audioContextInitialized) {
                    bgAudio = new Audio("song.mp3"); // Replace with soft piano link if desired
                    bgAudio.loop = true;
                    bgAudio.volume = 0.4;
                    this.state.audioContextInitialized = true;
                }

                if (this.state.audioPlaying) {
                    bgAudio.pause();
                    statusText.innerText = "Play Music";
                    this.state.audioPlaying = false;
                } else {
                    bgAudio.play().catch(err => console.log("Audio contexts safety override triggered:", err));
                    statusText.innerText = "Mute Music";
                    this.state.audioPlaying = true;
                }
            });

            // Hero Anchor Button Smooth Navigation Target Mapping
            document.getElementById("btnBeginJourney").addEventListener("click", () => {
                document.getElementById("letterSection").scrollIntoView({ behavior: "smooth" });
            });

            // Pinterest Lightbox Integration Pipeline
            const bricks = document.querySelectorAll(".masonry-brick");
            const lightbox = document.getElementById("lightboxModal");
            const lightboxImg = document.getElementById("lightboxMainImg");
            const lightboxClose = document.getElementById("lightboxClose");

            bricks.forEach(brick => {
                brick.addEventListener("click", () => {
                    const src = brick.querySelector("img").src;
                    lightboxImg.src = src;
                    lightbox.classList.add("active");
                    lightbox.setAttribute("aria-hidden", "false");
                });
            });

            const closeLightbox = () => {
                lightbox.classList.remove("active");
                lightbox.setAttribute("aria-hidden", "true");
            };

            lightboxClose.addEventListener("click", closeLightbox);
            lightbox.addEventListener("click", (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            // Cinema Tracking Completion System
            const theaterVid = document.getElementById("theaterVideo");
            const postMsg = document.getElementById("cinemaPostMessage");
            theaterVid.addEventListener("ended", () => {
                postMsg.classList.add("show");
            });

            // Secret Surprise Terminal Triggers
            document.getElementById("btnSecretSurprise").addEventListener("click", () => {
                this.executeFinalSurpriseSequence();
            });
        },

        // ==========================================================================
        // ACT 4: DYNAMIC THOUGHTS CONTINUUM CAROUSEL
        // ==========================================================================
        setupQuotesCarousel: function() {
            const viewport = document.getElementById("quoteViewport");
            
            const transitionQuote = () => {
                viewport.style.opacity = "0";
                viewport.style.transform = "translateY(-10px)";
                
                setTimeout(() => {
                    viewport.innerText = this.config.rotatingQuotes[this.state.currentQuoteIndex];
                    viewport.style.opacity = "1";
                    viewport.style.transform = "translateY(0)";
                    
                    this.state.currentQuoteIndex = (this.state.currentQuoteIndex + 1) % this.config.rotatingQuotes.length;
                }, 400);
            };

            transitionQuote();
            setInterval(transitionQuote, 5000);
        },

        // ==========================================================================
        // ACT 7: CHRONOMETER ENGINE (COUNTDOWN WORKER)
        // ==========================================================================
        setupChronometerEngine: function() {
            const dField = document.getElementById("days");
            const hField = document.getElementById("hours");
            const mField = document.getElementById("minutes");
            const sField = document.getElementById("seconds");
            const label = document.getElementById("countdownLabel");

            const computeChronometer = () => {
                const now = new Date().getTime();
                const variant = this.config.targetDate - now;

                if (variant <= 0) {
                    label.innerHTML = "Happy Birthday Lucky ❤️";
                    document.getElementById("countdownDigits").classList.add("dynamic-hide");
                    clearInterval(chronometerInterval);
                    return;
                }

                const days = Math.floor(variant / (1000 * 60 * 60 * 24));
                const hours = Math.floor((variant % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((variant % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((variant % (1000 * 60)) / 1000);

                dField.innerText = String(days).padStart(2, '0');
                hField.innerText = String(hours).padStart(2, '0');
                mField.innerText = String(minutes).padStart(2, '0');
                sField.innerText = String(seconds).padStart(2, '0');
            };

            const chronometerInterval = setInterval(computeChronometer, 1000);
            computeChronometer();
        },

        // ==========================================================================
        // ACT 8: MASTER SURPRISE MATRIX & CANVAS GENERATOR
        // ==========================================================================
        executeFinalSurpriseSequence: function() {
            const overlay = document.getElementById("cinematicOverlay");
            const textViewport = document.getElementById("cinematicTextBlock");
            
            overlay.classList.add("activated");
            document.body.style.overflow = "hidden"; // Retain absolute capture mode

            let dialogueIndex = 0;
            textViewport.innerHTML = "";

            const advanceDialogue = () => {
                if (dialogueIndex < this.config.secretSurpriseDialogue.length) {
                    const paragraph = document.createElement("p");
                    
                    // Design structural layout differentiation rule bases
                    if (dialogueIndex === 0) {
                        paragraph.className = "cinema-node-para script-accent";
                    } else {
                        paragraph.className = "cinema-node-para";
                    }
                    
                    paragraph.innerText = this.config.secretSurpriseDialogue[dialogueIndex];
                    textViewport.appendChild(paragraph);
                    
                    // Trigger visual flow reflow paint
                    setTimeout(() => paragraph.classList.add("bright"), 100);

                    // If multiple nodes exist on display stack, transition older items downstream smoothly
                    if (textViewport.children.length > 2) {
                        const obsoleteNode = textViewport.children[0];
                        obsoleteNode.style.opacity = "0.2";
                        setTimeout(() => obsoleteNode.remove(), 1500);
                    }

                    dialogueIndex++;
                    setTimeout(advanceDialogue, 3500);
                } else {
                    // Script stream exhaustion boundary -> Fire Particle Arrays immediately
                    setTimeout(() => {
                        textViewport.style.transition = "opacity 2s ease";
                        textViewport.style.opacity = "0";
                        this.launchParticleSpectacle();
                        
                        // Release viewport back to layout flow smoothly after full simulation ends
                        setTimeout(() => {
                            overlay.classList.remove("activated");
                            document.body.style.overflow = "auto";
                            document.getElementById("surpriseTriggerZone").remove();
                            document.getElementById("epilogueSection").scrollIntoView({ behavior: "smooth" });
                        }, 9000);
                    }, 2000);
                }
            };

            advanceDialogue();
        },

        launchParticleSpectacle: function() {
            const canvas = document.getElementById("fireworksCanvas");
            const ctx = canvas.getContext("2d");
            
            let w = canvas.width = window.innerWidth;
            let h = canvas.height = window.innerHeight;

            window.addEventListener("resize", () => {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            });

            class Particle {
                constructor(x, y, color, type) {
                    this.x = x;
                    this.y = y;
                    this.color = color;
                    this.type = type; // 0=confetti, 1=star, 2=balloon
                    this.vx = (Math.random() - 0.5) * (type === 2 ? 2 : 12);
                    this.vy = type === 2 ? (Math.random() * -3 - 1) : ((Math.random() - 0.5) * 12);
                    this.alpha = 1;
                    this.gravity = type === 2 ? -0.01 : 0.12;
                    this.size = type === 2 ? Math.random() * 15 + 10 : Math.random() * 4 + 2;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy += this.gravity;
                    if (this.type !== 2) this.alpha -= 0.012;
                    else if (this.y < -50) this.alpha = 0; // Balloon screen cull boundary
                }
                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.alpha;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    if (this.type === 2) {
                        // Draw Balloon Geometry Structural Shape
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = "rgba(255,255,255,0.3)";
                        ctx.moveTo(this.x, this.y + this.size);
                        ctx.lineTo(this.x, this.y + this.size + 15);
                        ctx.stroke();
                    } else {
                        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();
                }
            }

            const pool = [];
            const hexPalette = ["#E6E6FA", "#FFC0CB", "#87CEEB", "#FFD700", "#8A2BE2", "#FFDAB9"];

            // Instant Burst Generation Routine
            for (let b = 0; b < 150; b++) {
                pool.push(new Particle(w / 2, h / 2, hexPalette[Math.floor(Math.random() * hexPalette.length)], 0));
                pool.push(new Particle(w / 4, h / 3, hexPalette[Math.floor(Math.random() * hexPalette.length)], 1));
                pool.push(new Particle(3 * w / 4, h / 3, hexPalette[Math.floor(Math.random() * hexPalette.length)], 1));
            }

            // Sustained Ambient Balloon System Emitter Spawn Matrix Loops
            const loopTimer = setInterval(() => {
                pool.push(new Particle(Math.random() * w, h + 20, hexPalette[Math.floor(Math.random() * hexPalette.length)], 2));
            }, 120);

            function runEngineLoop() {
                ctx.clearRect(0, 0, w, h);
                for (let i = pool.length - 1; i >= 0; i--) {
                    pool[i].update();
                    pool[i].draw();
                    if (pool[i].alpha <= 0) pool.splice(i, 1);
                }
                if (pool.length > 0) {
                    requestAnimationFrame(runEngineLoop);
                } else {
                    clearInterval(loopTimer);
                    ctx.clearRect(0, 0, w, h);
                }
            }
            runEngineLoop();
        }
    };

    Engine.init();
});