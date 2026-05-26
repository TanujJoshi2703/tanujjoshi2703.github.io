(function() {
        'use strict';

        // ========================================
        // 1. NAVBAR: Auto-hide + Active section
        // ========================================
        const navWrap = document.getElementById('navbarWrap');
        const navLinks = document.querySelectorAll('.nav-link');
        let lastY = 0, navTicking = false;

        function handleNav() {
            const y = window.scrollY;
            // Auto-hide
            if (y > lastY && y > 100) navWrap.classList.add('nav-hidden');
            else navWrap.classList.remove('nav-hidden');
            lastY = y;

            // Active section
            let current = 'hero';
            document.querySelectorAll('section[id]').forEach(sec => {
                if (sec.getBoundingClientRect().top <= 150) current = sec.id;
            });
            navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));
            navTicking = false;
        }
        window.addEventListener('scroll', () => {
            if (!navTicking) { requestAnimationFrame(handleNav); navTicking = true; }
        }, { passive: true });

        // ========================================
        // 2. SMOOTH SCROLL
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const t = document.querySelector(this.getAttribute('href'));
                if (!t) return;
                window.scrollTo({ top: t.offsetTop - 40, behavior: 'smooth' });
                // Close mobile menu
                document.getElementById('mobileMenu').classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // ========================================
        // 3. MOBILE MENU
        // ========================================
        const mob = document.getElementById('mobileMenu');
        document.getElementById('menuBtn').addEventListener('click', () => {
            mob.classList.add('open');
            document.body.style.overflow = 'hidden';
            mob.querySelectorAll('a').forEach((a, i) => {
                a.style.transitionDelay = `${i * 70}ms`;
            });
        });
        document.getElementById('menuClose').addEventListener('click', () => {
            mob.classList.remove('open');
            document.body.style.overflow = '';
        });

        // ========================================
        // 4. SCROLL REVEAL
        // ========================================
        const revealObs = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

        // ========================================
        // 5. STAGGER ANIMATION
        // ========================================
        function stagger(sectionSel, itemSel, delay = 90) {
            const sec = document.querySelector(sectionSel);
            if (!sec) return;
            const items = sec.querySelectorAll(itemSel);
            if (!items.length) return;
            const obs = new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        items.forEach((it, i) => setTimeout(() => it.classList.add('visible'), i * delay));
                        obs.unobserve(e.target);
                    }
                });
            }, { threshold: 0.12 });
            obs.observe(sec);
        }
        stagger('#about', '.stagger-child', 100);
        stagger('#skills', '.stagger-child', 70);
        stagger('#gallery', '.stagger-child', 120);
        stagger('#contact', '.stagger-child', 100);

        // ========================================
        // 6. HERO ENTRANCE ANIMATION
        // ========================================
        window.addEventListener('load', () => {
            const els = ['.hero-badge', '.hero-title .first-name', '.hero-title .last-name', '.hero-subtitle', '.hero-arrow'];
            els.forEach((sel, i) => {
                const el = document.querySelector(sel);
                if (!el) return;
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px) rotate(-2deg)';
                el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 150 + 200}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 150 + 200}ms`;
                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = sel.includes('first') ? 'rotate(-2deg)' :
                                          sel.includes('last') ? 'rotate(1deg)' : 'none';
                });
            });
        });

        // ========================================
        // 7. DOODLE ANIMATION (Handled via CSS keyframes)
        // ========================================

        // ========================================
        // 8. TILT EFFECT on gallery frames (desktop)
        // ========================================
        if (window.matchMedia('(pointer: fine)').matches) {
            document.querySelectorAll('.gallery-frame, .skill-pin').forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }

        // ========================================
        // 9. MODAL LOGIC
        // ========================================
        const corpCard = document.getElementById('corp-exp-card');
        const modal = document.getElementById('corpModal');
        const modalClose = document.getElementById('modalClose');

        if (corpCard && modal && modalClose) {
            corpCard.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // ========================================
        // 10. PROJECTS MODAL LOGIC
        // ========================================
        const projectsCard = document.getElementById('projects-card');
        const projectsModal = document.getElementById('projectsModal');
        const projectsModalClose = document.getElementById('projectsModalClose');

        if (projectsCard && projectsModal && projectsModalClose) {
            projectsCard.addEventListener('click', () => {
                projectsModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            projectsModalClose.addEventListener('click', () => {
                projectsModal.classList.remove('active');
                document.body.style.overflow = '';
            });

            projectsModal.addEventListener('click', (e) => {
                if (e.target === projectsModal) {
                    projectsModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // ========================================
        // 11. CERTIFICATE MODAL LOGIC
        // ========================================
        const internshipItems = document.querySelectorAll('.internship-item');
        const certModal = document.getElementById('certModal');
        const certModalClose = document.getElementById('certModalClose');
        const certModalImg = document.getElementById('certModalImg');

        if (certModal && certModalClose && certModalImg) {
            internshipItems.forEach(item => {
                item.addEventListener('click', () => {
                    const certSrc = item.getAttribute('data-cert');
                    if (certSrc) {
                        certModalImg.src = certSrc;
                        certModalImg.style.display = 'block';
                        certModal.classList.add('active');
                    }
                });
            });

            certModalClose.addEventListener('click', () => {
                certModal.classList.remove('active');
            });

            certModal.addEventListener('click', (e) => {
                if (e.target === certModal) {
                    certModal.classList.remove('active');
                }
            });
        }

    })();
