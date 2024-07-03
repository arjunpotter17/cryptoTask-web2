export const ProfileHeaderIcon = ({
  size = "20",
  color = "#111C3D",
}: {
  size?: string;
  color?: string;
}): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="9.60005" r="3.8" stroke={color} strokeWidth="2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.88867 19.0306C5.92219 16.1001 8.71585 14 12 14C15.2842 14 18.0778 16.1001 19.1113 19.0306C18.6009 19.5469 18.0346 20.0079 17.4222 20.4038C16.8986 17.8892 14.6699 16 12 16C9.33007 16 7.10138 17.8892 6.57778 20.4038C5.96545 20.0079 5.39915 19.5469 4.88867 19.0306Z"
        fill={color}
      />
    </svg>
  );
};
