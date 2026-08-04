const tabs = Array.from(document.querySelectorAll('.tab'));

function selectTab(tab, moveFocus) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });

  if (moveFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));

  tab.addEventListener('keydown', (event) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;

    event.preventDefault();
    selectTab(tabs[(index + step + tabs.length) % tabs.length], true);
  });
});

// Links pointing into a tab panel (for example #estofagem) must open that tab first.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    const panel = target && target.closest('.panel');
    if (!panel) return;

    selectTab(tabs.find((tab) => tab.getAttribute('aria-controls') === panel.id));
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
  });
});

if (location.hash === '#estofagem') {
  selectTab(tabs.find((tab) => tab.getAttribute('aria-controls') === 'panel-estofagem'));
  document.getElementById('estofagem').scrollIntoView();
}

const form = document.getElementById('waForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('nome').value.trim();
  const vehicle = document.getElementById('carro').value.trim();
  const service = document.getElementById('servico').value;
  const notes = document.getElementById('msg').value.trim();

  const message = [
    `Olá! Chamo-me ${name}.`,
    `Gostaria de pedir informação ou marcar o serviço ${service} para a viatura ${vehicle}.`,
    notes ? `Informação adicional: ${notes}` : ''
  ].filter(Boolean).join(' ');

  window.open(
    `https://wa.me/351935023925?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener'
  );
});
