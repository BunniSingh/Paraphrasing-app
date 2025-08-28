import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextOutputProps {
  paraphrasedText: string;
  isVisible: boolean;
}

export function TextOutput({ paraphrasedText, isVisible }: TextOutputProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paraphrasedText);
      setCopied(true);
      toast({
        description: "Paraphrased text copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([paraphrasedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "paraphrased-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      description: "Text downloaded successfully",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="output-text" className="text-sm font-medium">
            Paraphrased Text
          </Label>
          <div className="relative">
            <Textarea
              id="output-text"
              value={paraphrasedText}
              readOnly
              className="min-h-[150px] resize-none bg-muted/50"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex-1"
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Text
              </>
            )}
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Word count: {paraphrasedText.split(/\s+/).length} words
        </div>
      </CardContent>
    </Card>
  );
}