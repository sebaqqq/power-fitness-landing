import { Icon } from "./Icon";

export function FloatingWidgets() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/56900000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="relative flex h-13 w-13 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 motion-reduce:hidden" />
        <Icon name="whatsapp" size={24} className="relative" />
      </a>
      <button
        aria-label="Ver carrito de compras"
        className="flex h-13 w-13 items-center justify-center rounded-full border border-line bg-surface text-foreground shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <Icon name="cart" size={20} />
      </button>
    </div>
  );
}
