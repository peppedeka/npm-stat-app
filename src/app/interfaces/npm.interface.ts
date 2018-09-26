export interface NpmData {
  [index: string]: Npm;
}

export interface Npm {
  start: string;
  end: string;
  package: string;
  downloads: Download[];
}

export interface Download {
  day: string;
  downloads: number;
}

export interface NpmResponse {
  package: Package;
  score: object;
  searchSchore: number;
}

export interface Package {
  date: string;
  description: string;
  name: string;
  version: string;
}
