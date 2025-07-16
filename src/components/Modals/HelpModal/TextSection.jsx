export default function TextSection({ className, title, text }) {
  return (
    <section className={className}>
      <p className="font-bold text-xl">{title}</p>
      {typeof text === "string" ? (
        <p className="whitespace-break-spaces text-white">{text}</p>
      ) : (
        text
      )}
    </section>
  );
}
