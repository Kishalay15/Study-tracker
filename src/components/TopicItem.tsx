import { X } from "lucide-react";
import type { Topic } from "../StudyTracker";

interface Props {
  topic: Topic;
  subjectName: string;
  onToggle: (subject: string, topic: string) => void;
  onDelete: (subject: string, topic: string) => void;
}

export default function TopicItem({
  topic,
  subjectName,
  onToggle,
  onDelete,
}: Props) {
  return (
    <li className="py-2 flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={topic.completed}
          onChange={() => onToggle(subjectName, topic.name)}
          className="w-4 h-4 text-indigo-600 mr-3"
        />
        <span className={topic.completed ? "line-through text-gray-500" : ""}>
          {topic.name}
        </span>
      </div>
      <button
        onClick={() => onDelete(subjectName, topic.name)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        <X size={16} />
      </button>
    </li>
  );
}
