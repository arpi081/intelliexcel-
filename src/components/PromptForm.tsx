import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptFormProps {
  onResult: (result: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const PromptForm = ({ onResult, isLoading, setIsLoading }: PromptFormProps) => {
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you want to automate in Excel",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const resultText = data.formula || "No formula generated";
      onResult(resultText);

      if (resultText === "im not chatgpt ma") {
        toast({
          title: "Notice",
          description: "Please ask for an Excel formula only.",
          variant: "default", // Or a warning variant if available
        });
      } else {
        toast({
          title: "Formula generated successfully!",
          description: "Your Excel automation is ready to use.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      onResult("");
      toast({
        title: "❌ Error connecting to backend",
        description: "Please make sure the backend server is running on localhost:5000",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 shadow-medium bg-card border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Describe your Excel automation
          </label>
          <Textarea
            id="prompt"
            placeholder="e.g., Create a formula to calculate compound interest with monthly contributions..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px] resize-none focus:ring-primary"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating Formula...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Generate Formula
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};