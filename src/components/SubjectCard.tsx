import { Trash2 } from "lucide-react";
import type { Subject } from "../StudyTracker";
import TopicItem from "./TopicItem";

interface Props {
  subject: Subject;
  onToggle: (subject: string, topic: string) => void;
  onDeleteSubject: (subject: string) => void;
  onDeleteTopic: (subject: string, topic: string) => void;
}

export default function SubjectCard({
  subject,
  onToggle,
  onDeleteSubject,
  onDeleteTopic,
}: Props) {
  const completedCount = subject.topics.filter((t) => t.completed).length;
  const progress = subject.topics.length
    ? Math.round((completedCount / subject.topics.length) * 100)
    : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-800">{subject.name}</h2>
        <button
          onClick={() => onDeleteSubject(subject.name)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Progress: {progress}% ({completedCount}/{subject.topics.length})
        </p>
      </div>

      <ul className="divide-y divide-gray-200">
        {subject.topics.length === 0 ? (
          <li className="py-2 text-gray-500 text-center">
            No topics added yet
          </li>
        ) : (
          subject.topics.map((topic) => (
            <TopicItem
              key={topic.name}
              topic={topic}
              subjectName={subject.name}
              onToggle={onToggle}
              onDelete={onDeleteTopic}
            />
          ))
        )}
      </ul>
    </div>
  );
}
