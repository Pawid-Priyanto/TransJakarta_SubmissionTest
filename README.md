# Fleet Management — MBTA Vehicle Monitoring

A frontend application for monitoring and managing vehicle data using the MBTA V3 REST API.

The application allows users to browse vehicles, filter vehicles by route or trip, view vehicle details, and visualize the vehicle's current location on a map.

## Features

* Vehicle listing with responsive card layout
* Server-side pagination
* Configurable page size
* Filter vehicles by Route
* Filter vehicles by Trip
* Multiple Route selection
* Multiple Trip selection
* Infinite scroll / lazy loading for Route options
* Infinite scroll / lazy loading for Trip options
* Vehicle detail popup
* Vehicle location visualization using Leaflet
* Loading skeletons
* Loading indicators for dropdown data fetching
* User-friendly error messages
* Retry failed API requests
* Empty state when no vehicles match the selected filters
* Reset filters
* TypeScript support

## Tech Stack

* React
* TypeScript
* Vite
* Axios
* Tailwind CSS
* Leaflet
* React Leaflet

## API

This project uses the MBTA V3 API.

API documentation:

https://api-v3.mbta.com/docs/swagger/index.html

Main endpoints used:

### Vehicles

```text
GET /vehicles
```

Used to retrieve vehicle monitoring data.

The application uses:

```text
page[limit]
page[offset]
filter[route]
filter[trip]
include=route,trip
```

The `include` parameter is used to retrieve related Route and Trip resources together with the vehicle response.

### Routes

```text
GET /routes
```

Used to populate the Route filter dropdown.

Pagination is implemented using:

```text
page[limit]
page[offset]
```

### Trips

```text
GET /trips
```

The MBTA API requires a filter when retrieving trips.

Therefore, Trips are loaded based on the selected Route:

```text
GET /trips?filter[route]=...
```

Pagination is also implemented using:

```text
page[limit]
page[offset]
```

## Architecture

The application separates API communication, data fetching, UI components, and data types.

```text
src/
├── api/
│   ├── axios.ts
│   ├── routeApi.ts
│   ├── tripApi.ts
│   └── vehicleApi.ts
│
├── components/
│   ├── MultiSelect.tsx
│   ├── VehicleCard.tsx
│   ├── VehicleGrid.tsx
│   ├── VehicleCardSkeleton.tsx
│   ├── VehicleGridSkeleton.tsx
│   ├── VehicleDetailModal.tsx
│   ├── VehicleMap.tsx
│   ├── Pagination.tsx
│   ├── Loading.tsx
│   ├── EmptyState.tsx
│   └── ErrorMessage.tsx
│
├── hooks/
│   ├── useVehicles.ts
│   ├── useRoutes.ts
│   └── useTrips.ts
│
├── types/
│   ├── vehicle.ts
│   ├── route.ts
│   └── trip.ts
│
├── utils/
│   ├── included.ts
│   └── pagination.ts
│
└── pages/
    └── VehicleManagement.tsx
```

## Data Fetching

Axios is used as the HTTP client.

The API base URL is configured using an environment variable:

```env
VITE_API_BASE_URL=https://api-v3.mbta.com
```

Axios configuration:

```ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/vnd.api+json",
  },
});
```

Keeping the API base URL in an environment variable makes the application easier to configure for different environments.

## Filtering

The application supports filtering vehicles by either Route or Trip.

### Route filter

Multiple Route IDs can be sent to the API:

```text
filter[route]=route1,route2,route3
```

### Trip filter

Multiple Trip IDs can be sent to the API:

```text
filter[trip]=trip1,trip2,trip3
```

The implementation intentionally does not combine Route and Trip filters.

This is because the MBTA API documentation specifies that `filter[trip]` cannot be combined with other filters.

When a Trip is selected, the application uses the Trip filter directly.

## Route and Trip Dropdowns

Both Route and Trip filters use a custom multi-select dropdown.

Each dropdown supports:

* Multiple selection
* Loading state
* Loading more state
* Error state
* Empty state
* Infinite scroll

### Infinite Scroll

Infinite scrolling is implemented using the browser's `IntersectionObserver` API.

A sentinel element is placed at the bottom of the dropdown:

```text
Route options
Route A
Route B
Route C
Route D
...
Route T
────────────
Scroll for more
```

When the sentinel enters the viewport, the next API page is requested.

This avoids loading all Route or Trip records at once.

## Pagination

Vehicle pagination is performed server-side.

For example:

```text
page = 2
pageSize = 5
```

results in:

```text
page[offset] = 5
page[limit] = 5
```

The API response's pagination links are also used to determine whether the next or previous page is available.

## Vehicle Details

Clicking a vehicle opens a detail popup containing:

* Vehicle label
* Current status
* Latitude
* Longitude
* Route
* Trip
* Speed
* Bearing
* Direction ID
* Current stop sequence
* Occupancy status
* Revenue status
* Last updated time

Route and Trip information are resolved from the JSON:API `included` resources returned by the Vehicle endpoint.

This avoids additional API requests when opening the vehicle detail popup.

## Map

Vehicle locations are displayed using:

* Leaflet
* React Leaflet
* OpenStreetMap tiles

The vehicle marker is positioned using:

```text
latitude
longitude
```

The map is displayed inside the vehicle detail popup.

## Loading States

The application provides loading feedback during data fetching.

### Vehicle loading

Vehicle cards are replaced with skeleton cards while the API request is in progress.

### Route and Trip loading

The dropdown displays:

```text
Loading...
```

when its initial data is being fetched.

When loading additional pages:

```text
Loading more...
```

is displayed at the bottom of the dropdown.

## Error Handling

API errors are handled using a user-friendly error message.

Example:

```text
Unable to load vehicle data. Please try again.
```

The Vehicle page also provides a Retry action so the user can request the data again without refreshing the entire page.

## Empty State

When the API returns no vehicles matching the selected filters, the application displays an empty state instead of a blank screen.

Example:

```text
No vehicles found

No vehicles match the selected filters.

[ Reset Filters ]
```

This allows the user to quickly return to the initial state.

## Getting Started

### Requirements

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone <https://github.com/Pawid-Priyanto/TransJakarta_SubmissionTest>
```

Navigate to the project:

```bash
cd <TransJakarta_SubmissionTest>
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://api-v3.mbta.com
```

An example environment file is also provided:

```text
.env.example
```

### Run Development Server

```bash
npm run dev
```

The application will be available at the local URL shown by Vite.

### Production Build

To create a production build:

```bash
npm run build
```

## Demo

The demo video covers:

1. Application overview
2. Vehicle data fetching
3. Vehicle pagination
4. Route filtering
5. Trip filtering
6. Multiple selection
7. Infinite scrolling
8. Vehicle detail popup
9. Leaflet map
10. Loading and error states
11. Empty state and filter reset

## Notes

The application is designed around the MBTA V3 API behavior and JSON:API response structure.

Related Route and Trip resources are requested through:

```text
include=route,trip
```

This allows the frontend to display related information without performing additional requests for every vehicle.

## License

This project was created as a technical test submission.
