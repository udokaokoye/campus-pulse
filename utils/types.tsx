export interface Event {
  id: string;
  institutionId: number;
  organizationId: number;
  organizationIds: number[];
  branchId: number;
  branchIds: number[];
  organizationName: string;
  organizationProfilePicture: string | null;
  organizationNames: string[];
  name: string;
  description: string;
  location: string;
  startsOn: string; // ISO datetime string
  endsOn: string;   // ISO datetime string
  imagePath: string | null;
  theme: string | null;
  categoryIds: number[];
  categoryNames: string[];
  benefitNames: string[];
  visibility: string;
  status: string;
  latitude: string | null;  // could also be number if you want to parse it
  longitude: string | null; // could also be number if you want to parse it
  recScore: number | null;
  rsvpTotal: number;
}