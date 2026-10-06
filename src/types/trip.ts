export interface TripAttributes {
  wheelchair_accessible: number;
  revenue_status: string;
  name: string;
  headsign: string;
  direction_id: number;
  block_id: string;
  bikes_allowed: number;
}

export interface TripRelationshipData {
  type: string;
  id: string;
}

export interface TripRelationship {
  links?: {
    self?: string;
    related?: string;
  };
  data?: TripRelationshipData | null;
}

export interface TripRelationships {
  shape?: TripRelationship;
  service?: TripRelationship;
  route_pattern?: TripRelationship;
  route?: TripRelationship;
  occupancy?: TripRelationship;
  from_trip_transfers?: TripRelationship;
}

export interface Trip {
  type: "trip" | string;
  id: string;

  attributes: TripAttributes;

  relationships?: TripRelationships;

  links?: {
    self?: string;
  };
}

export interface TripResponse {
  links: {
    self?: string;
    prev?: string;
    next?: string;
    last?: string;
    first?: string;
  };

  data: Trip[];
}