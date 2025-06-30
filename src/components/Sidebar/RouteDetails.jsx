export default function RouteDetails() {
  return (
    <div className="w-72 h-40 p-4 fixed right-0 bg-primary border-l border-b border-primary">
      <button
        className="w-full h-10 border-2 border-gold rounded-md font-semibold text-left px-4 hover:text-black hover:bg-gold transition flex items-center justify-between"
        type="button"
      >
        <p>Default route</p> <p>&or;</p>
      </button>
    </div>
  );
}
