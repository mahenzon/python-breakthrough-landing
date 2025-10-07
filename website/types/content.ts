export interface FaqItem {
  question: string;
  answer: string;
}

export interface StudentProject {
  title: string;
  description: string;
  url: string;
  author?: string;
}

export interface CourseProject {
  id: string;
  title: string;
  description: string;
  url: string;
  status: 'available' | 'coming_soon';
}

// ============================================
// Icons
// ============================================
export interface Icon {
  name: string;
  icon: string;
  path: string;
}

// ============================================
// Module Technology Mapping
// ============================================
export interface ModuleTech {
  'icon-name': string;
  text: string;
}

export interface ModuleTechConfig {
  tech: ModuleTech[];
}

export interface ModuleTechMapping {
  [moduleId: string]: ModuleTechConfig;
}

export interface ModuleTechData {
  modules: ModuleTechMapping;
}

export interface EnrichedModuleTech extends ModuleTech {
  icon: string;
  path: string;
  name: string; // same as icon-name, for convenience
}

// ============================================
// Technology Stack
// ============================================
export interface TechnologyStackItem {
  title: string;
  'icon-name': string;  // UPDATED: now uses icon-name instead of icon + path
  // Optional enriched fields (can be added during generation)
  icon?: string;
  path?: string;
}

export interface TechnologyStackCategory {
  title: string;
  icon: string;
  path: string;
  items: TechnologyStackItem[];
}

export interface TechnologyStackData {
  title: string;
  subtitle?: string;
  categories: TechnologyStackCategory[];
}

// ============================================
// Home Content
// ============================================
export interface ValuePropositionItem {
  icon: string;
  title: string;
  description: string;
}

export interface HomeContent {
  whatYouLearn: string[];
  forWhom: string[];
  requirements: string[];
  howItWorks: string[];
  whatYouGet: string[];
  juridicalOptionsAvailable: string[];
  valueProposition: ValuePropositionItem[];
}

// ============================================
// Course Links
// ============================================
export interface CoursePlatform {
  id: string;
  name: string;
  emoji: string;
  title: string;
  description: string;
  url: string;
  buttonText: string;
  note: string;
  order: number;
}

export interface CourseLinksData {
  platforms: CoursePlatform[];
}
