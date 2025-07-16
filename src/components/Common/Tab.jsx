export default function Tab({ className, children, side, style }) {
  return (
    <div
      className={`w-72 bg-primary border-2 border-primary p-4 flex flex-col gap-4 ${
        side === "left" ? "rounded-r-md border-l-0" : "rounded-l-md border-r-0"
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
