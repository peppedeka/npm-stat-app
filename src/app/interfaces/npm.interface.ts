import { EmailValidator } from '@angular/forms';

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
  analyzedAt: string;
  collected: Collected;
  evaluation: Evaluation;
  score: Score;
}

export interface Collected {
  github: Github;
  metadata: Metadata;
  name: string;
  version: string;
  npm: NPM;
  source: Source;
}

export interface Github {
  forksCount: number;
  startsCount: number;
}

export interface Metadata {
  author: Author;
  description: string;
  name: string;
  version: string;
}

export interface Author {
  name: string;
  email: string;
  url: string;
  username: string;
}

export interface NPM {
  dependendentsCount: number;
  starCount: number;
}

export interface Source {
  badges: Badge[];
}

export interface Badge {
  info: Info;
  urls: Url;
}

export interface Info {
  service: string;
  type: string;
}

export interface Url {
  content: string;
  original: string;
  shields: string;
}

export interface Evaluation {
  maintenance: Maintenance;
  popularity: Popularity;
  quality: Quality;
}

export interface Maintenance {
  commitsFrequency: number;
  issuesDistribution: number;
  openIssues: number;
  releasesFrequency: number;
}

export interface Popularity {
  communityInterest: number;
  dependentsCount: number;
  downloadsAcceleration: number;
  downloadsCount: number;
}

export interface Quality {
  branding: number;
  carefulness: number;
  heakth: number;
  tests: number;
}

export interface Score {
  detail: Detail;
  final: number;
}

export interface Detail {
  quality: number;
  popularity: number;
  maintenance: number;
}
