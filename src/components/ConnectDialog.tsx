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

const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of current year

const purposeOptions: { value: NetworkingPurpose; label: string; message: string }[] = [
  {
    value: "coffee_chat",
    label: "Coffee Chat",
    message: "Hi {firstName}! I'm [Your Name], a fellow {university} alum '{graduationYear}. I've been following your work on {expertise} at {company} and would love to buy you a quick virtual (or in-person) coffee next week. Would you have 15 minutes on Tuesday or Thursday?",
  },
  {
    value: "expand_network",
    label: "Expand Network",
    message: "Hi {firstName}, I'm [Your Name], Class of '{graduationYear} at {university}. We both share interests in {expertise}, and I'd love to connect here on LinkedIn and learn about your post-grad path.",
  },
  {
    value: "industry_advice",
    label: "Industry Advice",
    message: "Hello {firstName}! I'm [Your Name] (Class of '{graduationYear}, {university}) exploring a move into {field}. Your experience with {expertise} really stands out—any chance I could ask you 2 quick questions about how you got started?",
  },
  {
    value: "job_referral",
    label: "Job Referral",
    message: "Hi {firstName}! I'm [Your Name], a fellow {university} grad '{graduationYear} interested in {role} at {company}. Since you're on that team, would you mind sharing any tips or referring me if you're comfortable? I really appreciate it!",
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
    const firstName = leader.name.split(' ')[0];
    const university = leader.alumniStatus.split(' ')[0];
    const graduationYear = leader.alumniStatus.match(/'\d{2}/)?.[0].slice(1) || currentYear;

    return template
      .replace('{firstName}', firstName)
      .replace('{university}', university)
      .replace('{graduationYear}', graduationYear)
      .replace('{company}', leader.company)
      .replace('{field}', leader.field)
      .replace('{role}', leader.role)
      .replace('{expertise}', leader.expertise?.join(', ') || leader.field);
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
