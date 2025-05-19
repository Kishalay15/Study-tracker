export interface Subtopic {
  name: string;
  completed: boolean;
}

export interface Topic {
  name: string;
  completed: boolean;
  subtopics: Subtopic[];
}

export interface Subject {
  name: string;
  topics: Topic[];
}

export interface Event {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  title: string;
  description: string;
  subjectId?: string;
}
