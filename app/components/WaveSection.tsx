export default function WaveSection() {
  return (
    <div className="relative h-[130px] w-full max-[850px]:h-[65px]">
      <div
        className="absolute bottom-0 left-0 h-full w-full bg-repeat-x"
        style={{
          backgroundPosition: "12vw bottom",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200 134' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 98L50 92C100 86 200 74 300 50C400 26 500 -10 600 2C700 14 800 74 900 98C1000 122 1100 110 1150 104L1200 98V134H1150C1100 134 1000 134 900 134C800 134 700 134 600 134C500 134 400 134 300 134C200 134 100 134 50 134H0V98Z' fill='%23fdf2f8'/></svg>")`,
        }}
      />
    </div>
  );
}
