interface MemoProps {
  word: string;
}

export default function MemoWord({ word }: MemoProps) {
  return (
    <div className="w-32 h-14 text-md rounded-xl flex justify-center items-center bg-[#202026] hover:bg-[#131219] transition-all duration-200">
      {word}
    </div>
  );
}
