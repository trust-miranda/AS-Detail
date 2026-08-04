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
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('nome').value.trim();
  const phone = document.getElementById('telefone').value.trim();
  const vehicle = document.getElementById('carro').value.trim();
  const service = document.getElementById('servico').value;
  const notes = document.getElementById('msg').value.trim();

  const message = [
    `Olá! Chamo-me ${name}.`,
    `Gostaria de pedir informação ou marcar o serviço ${service} para a viatura ${vehicle}.`,
    `O meu contacto é ${phone}.`,
    notes ? `Informação adicional: ${notes}` : ''
  ].filter(Boolean).join(' ');

  const url = `https://wa.me/351935023925?text=${encodeURIComponent(message)}`;
  const tab = window.open(url, '_blank', 'noopener');

  // Without WhatsApp installed the popup may never open, so always leave the
  // visitor a way to finish the contact by email.
  if (tab) {
    formNote.classList.remove('is-error');
    formNote.textContent = 'Abrimos o WhatsApp com o pedido já escrito — só tens de carregar em enviar.';
    return;
  }

  const mail = `mailto:contacto@asdetail.pt?subject=${encodeURIComponent('Pedido de marcação — ' + service)}&body=${encodeURIComponent(message)}`;
  formNote.classList.add('is-error');
  formNote.innerHTML =
    'Não conseguimos abrir o WhatsApp. ' +
    `<a href="${url}" target="_blank" rel="noopener">Abrir o WhatsApp manualmente</a> ` +
    `ou <a href="${mail}">enviar por email</a>.`;
});
