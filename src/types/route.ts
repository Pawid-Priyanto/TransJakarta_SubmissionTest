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

export interface Route {
  id: string;
  type: "route";
  attributes: RouteAttributes;
}

export interface RouteResponse {
  links: {
    self?: string;
    prev?: string;
    next?: string;
    last?: string;
    first?: string;
  };
  data: Route[];
}