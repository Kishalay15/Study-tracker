import { Trash2 } from "lucide-react";
import type { Subject } from "../types";
import TopicItem from "./TopicItem";

interface Props {
  subject: Subject;
  onDelete: (subject: string) => void;
  onToggle: (subject: string, topic: string) => void;
  onDeleteTopic: (subject: string, topic: string) => void;
  onAddSubtopic: (subject: string, topic: string, sub: string) => void;
  onToggleSubtopic: (subject: string, topic: string, sub: string) => void;
  onDeleteSubtopic: (subject: string, topic: string, sub: string) => void;
}

const calculateProgress = (subject: Subject): number => {
  const total = subject.topics.length;
  const done = subject.topics.filter((t) => t.completed).length;
  return total === 0 ? 0 : Math.round((done / total) * 100);
};

export default function SubjectCard({
  subject,
  onDelete,
  onToggle,
  onDeleteTopic,
  onAddSubtopic,
  onToggleSubtopic,
  onDeleteSubtopic,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-800">{subject.name}</h2>
        <button
          onClick={() => onDelete(subject.name)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${calculateProgress(subject)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Progress: {calculateProgress(subject)}% (
          {subject.topics.filter((t) => t.completed).length}/
          {subject.topics.length})
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
              onAddSubtopic={onAddSubtopic}
              onToggleSubtopic={onToggleSubtopic}
              onDeleteSubtopic={onDeleteSubtopic}
            />
          ))
        )}
      </ul>
    </div>
  );
}
