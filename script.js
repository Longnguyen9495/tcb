(() => {
  'use strict';

  const CONSULTANT_CODE = 'TF1682';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cardData = {
    signature: { name: 'Visa Signature', face: 'Signature', grade: 'Signature' },
    spark: { name: 'Spark', face: 'Spark', grade: 'Platinum' },
    everyday: { name: 'Everyday', face: 'Everyday', grade: 'Platinum' },
    eco: { name: 'Visa Eco', face: 'Eco', grade: 'Signature' },
  };
  const posters = [
    { key: 'signature', title: 'Visa Signature', alt: 'Poster Techcombank Visa Signature và các ưu đãi du lịch, ẩm thực', src: 'assets/signature.webp' },
    { key: 'spark', title: 'Spark', alt: 'Poster Techcombank Spark và lĩnh vực tích điểm linh hoạt', src: 'assets/spark.webp' },
    { key: 'eco', title: 'Visa Eco', alt: 'Poster Techcombank Visa Eco và ưu đãi bảo hiểm giáo dục', src: 'assets/eco.webp' },
    { key: 'everyday', title: 'Everyday', alt: 'Poster Techcombank Everyday và chương trình tích điểm trực tuyến', src: 'assets/everyday.webp' },
    { key: 'comparison', title: 'Tổng quan các dòng thẻ', alt: 'Poster so sánh bốn dòng thẻ Techcombank', src: 'assets/comparison.webp' },
    { key: 'transfer', title: 'Giới thiệu mở thẻ và sang ngang', alt: 'Poster giới thiệu chương trình mở thẻ tín dụng và sang ngang', src: 'assets/transfer.webp' },
  ];

  const toast = $('#toast');
  let toastTimer;
  const announce = message => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
  };
  function fallbackCopy(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.appendChild(field);
    field.select();
    let succeeded = false;
    try { succeeded = document.execCommand('copy'); } catch (_) { /* not available */ }
    field.remove();
    return succeeded;
  }
  $$('.copy-code').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(CONSULTANT_CODE);
          announce('✓ Đã sao chép mã TF1682');
        } else if (fallbackCopy(CONSULTANT_CODE)) {
          announce('✓ Đã sao chép mã TF1682');
        } else {
          announce('Mã tư vấn của bạn: TF1682');
        }
      } catch (_) {
        if (fallbackCopy(CONSULTANT_CODE)) announce('✓ Đã sao chép mã TF1682');
        else announce('Mã tư vấn của bạn: TF1682');
      }
    });
  });

  // Card showcase: composited CSS transforms; skip motion on accessibility preferences.
  const rotor = $('#card-rotor');
  const stage = $('#card-stage');
  const flipButton = $('#flip-card');
  let flipped = false;
  let activeCard = 'signature';
  const setCard = key => {
    if (!cardData[key]) return;
    activeCard = key;
    flipped = false;
    rotor.classList.remove('is-flipped');
    rotor.dataset.theme = key;
    rotor.style.setProperty('--rx', '9deg');
    rotor.style.setProperty('--ry', '-16deg');
    $('#hero-card-name').textContent = cardData[key].face;
    $('#hero-card-grade').textContent = cardData[key].grade;
    $('#selected-name').textContent = cardData[key].name;
    flipButton.setAttribute('aria-pressed', 'false');
    $$('.variant').forEach(button => {
      const selected = button.dataset.card === key;
      button.classList.toggle('is-current', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  };
  $$('.variant').forEach(button => button.addEventListener('click', () => setCard(button.dataset.card)));
  flipButton.addEventListener('click', () => {
    flipped = !flipped;
    rotor.classList.toggle('is-flipped', flipped);
    flipButton.setAttribute('aria-pressed', String(flipped));
    flipButton.setAttribute('aria-label', flipped ? 'Xoay mặt trước thẻ' : 'Xoay mặt sau thẻ');
  });
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (!reducedMotion && finePointer) {
    let nextX = 9, nextY = -16, frame = 0;
    stage.addEventListener('pointermove', event => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      nextX = 9 - y * 11;
      nextY = -16 + x * 20;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        rotor.style.setProperty('--rx', `${nextX.toFixed(2)}deg`);
        rotor.style.setProperty('--ry', `${nextY.toFixed(2)}deg`);
        frame = 0;
      });
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      rotor.style.setProperty('--rx', '9deg');
      rotor.style.setProperty('--ry', '-16deg');
    });
  }

  const menuToggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  const closeMenu = () => {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Mở menu điều hướng');
  };
  menuToggle.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? 'Đóng menu điều hướng' : 'Mở menu điều hướng');
  });
  $$('a', menu).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  // Filter state is deep-linkable via ?nhu-cau=.
  const validFilters = new Set(['all', 'travel', 'shopping', 'lifestyle']);
  const filterButtons = $$('.filter');
  const products = $$('.product-card');
  const applyFilter = (value, updateUrl = true) => {
    const filter = validFilters.has(value) ? value : 'all';
    filterButtons.forEach(button => {
      const selected = button.dataset.filter === filter;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    products.forEach(card => {
      card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
    });
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (filter === 'all') url.searchParams.delete('nhu-cau');
      else url.searchParams.set('nhu-cau', filter);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };
  filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  applyFilter(new URLSearchParams(location.search).get('nhu-cau') || 'all', false);
  window.addEventListener('popstate', () => applyFilter(new URLSearchParams(location.search).get('nhu-cau') || 'all', false));

  const gallery = $('#poster-track');
  const scrollPosters = direction => {
    const item = $('.poster-card', gallery);
    if (!item) return;
    const gap = parseFloat(getComputedStyle(gallery).columnGap) || 20;
    gallery.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  $('#gallery-prev').addEventListener('click', () => scrollPosters(-1));
  $('#gallery-next').addEventListener('click', () => scrollPosters(1));

  const dialog = $('#poster-modal');
  const modalImage = $('#modal-image');
  const modalTitle = $('#modal-title');
  const modalCount = $('#modal-count');
  let activePosterIndex = 0;
  let returnFocus = null;
  const showPoster = index => {
    activePosterIndex = (index + posters.length) % posters.length;
    const item = posters[activePosterIndex];
    modalImage.src = item.src;
    modalImage.alt = item.alt;
    modalTitle.textContent = item.title;
    modalCount.textContent = `${activePosterIndex + 1} / ${posters.length}`;
    $('.modal-scroller').scrollTop = 0;
  };
  $$('.open-poster').forEach(button => button.addEventListener('click', () => {
    const index = posters.findIndex(p => p.key === button.dataset.poster);
    if (index < 0) return;
    returnFocus = document.activeElement;
    showPoster(index);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('lock-scroll');
    $('#modal-close').focus();
  }));
  $('#modal-close').addEventListener('click', () => dialog.close());
  $('#modal-prev').addEventListener('click', () => showPoster(activePosterIndex - 1));
  $('#modal-next').addEventListener('click', () => showPoster(activePosterIndex + 1));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('lock-scroll');
    if (returnFocus && returnFocus.isConnected) returnFocus.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPoster(activePosterIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPoster(activePosterIndex + 1); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu();
  });

  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
    $$('[data-reveal]').forEach(element => observer.observe(element));
  } else {
    $$('[data-reveal]').forEach(element => element.classList.add('is-visible'));
  }
  $('#year').textContent = String(new Date().getFullYear());
})();
