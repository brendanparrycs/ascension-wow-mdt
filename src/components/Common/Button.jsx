// TODO: figure out how to add tailwindcss to all children
// add the following: "group-hover:text-primary transition-color duration-300"
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
