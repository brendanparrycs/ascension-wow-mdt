export default function BackgroundVideo() {
  return (
    <video
      className="w-full h-full object-cover fixed bottom-0 right-0"
      loop
      autoPlay
      muted
    >
      <source
        src="/AscensionAssets/ascension_background.webm"
        type="video/webm"
      />
    </video>
  );
}
