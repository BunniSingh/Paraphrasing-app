import { useState } from "react";
import { TextInput } from "@/components/paraphrasing/TextInput";
import { TextOutput } from "@/components/paraphrasing/TextOutput";
import { paraphraseText, ParaphraseResponse } from "@/services/paraphrasingApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [paraphrasedText, setParaphrasedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const { toast } = useToast();

  const handleParaphrase = async (text: string) => {
    setIsLoading(true);
    setError("");
    setShowOutput(false);

    try {
      const response: ParaphraseResponse = await paraphraseText(text);
      
      if (response.success && response.paraphrasedText) {
        setParaphrasedText(response.paraphrasedText);
        setShowOutput(true);
        toast({
          description: "Text paraphrased successfully!",
        });
      } else {
        setError(response.error || "Failed to paraphrase text");
        toast({
          description: response.error || "Failed to paraphrase text",
          variant: "destructive",
        });
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Paraphrasing Tool</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your text with AI-powered paraphrasing. Enter your text below and get a fresh, 
              rephrased version while maintaining the original meaning.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Enter Text to Paraphrase</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TextInput onParaphrase={handleParaphrase} isLoading={isLoading} />
              </CardContent>
            </Card>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Output Section */}
            {showOutput && (
              <TextOutput paraphrasedText={paraphrasedText} isVisible={showOutput} />
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Easy to Use</h3>
                  <p className="text-sm text-muted-foreground">
                    Simply paste your text and get instant paraphrasing results
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Maintains Meaning</h3>
                  <p className="text-sm text-muted-foreground">
                    Preserves the original context while improving readability
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">Multiple Formats</h3>
                  <p className="text-sm text-muted-foreground">
                    Copy to clipboard or download as text file
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
