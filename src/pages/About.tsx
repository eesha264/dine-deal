import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackButton from "@/components/FeedbackButton";
import { Card } from "@/components/ui/card";
import { Target, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">About DineDeal</h1>
            <p className="text-lg text-muted-foreground">
              Your one-stop platform to compare and discover the best dine-in offers
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center shadow-card">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Our Mission</h3>
              <p className="text-sm text-muted-foreground">
                Help diners save money by comparing offers from all major food platforms in one place
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-secondary/10 p-3">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Fast & Easy</h3>
              <p className="text-sm text-muted-foreground">
                Search once and see all available offers instantly, sorted by best value
              </p>
            </Card>

            <Card className="p-6 text-center shadow-card">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-verified/10 p-3">
                  <Shield className="h-6 w-6 text-verified" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Verified Offers</h3>
              <p className="text-sm text-muted-foreground">
                Only genuine, verified offers from trusted platforms like Swiggy and Zomato
              </p>
            </Card>
          </div>

          <Card className="p-8 shadow-card">
            <h2 className="mb-4 text-2xl font-bold text-foreground">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Type in the name of your favorite restaurant or cafe
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Compare</h3>
                  <p className="text-sm text-muted-foreground">
                    View all available offers from Swiggy, Zomato, District, Magicpin, and EazyDiner
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">Save</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on the best offer and enjoy your meal with maximum savings
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
      <FeedbackButton />
    </div>
  );
};

export default About;
