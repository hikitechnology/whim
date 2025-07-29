export type ApiLocationUpdate = {
  uid: string;
  distance: number;
  coordinates: {
    x: number;
    y: number;
  };
  name: string;
  interests?: string[];
};

export type LocalLocationUpdate = Omit<ApiLocationUpdate, "coordinates"> & {
  locationName: string;
};
