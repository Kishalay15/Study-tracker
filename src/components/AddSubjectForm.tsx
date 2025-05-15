interface Props {
  newSubject: string;
  setNewSubject: (value: string) => void;
  handleAddSubject: () => void;
}

export default function AddSubjectForm({
  newSubject,
  setNewSubject,
  handleAddSubject,
}: Props) {
  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add New Subject
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter subject name"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddSubject}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Subject
        </button>
      </div>
    </div>
  );
}
