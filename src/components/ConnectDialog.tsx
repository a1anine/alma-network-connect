
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
import { toast } from "sonner";

type NetworkingPurpose = 
  | "coffee_chat"
  | "expand_network"
  | "industry_advice"
  | "job_referral";

const purposeOptions: { value: NetworkingPurpose; label: string; message: string }[] = [
  {
    value: "coffee_chat",
    label: "Coffee Chat",
    message: "I would love to schedule a coffee chat to learn more about your experience in {field} at {company}.",
  },
  {
    value: "expand_network",
    label: "Expand Network",
    message: "I'm looking to expand my professional network in {field} and would be grateful for the connection.",
  },
  {
    value: "industry_advice",
    label: "Industry Advice",
    message: "I would appreciate your insights and advice about the {field} industry based on your experience.",
  },
  {
    value: "job_referral",
    label: "Job Referral",
    message: "I'm interested in opportunities at {company} and would appreciate learning about potential openings.",
  },
];

interface Leader {
  id: number;
  name: string;
  role: string;
  company: string;
  field: string;
  alumniStatus: string;
  imageUrl: string;
}

interface ConnectDialogProps {
  leader: Leader;
  onClose: () => void;
}

const ConnectDialog = ({ leader, onClose }: ConnectDialogProps) => {
  const [purpose, setPurpose] = useState<NetworkingPurpose | ''>('');

  const handleConnect = () => {
    if (!purpose) return;

    const selectedOption = purposeOptions.find(opt => opt.value === purpose);
    if (!selectedOption) return;

    const personalizedMessage = selectedOption.message
      .replace('{field}', leader.field)
      .replace('{company}', leader.company);

    // In a real app, this would send the connection request
    toast.success('Connection request sent!', {
      description: `Message: ${personalizedMessage}`,
    });
    onClose();
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

        <div className="py-4">
          <Select value={purpose} onValueChange={(value: NetworkingPurpose) => setPurpose(value)}>
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
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                Preview message:
              </p>
              <p className="mt-2 text-sm">
                {purposeOptions.find(opt => opt.value === purpose)?.message
                  .replace('{field}', leader.field)
                  .replace('{company}', leader.company)}
              </p>
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
