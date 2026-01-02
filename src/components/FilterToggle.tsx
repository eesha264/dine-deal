import { cn } from "@/lib/utils";

export type FilterOption = "best" | "highest" | "nearest";

interface FilterToggleProps {
  selected: FilterOption;
  onChange: (option: FilterOption) => void;
}

const filters: { value: FilterOption; label: string }[] = [
  { value: "best", label: "Best Deal" },
  { value: "highest", label: "Highest Discount" },
  { value: "nearest", label: "Nearest" },
];

const FilterToggle = ({ selected, onChange }: FilterToggleProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            selected === filter.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterToggle;
