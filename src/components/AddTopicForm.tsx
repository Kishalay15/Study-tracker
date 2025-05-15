import type { Subject } from "../StudyTracker";

interface Props {
  subjects: Subject[];
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  newTopic: string;
  setNewTopic: (value: string) => void;
  handleAddTopic: () => void;
}

export default function AddTopicForm({
  subjects,
  selectedSubject,
  setSelectedSubject,
  newTopic,
  setNewTopic,
  handleAddTopic,
}: Props) {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add New Topic
      </h2>
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-2 border border-gray-300 rounded md:w-1/3"
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
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={!selectedSubject}
        />
        <button
          onClick={handleAddTopic}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
          disabled={!selectedSubject}
        >
          Add Topic
        </button>
      </div>
    </div>
  );
}
