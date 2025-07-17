import Button from "../../Common/Button";

export default function NoteButton({ text, onClick, onClose }) {
  return (
    <Button
      className="w-full h-8 hover:text-primary font-bold"
      onClick={(e) => {
        onClick();
        onClose();
        e.stopPropagation();
      }}
    >
      {text}
    </Button>
  );
}
