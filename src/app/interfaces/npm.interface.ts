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
