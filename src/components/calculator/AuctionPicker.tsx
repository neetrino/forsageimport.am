"use client";

export type AuctionValue = "iaai" | "copart" | "manheim";

type AuctionPickerProps = {
  label: string;
  name?: string;
  value: AuctionValue;
  onChange: (value: AuctionValue) => void;
};

const auctions: { value: AuctionValue; mark: "iaai" | "copart" | "manheim" }[] = [
  { value: "iaai", mark: "iaai" },
  { value: "copart", mark: "copart" },
  { value: "manheim", mark: "manheim" },
];

export function AuctionPicker({
  label,
  name = "auction",
  value,
  onChange,
}: AuctionPickerProps) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-[var(--calc-label)]">{label}</legend>
      <input type="hidden" name={name} value={value} />
      <div className="grid grid-cols-3 gap-2">
        {auctions.map((auction) => {
          const selected = auction.value === value;
          return (
            <button
              key={auction.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(auction.value)}
              className={`flex h-12 items-center justify-center rounded-[var(--radius-md)] border bg-white transition-colors ${
                selected
                  ? "border-[var(--calc-accent)] shadow-[0_0_0_1px_var(--calc-accent)]"
                  : "border-[var(--calc-border)] hover:border-[var(--calc-border-strong)]"
              }`}
            >
              <AuctionMark mark={auction.mark} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function AuctionMark({ mark }: { mark: "iaai" | "copart" | "manheim" }) {
  if (mark === "iaai") {
    return (
      <span className="text-sm font-extrabold tracking-tight text-[#e10600]">
        IAA<span className="align-super text-[0.65em]">I</span>
      </span>
    );
  }

  if (mark === "copart") {
    return (
      <span className="text-sm font-extrabold tracking-tight">
        <span className="text-[#1f4e79]">Co</span>
        <span className="text-[#c41230]">part</span>
      </span>
    );
  }

  return (
    <span className="text-xs font-bold tracking-wide text-[#5b6b7c] uppercase">
      Manheim
    </span>
  );
}
