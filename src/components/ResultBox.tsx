import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, FileSpreadsheet, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultBoxProps {
  result: string;
  isVisible: boolean;
}

export const ResultBox = ({ result, isVisible }: ResultBoxProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Formula copied!",
        description: "The formula has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please select and copy the formula manually.",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  // Check if the result is the specific error message
  const isError = result === "im not chatgpt ma";

  return (
    <Card className={`p-6 shadow-medium bg-card border-border animate-in slide-in-from-bottom-4 duration-500 ${isError ? 'border-red-500' : ''}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isError ? (
               <Lightbulb className="w-5 h-5 text-red-500" />
            ) : (
               <FileSpreadsheet className="w-5 h-5 text-excel-green" />
            )}
            <h3 className="text-lg font-semibold text-foreground">{isError ? "Notice" : "Generated Formula"}</h3>
          </div>
          <Badge variant="secondary" className={`bg-excel-green/10 text-excel-green border-excel-green/20 ${isError ? 'hidden' : ''}`}>
            <Lightbulb className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>

        <div className="relative">
          <div className={`rounded-lg p-4 border font-mono text-sm break-all ${isError ? 'bg-red-50 border-red-200 text-red-700' : 'bg-accent/50 border-border text-foreground'}`}>
            {result}
          </div>
          
          {!isError && (
            <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="absolute top-2 right-2 h-8 w-8 p-0"
            >
                {copied ? (
                <Check className="w-3 h-3 text-excel-green" />
                ) : (
                <Copy className="w-3 h-3" />
                )}
            </Button>
          )}
        </div>

        {!isError && (
            <div className="bg-accent/30 rounded-lg p-3 border-l-4 border-l-primary">
            <p className="text-sm text-muted-foreground">
                <strong>How to use:</strong> Copy this formula and paste it into your Excel cell. 
                Make sure to adjust cell references according to your data layout.
            </p>
            </div>
        )}
      </div>
    </Card>
  );
};