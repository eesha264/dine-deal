import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FeedbackButton = () => {
  const handleClick = () => {
    toast.success("Thanks for your interest! Feedback form coming soon.");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-hero p-0 shadow-card-hover transition-transform hover:scale-110 md:h-auto md:w-auto md:rounded-lg md:px-6"
    >
      <MessageCircle className="h-6 w-6 md:mr-2" />
      <span className="hidden md:inline">Feedback</span>
    </Button>
  );
};

export default FeedbackButton;
