export const ArrowLink = ({
  size = "30",
  color = "#16163D",
}: {
  size?: string;
  color?: string;
}): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="20" y1="80" x2="80" y2="20" stroke={color} strokeWidth="5" />
      {/* <polygon points="40,25 80,20 65,35" fill={color} /> */}
      <polygon points="40,25 80,25 80,40" fill={color} />
    </svg>
  );
};
