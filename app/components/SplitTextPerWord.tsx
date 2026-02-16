type SplitTextProps = {
  text: string;
  className?: string;
};

export default function SplitTextPerWord({
  text,
  className = "",
}: SplitTextProps) {
  return (
    <h2 className={`flex flex-col ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </h2>
  );
}
