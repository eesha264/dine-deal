import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Utensils } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground transition-colors hover:text-primary">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="bg-gradient-hero bg-clip-text text-transparent">DineDeal</span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <NavLink
              to="/"
              end
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:px-4"
              activeClassName="bg-muted text-foreground"
            >
              Home
            </NavLink>
            <NavLink
              to="/nearby"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:px-4"
              activeClassName="bg-muted text-foreground"
            >
              Nearby Deals
            </NavLink>
            <NavLink
              to="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:px-4"
              activeClassName="bg-muted text-foreground"
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
