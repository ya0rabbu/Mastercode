type ProjectPeekCardProps = {
  title: string;
  offset: number;
  onClick: () => void;
};

export default function ProjectPeekCard({
  title,
  offset,
  onClick,
}: ProjectPeekCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        top: `-${offset * 40}px`,
        transform: `scale(${1 - offset * 0.04})`,
        zIndex: 10 - offset,
      }}
      className="absolute left-1/2 -translate-x-1/2 w-[92%] h-16 rounded-t-2xl bg-[#141414] border border-white/10 flex items-center px-8 cursor-pointer hover:brightness-125 transition-all"
    >
      <span className="text-white/70 font-[Cabinet_Grotesk] font-bold text-lg tracking-wide truncate">
        {title}
      </span>
    </button>
  );
}