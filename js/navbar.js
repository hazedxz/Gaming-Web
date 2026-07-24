/**
 * Luigi Digital — navbar.js
 * Se llama desde index.html DESPUÉS de que el fetch inyecta el header.
 */
function initNavbar() {

    /* ── SCROLL SHRINK ── */
    const header = document.getElementById('site-header');

    function onScroll() {
        header.classList.toggle('is-scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    /* ── DROPDOWNS — hover desktop / click móvil ── */
    const backdrop = document.getElementById('navBackdrop');
    const navItems = document.querySelectorAll('.ld-nav__item.has-dropdown');
    let activeItem = null;
    let closeTimer = null;

    function isMobile() { return window.innerWidth < 992; }

    function openDropdown(item) {
        if (activeItem && activeItem !== item) closeDropdown(activeItem, true);
        clearTimeout(closeTimer);
        item.classList.add('is-open');
        backdrop.classList.add('is-visible');
        activeItem = item;
    }

    function closeDropdown(item, immediate) {
        if (!item) return;
        if (immediate) {
            item.classList.remove('is-open');
            backdrop.classList.remove('is-visible');
            if (activeItem === item) activeItem = null;
        } else {
            closeTimer = setTimeout(() => {
                item.classList.remove('is-open');
                backdrop.classList.remove('is-visible');
                if (activeItem === item) activeItem = null;
            }, 150);
        }
    }

    navItems.forEach(item => {
        const link = item.querySelector('.ld-nav__link');

        // Desktop: hover
        item.addEventListener('mouseenter', () => {
            if (!isMobile()) openDropdown(item);
        });
        item.addEventListener('mouseleave', () => {
            if (!isMobile()) closeDropdown(item, false);
        });

        // Móvil: click toggle
        link.addEventListener('click', (e) => {
            if (isMobile()) {
                e.preventDefault();
                item.classList.contains('is-open')
                    ? closeDropdown(item, true)
                    : openDropdown(item);
            }
        });
    });

    backdrop.addEventListener('click', () => {
        if (activeItem) closeDropdown(activeItem, true);
    });

    document.addEventListener('click', (e) => {
        if (activeItem && !activeItem.contains(e.target)) {
            closeDropdown(activeItem, true);
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobile() && activeItem) closeDropdown(activeItem, true);
    });


    /* ── BÚSQUEDA hover-expand ── */
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');

    if (searchInput && searchClear) {
        searchInput.addEventListener('input', () => {
            searchClear.classList.toggle('is-visible', searchInput.value.length > 0);
        });

        searchClear.addEventListener('mousedown', (e) => {
            e.preventDefault();
            searchInput.value = '';
            searchClear.classList.remove('is-visible');
            searchInput.focus();
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.blur();
                searchInput.value = '';
                searchClear.classList.remove('is-visible');
            }
            if (e.key === 'Enter' && searchInput.value.trim()) {
                // TODO: conectar con Supabase
                console.log('Buscar:', searchInput.value.trim());
            }
        });
    }


    /* ── BURGER MÓVIL ── */
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu   = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            burgerBtn.classList.toggle('is-open', isOpen);
            document.body.classList.toggle('menu-open', isOpen);
        });
    }
}
