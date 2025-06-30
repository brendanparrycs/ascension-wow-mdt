export default function SelectDungeonButton() {
  return (
    <div className="absolute top-4 left-4 z-10">
      <button
        className="w-60 flex items-center justify-center group drop-shadow-md select-none"
        type="button"
        onClick={() => console.log("SELECT DUNGEON PRESSED")}
      >
        <img
          className="inline group-hover:hidden group-active:hidden"
          src="/AscensionAssets/ascension_button_default.webp"
          draggable="false"
        />
        <img
          className="hidden group-hover:inline group-active:hidden"
          src="/AscensionAssets/ascension_button_hover.webp"
          draggable="false"
        />
        <img
          className="hidden group-hover:hidden group-active:inline"
          src="/AscensionAssets/ascension_button_active.webp"
          draggable="false"
        />
        <p className="absolute text-lg font-semibold text-shadow-lg group-hover:text-gray-200 group-active:text-gray-200">
          SELECT DUNGEON
        </p>
      </button>
    </div>
  );
}
