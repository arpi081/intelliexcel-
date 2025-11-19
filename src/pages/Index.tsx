import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PromptForm } from "@/components/PromptForm";
import { ResultBox } from "@/components/ResultBox";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, TrendingUp } from "lucide-react";

const Index = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleResult = (formula: string) => {
    setResult(formula);
    setShowResult(!!formula);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-6">
          <Badge variant="secondary" className="bg-excel-green/10 text-excel-green border-excel-green/20 mb-4">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Excel Automation
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Automate Excel with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your spreadsheet workflow with intelligent automation. 
            Simply describe what you want to accomplish, and get instant Excel formulas.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Zap,
              title: "Instant Generation",
              description: "Get complex Excel formulas in seconds"
            },
            {
              icon: Brain,
              title: "AI-Powered",
              description: "Advanced language models understand your needs"
            },
            {
              icon: TrendingUp,
              title: "Boost Productivity",
              description: "Save hours of manual formula writing"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-accent/30 border border-border">
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Prompt Form */}
        <div className="space-y-8">
          <PromptForm 
            onResult={handleResult}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          
          {/* Result Box */}
          <ResultBox result={result} isVisible={showResult} />
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI models • Compatible with Excel 365 & 2019
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
