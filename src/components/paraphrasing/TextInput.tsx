import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextInputProps {
  onParaphrase: (text: string) => void;
  isLoading: boolean;
}

export function TextInput({ onParaphrase, isLoading }: TextInputProps) {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onParaphrase(inputText.trim());
    }
  };

  const handleClear = () => {
    setInputText("");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      toast({
        description: "Text pasted from clipboard",
      });
    } catch (error) {
      toast({
        description: "Failed to paste from clipboard",
        variant: "destructive",
      });
    }
  };

  const characterCount = inputText.length;
  const maxCharacters = 1000;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="input-text" className="text-sm font-medium">
          Original Text
        </Label>
        <div className="relative">
          <Textarea
            id="input-text"
            placeholder="Enter your text here to paraphrase..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] resize-none"
            maxLength={maxCharacters}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {characterCount}/{maxCharacters}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={handleSubmit}
          disabled={!inputText.trim() || isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <>
              <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
              Paraphrasing...
            </>
          ) : (
            "Paraphrase Text"
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={handlePaste}
          disabled={isLoading}
        >
          <Copy className="mr-2 h-4 w-4" />
          Paste
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={!inputText || isLoading}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}