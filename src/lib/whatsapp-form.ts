/**
 * Formularios que arman un mensaje de WhatsApp con el pedido completo.
 * El botón es un enlace <a> a wa.me que se actualiza al escribir: así el clic se mide igual que
 * los demás botones de WhatsApp y, sin JavaScript, igual abre el chat con un mensaje genérico.
 */

export type MessageBuilder = (data: FormData) => string;

/** Fecha AAAA-MM-DD → "viernes 18 de diciembre" (sin desfase de zona horaria). */
export function formatDateEs(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .replace(',', '');
}

/** Texto limpio de un campo (vacío si no existe). */
export function field(data: FormData, name: string): string {
  return String(data.get(name) ?? '').replace(/\s+/g, ' ').trim();
}

/** Fecha de hoy en Chile en formato AAAA-MM-DD (para el mínimo de los campos de fecha). */
function todayInChile(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(new Date());
}

export function bindWhatsAppForm(form: HTMLFormElement, build: MessageBuilder): void {
  const link = form.querySelector<HTMLAnchorElement>('[data-wa-submit]');
  const number = form.dataset.waNumber;
  if (!link || !number) return;

  form.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((input) => {
    input.min = todayInChile();
  });

  const update = () => {
    link.href = `https://wa.me/${number}?text=${encodeURIComponent(build(new FormData(form)))}`;
  };

  const send = () => {
    update();
    link.click();
  };

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  // Enter dentro de un campo = enviar el pedido (el formulario no tiene botón submit,
  // así que el envío implícito del navegador no siempre ocurre)
  form.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter' && target instanceof HTMLInputElement && target.type !== 'checkbox') {
      event.preventDefault();
      send();
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    send();
  });
  update();
}
