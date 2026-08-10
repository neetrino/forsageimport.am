import type { SiteSocialLink } from "@/lib/site/contact";

type SocialIconProps = {
  id: SiteSocialLink["id"];
  className?: string;
};

export function SocialIcon({ id, className = "" }: SocialIconProps) {
  const common = {
    className,
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (id === "facebook") {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          d="M14 8.2h2.2V5h-2.3c-2.7 0-4.4 1.6-4.4 4.3V11H7.3v3.2h2.2V22h3.4v-7.8h2.5l.5-3.2h-3V9.5c0-.8.2-1.3 1.1-1.3Z"
        />
      </svg>
    );
  }

  if (id === "instagram") {
    return (
      <svg {...common}>
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 3h7A5.5 5.5 0 0 1 21 8.5v7A5.5 5.5 0 0 1 15.5 21h-7A5.5 5.5 0 0 1 3 15.5v-7A5.5 5.5 0 0 1 8.5 3Zm0 1.8A3.7 3.7 0 0 0 4.8 8.5v7a3.7 3.7 0 0 0 3.7 3.7h7a3.7 3.7 0 0 0 3.7-3.7v-7a3.7 3.7 0 0 0-3.7-3.7h-7Zm8.2 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 1.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        fill="currentColor"
        d="M19.8 4.4c.3-.1.6 0 .7.2.1.2.1.5 0 .7L17.4 19c-.1.3-.4.5-.7.5-.2 0-.3 0-.5-.1l-4.1-1.7-2.1 2.2c-.2.2-.5.2-.7.1-.2-.1-.4-.4-.4-.6v-3.5L4.4 13c-.3-.1-.5-.4-.4-.7.1-.3.3-.5.6-.5l14.2-7.4Zm-2.2 2.4-9.5 5 5.3 2.2 4.2-7.2Z"
      />
    </svg>
  );
}
