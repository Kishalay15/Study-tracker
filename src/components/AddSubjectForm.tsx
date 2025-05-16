interface Props {
  newSubject: string;
  setNewSubject: (value: string) => void;
  onAdd: () => void;
  isMobile: boolean;
}

export default function AddSubjectForm({
  newSubject,
  setNewSubject,
  onAdd,
  isMobile,
}: Props) {
  return (
    <div className={isMobile ? "" : "mb-8 bg-white p-4 rounded-lg shadow"}>
      <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-800">
        Add New Subject
      </h2>
      <div className={isMobile ? "flex flex-col gap-2" : "flex gap-2"}>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter subject name"
          className={`p-2 border border-gray-300 rounded ${
            isMobile ? "w-full" : "flex-1"
          }`}
        />
        <button
          onClick={onAdd}
          className={`bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 ${
            isMobile ? "w-full" : ""
          }`}
        >
          Add Subject
        </button>
      </div>
    </div>
  );
}
