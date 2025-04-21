
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Leader } from "@/types/Leader";

type NetworkingPurpose = 
  | "coffee_chat"
  | "expand_network"
  | "industry_advice"
  | "job_referral";

const purposeOptions: { value: NetworkingPurpose; label: string; message: string }[] = [
  {
    value: "coffee_chat",
    label: "Coffee Chat",
    message: "I would love to schedule a coffee chat to learn more about your experience in {field} at {company}. Your background in {expertise} particularly interests me.",
  },
  {
    value: "expand_network",
    label: "Expand Network",
    message: "I'm looking to expand my professional network in {field} and would be grateful for the connection. Your achievements in {achievements} are truly inspiring.",
  },
  {
    value: "industry_advice",
    label: "Industry Advice",
    message: "I would appreciate your insights and advice about the {field} industry based on your experience, particularly regarding {expertise}.",
  },
  {
    value: "job_referral",
    label: "Job Referral",
    message: "I'm interested in opportunities at {company} and would appreciate learning about potential openings. Your background in {expertise} aligns well with my career goals.",
  },
];

interface ConnectDialogProps {
  leader: Leader;
  onClose: () => void;
}

const ConnectDialog = ({ leader, onClose }: ConnectDialogProps) => {
  const [purpose, setPurpose] = useState<NetworkingPurpose | ''>('');
  const [customMessage, setCustomMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const generateMessage = (template: string) => {
    return template
      .replace('{field}', leader.field)
      .replace('{company}', leader.company)
      .replace('{expertise}', leader.expertise?.join(', ') || leader.field)
      .replace('{achievements}', leader.achievements?.join(', ') || `${leader.field} at ${leader.company}`);
  };

  const handleConnect = () => {
    if (!purpose) return;

    const messageToSend = isEditing ? customMessage : 
      generateMessage(purposeOptions.find(opt => opt.value === purpose)?.message || '');

    toast.success('Connection request sent!', {
      description: `Message: ${messageToSend}`,
      duration: 4000,
    });
    onClose();
  };

  const handlePurposeChange = (value: NetworkingPurpose) => {
    setPurpose(value);
    const selectedOption = purposeOptions.find(opt => opt.value === value);
    if (selectedOption) {
      const generatedMessage = generateMessage(selectedOption.message);
      setCustomMessage(generatedMessage);
    }
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Connect with {leader.name}</AlertDialogTitle>
          <AlertDialogDescription>
            Choose how you'd like to network with {leader.name} from {leader.company}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <Select value={purpose} onValueChange={handlePurposeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your networking purpose" />
            </SelectTrigger>
            <SelectContent>
              {purposeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {purpose && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Preview message:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Use Template" : "Customize Message"}
                </Button>
              </div>
              
              {isEditing ? (
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Write your personalized message..."
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-sm">
                    {generateMessage(purposeOptions.find(opt => opt.value === purpose)?.message || '')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={!purpose}>
            Send Connection Request
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectDialog;
