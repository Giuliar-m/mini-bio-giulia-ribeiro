/**
 * Mini Site de Bio • Giulia Ribeiro
 * Assistente Virtual para Médicos
 * JavaScript Puro (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Console welcome & status confirmation
  console.log(
    '%c Giulia Ribeiro %c Assistência Virtual para Médicos ',
    'background: #9C525E; color: #FFF8F4; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #3F2A32; color: #F3DDD8; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );

  const card = document.querySelector('.card-editorial');
  const archWrapper = document.querySelector('.arch-frame-wrapper');
  const btnWhatsapp = document.getElementById('btn-whatsapp');
  const btnPortfolio = document.getElementById('btn-portfolio');

  // Check user motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gentle subtle interactive tilt on desktop (if motion is enabled)
  if (!prefersReducedMotion && window.innerWidth >= 768 && card && archWrapper) {
    let ticking = false;

    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const tiltX = (y / rect.height) * -3;
          const tiltY = (x / rect.width) * 4;

          archWrapper.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    card.addEventListener('mouseleave', () => {
      archWrapper.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      archWrapper.style.transition = 'transform 0.5s ease-out';
      setTimeout(() => {
        archWrapper.style.transition = '';
      }, 500);
    });
  }

  // Click tracking / event logging for action buttons (ready for Meta Pixel / GTM if added later)
  const trackAction = (label, destination) => {
    console.info(`[Bio Action] Visitante clicou em: ${label} -> ${destination}`);
  };

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      trackAction('WhatsApp', btnWhatsapp.href);
    });
  }

  if (btnPortfolio) {
    btnPortfolio.addEventListener('click', () => {
      trackAction('Portfólio Profissional', btnPortfolio.href);
    });
  }
});
