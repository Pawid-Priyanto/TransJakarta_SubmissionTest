export interface VehicleAttributes {
  bearing: number | null;
  carriages: Carriage[];
  current_status: string;
  current_stop_sequence: number | null;
  direction_id: number | null;
  label: string;
  latitude: number;
  longitude: number;
  occupancy_status: string | null;
  revenue: string;
  speed: number | null;
  updated_at: string;
}

export interface Carriage {
  occupancy_status: string | null;
  occupancy_percentage: number | null;
  label: string;
}

export interface RelationshipData {
  type: string;
  id: string;
}

export interface VehicleRelationships {
  route: {
    data: RelationshipData | null;
  };
  stop: {
    data: RelationshipData | null;
  };
  trip: {
    data: RelationshipData | null;
  };
}

export interface Vehicle {
  id: string;
  type: "vehicle";
  attributes: VehicleAttributes;
  relationships: VehicleRelationships;
}

export interface ApiLinks {
  self?: string;
  prev?: string;
  next?: string;
  last?: string;
  first?: string;
}

export interface VehicleResponse {
  links: ApiLinks;
  data: Vehicle[];
  included?: IncludedResource[];
}

export interface IncludedResource<T = Record<string, unknown>> {
  id: string;
  type: string;
  attributes: T;
}
export interface RouteAttributes {
  color: string;
  description: string;
  direction_destinations: (string | null)[];
  direction_names: (string | null)[];
  fare_class: string;
  listed_route: boolean;
  long_name: string;
  short_name: string;
  sort_order: number;
  text_color: string;
  type: number;
}

export interface TripAttributes {
  bikes_allowed: number;
  block_id: string;
  direction_id: number;
  headsign: string;
  name: string;
  revenue: string;
  wheelchair_accessible: number;
}

export interface VehicleResponse {
  links: ApiLinks;
  data: Vehicle[];
  included?: IncludedResource[];
  jsonapi?: {
    version: string;
  };
}