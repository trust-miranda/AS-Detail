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
