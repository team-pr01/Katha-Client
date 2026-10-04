import { FiEdit2, FiTrash2, FiLink } from "react-icons/fi";
import type { THero } from "../../../../types/hero.types";

interface HeroCardProps {
  hero: THero;
  index: number;
  onEdit: (hero: THero) => void;
  onDelete: (hero: THero) => void;
}

const HeroCard = ({ hero, index, onEdit, onDelete }: HeroCardProps) => {
  return (
    <div className="group bg-white rounded-2xl border border-neutral-20 overflow-hidden hover:border-primary-10/40 hover:shadow-md transition-all">
      {/* Image */}
      <div className="relative w-full aspect-16/6 bg-neutral-20 overflow-hidden">
        <img
          src={hero.image}
          alt={hero.alt || `Hero ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Index badge */}
        <div className="absolute top-3 left-3 bg-neutral-10/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-full">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-neutral-10/0 group-hover:bg-neutral-10/40 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onEdit(hero)}
            className="p-2.5 rounded-xl bg-white text-neutral-10 hover:bg-primary-10 hover:text-white transition-all shadow-lg"
            aria-label="Edit hero"
            title="Edit"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(hero)}
            className="p-2.5 rounded-xl bg-white text-neutral-10 hover:bg-red-500 hover:text-white transition-all shadow-lg"
            aria-label="Delete hero"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-sm font-medium text-neutral-10 line-clamp-2 min-h-10">
         Alt: {hero.alt || "No alt text"}
        </p>

        {hero.link ? (
          <a
            href={hero.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1.5 text-xs text-primary-10 hover:text-[#d4892a] transition-colors truncate"
            title={hero.link}
          >
            <FiLink size={11} className="shrink-0" />
            <span className="truncate">{hero.link}</span>
          </a>
        ) : (
          <p className="mt-2 text-xs text-neutral-45 italic">No redirect link</p>
        )}
      </div>
    </div>
  );
};

export default HeroCard;