interface Props {
  newSubtopic: string;
  setNewSubtopic: (value: string) => void;
  onAdd: () => void;
}

export default function AddSubtopicForm({
  newSubtopic,
  setNewSubtopic,
  onAdd,
}: Props) {
  return (
    <div className="flex flex-col xs:flex-row gap-2 mt-2">
      <input
        type="text"
        value={newSubtopic}
        onChange={(e) => setNewSubtopic(e.target.value)}
        placeholder="Add subtopic"
        className="flex-1 p-1 border border-gray-300 rounded text-sm"
      />
      <button
        onClick={onAdd}
        className="bg-violet-500 text-white px-2 py-1 rounded text-sm"
      >
        Add
      </button>
    </div>
  );
}
