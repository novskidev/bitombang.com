// Thin typed wrapper — Decap CMS edits the JSON files below, pages import from here.
import siteData from './site.json';
import aboutData from './about.json';
import collectionData from './collection.json';
import projectsData from './projects.json';

export type Photo = { src: string; alt: string; w: number; h: number };
export type Project = {
  slug: string;
  title: string;
  meta: string;
  desc: string;
  cover: Photo;
  photos: Photo[];
};

export const SITE = siteData;
export const COLLECTION = (collectionData as { photos: Photo[] }).photos;
export const PROJECTS = (projectsData as { projects: Project[] }).projects;
export const AWARDS = siteData.awards as { year: string; text: string }[];
export const ABOUT = aboutData as {
  heading: string;
  intro: string;
  quote: string;
  photo: Photo;
};
