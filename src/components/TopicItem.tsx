import { useState } from "react";
import { X } from "lucide-react";
import type { Topic } from "../types";
import AddSubtopicForm from "./AddSubtopicForm";

interface Props {
  topic: Topic;
  subjectName: string;
  onToggle: (subject: string, topic: string) => void;
  onDelete: (subject: string, topic: string) => void;
  onAddSubtopic: (subject: string, topic: string, sub: string) => void;
  onToggleSubtopic: (subject: string, topic: string, sub: string) => void;
  onDeleteSubtopic: (subject: string, topic: string, sub: string) => void;
}

export default function TopicItem({
  topic,
  subjectName,
  onToggle,
  onDelete,
  onAddSubtopic,
  onToggleSubtopic,
  onDeleteSubtopic,
}: Props) {
  const [newSubtopic, setNewSubtopic] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAdd = () => {
    if (!newSubtopic.trim()) return;
    onAddSubtopic(subjectName, topic.name, newSubtopic);
    setNewSubtopic("");
  };

  const renderSubtopicCount = () => {
    if (topic.subtopics.length === 0) return null;

    const expandCollapseIcon =
      topic.subtopics.length > 3 ? (expanded ? "(-)" : "(+)") : "";
    return (
      <span className="text-xs text-gray-500 ml-1 inline-flex whitespace-nowrap">
        {expandCollapseIcon} {topic.subtopics.length}
      </span>
    );
  };

  return (
    <li className="py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-grow min-w-0">
          <input
            type="checkbox"
            checked={topic.completed}
            onChange={() => onToggle(subjectName, topic.name)}
            className="w-4 h-4 flex-shrink-0 text-indigo-600 mr-2 sm:mr-3"
          />
          <div
            className="flex items-center min-w-0 cursor-pointer"
            onClick={() => topic.subtopics.length > 0 && setExpanded(!expanded)}
          >
            <span
              className={`${
                topic.completed ? "line-through text-gray-500" : ""
              } text-sm sm:text-base truncate flex-grow`}
            >
              {topic.name}
            </span>
            {renderSubtopicCount()}
          </div>
        </div>
        <button
          onClick={() => onDelete(subjectName, topic.name)}
          className="text-red-500 hover:text-red-700 text-sm flex-shrink-0 ml-2"
          aria-label="Delete topic"
        >
          <X size={16} />
        </button>
      </div>

      {(expanded || topic.subtopics.length < 4) && (
        <ul className="ml-6 mt-2 text-xs sm:text-sm text-gray-700">
          {topic.subtopics.map((sub) => (
            <li
              key={sub.name}
              className="flex justify-between items-center py-1"
            >
              <div className="flex items-center gap-2 min-w-0">
                <input
                  type="checkbox"
                  checked={sub.completed}
                  onChange={() =>
                    onToggleSubtopic(subjectName, topic.name, sub.name)
                  }
                  className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0 text-indigo-500"
                />
                <span
                  className={`${
                    sub.completed ? "line-through text-gray-500" : ""
                  } truncate`}
                >
                  {sub.name}
                </span>
              </div>
              <button
                onClick={() =>
                  onDeleteSubtopic(subjectName, topic.name, sub.name)
                }
                className="text-xs text-red-400 hover:text-red-600 flex-shrink-0 ml-2"
                aria-label="Delete subtopic"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AddSubtopicForm
        newSubtopic={newSubtopic}
        setNewSubtopic={setNewSubtopic}
        onAdd={handleAdd}
      />
    </li>
  );
}
