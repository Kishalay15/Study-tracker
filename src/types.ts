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
