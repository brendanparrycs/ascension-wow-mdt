export default function Button({ className, children, onClick }) {
  return (
    <button
      className={`bg-primary border-2 border-gold rounded-md group hover:bg-gold transition-colors duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
