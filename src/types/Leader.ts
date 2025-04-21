
export interface Leader {
  id: number;
  name: string;
  role: string;
  company: string;
  field: string;
  alumniStatus: string;  // Now used for both university and graduation year (e.g., "Stanford '98")
  imageUrl: string;
  background?: string;
  achievements?: string[];
  expertise?: string[];
}
