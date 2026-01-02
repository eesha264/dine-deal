import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search for a restaurant or cafe..." }: SearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative flex w-full max-w-2xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 pl-10 pr-4 text-base shadow-card focus-visible:shadow-card-hover"
        />
      </div>
      <Button onClick={onSearch} size="lg" className="h-12 bg-gradient-hero px-6 shadow-card hover:shadow-card-hover">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
