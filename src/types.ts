import type { JSX } from "react";

export interface BibleVerse {
  text: string;
  reference: string;
  version: string;
}

export interface Devotional {
  id: string;
  date: string;
  verse: BibleVerse;
  title: string;
  content: string;
  prayer: string;
  readingPlan: string;
  reflection?: ReflectionPrompt[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

export interface ReflectionPrompt {
  id: string;
  question: string;
  placeholder: string;
}
