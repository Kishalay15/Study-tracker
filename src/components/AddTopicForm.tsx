import type { Subject } from "../types";

interface Props {
  subjects: Subject[];
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  newTopic: string;
  setNewTopic: (value: string) => void;
  onAdd: () => void;
  isMobile: boolean;
}

export default function AddTopicForm({
  subjects,
  selectedSubject,
  setSelectedSubject,
  newTopic,
  setNewTopic,
  onAdd,
  isMobile,
}: Props) {
  return (
    <div className={isMobile ? "" : "mb-8 bg-white p-4 rounded-lg shadow"}>
      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-800">
        Add New Topic
      </h2>
      <div
        className={
          isMobile ? "flex flex-col gap-2" : "flex flex-col md:flex-row gap-2"
        }
      >
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className={`p-2 border border-gray-300 rounded ${
            isMobile ? "w-full" : "md:w-1/3"
          }`}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.name} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Enter topic name"
          className={`p-2 border border-gray-300 rounded ${
            isMobile ? "w-full" : "flex-1"
          }`}
          disabled={!selectedSubject}
        />
        <button
          onClick={onAdd}
          className={`bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:bg-gray-400 ${
            isMobile ? "w-full" : ""
          }`}
          disabled={!selectedSubject}
        >
          Add Topic
        </button>
      </div>
    </div>
  );
}
