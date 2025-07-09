export default function DungeonButton({ selected, dungeon, onClick }) {
  const fileName = dungeon.banner || dungeon.name.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div
      className="w-full h-16 flex-shrink-0 relative rounded-md flex justify-center items-center text-lg border border-primary group cursor-pointer"
      onClick={onClick}
    >
      <img
        className={`w-full h-full absolute top-0 left-0 rounded-md object-cover object-[center_35%] grayscale transition-all duration-300 ${selected ? "grayscale-0" : "grayscale group-hover:grayscale-[0.5]"}`}
        src={`Banners/${fileName}.jpg`}
      />
      <div
        className={`absolute inset-0 top-0 left-0 bg-gradient-to-l from-black/0 to-black/90 rounded-md group-hover:opacity-0 transition-opacity duration-300 ${selected ? "opacity-0" : "opacity-100"}`}
      />
      <p className="z-10 text-white">{dungeon.name}</p>
    </div>
  );
}
