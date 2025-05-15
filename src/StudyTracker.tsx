import { useState, useEffect } from "react";
import { Trash2, X } from "lucide-react";

interface Topic {
  name: string;
  completed: boolean;
}

interface Subject {
  name: string;
  topics: Topic[];
}

export default function StudyTracker() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const savedData = localStorage.getItem("studyTrackerData");
    return savedData ? (JSON.parse(savedData) as Subject[]) : [];
  });

  const [newSubject, setNewSubject] = useState<string>("");
  const [newTopic, setNewTopic] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("studyTrackerData", JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;

    const subjectExists = subjects.some(
      (subject) => subject.name.toLowerCase() === newSubject.toLowerCase()
    );

    if (subjectExists) {
      alert("This subject already exists!");
      return;
    }

    setSubjects([...subjects, { name: newSubject, topics: [] }]);
    setNewSubject("");
  };

  const handleAddTopic = () => {
    if (!newTopic.trim() || !selectedSubject) return;

    const updatedSubjects = subjects.map((subject) => {
      if (subject.name === selectedSubject) {
        const topicExists = subject.topics.some(
          (topic) => topic.name.toLowerCase() === newTopic.toLowerCase()
        );

        if (topicExists) {
          alert("This topic already exists for the selected subject!");
          return subject;
        }

        return {
          ...subject,
          topics: [...subject.topics, { name: newTopic, completed: false }],
        };
      }
      return subject;
    });

    setSubjects(updatedSubjects);
    setNewTopic("");
  };

  const handleTopicToggle = (subjectName: string, topicName: string) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.name === subjectName) {
        return {
          ...subject,
          topics: subject.topics.map((topic) =>
            topic.name === topicName
              ? { ...topic, completed: !topic.completed }
              : topic
          ),
        };
      }
      return subject;
    });

    setSubjects(updatedSubjects);
  };

  const handleDeleteSubject = (subjectName: string) => {
    if (
      confirm(
        `Are you sure you want to delete the subject "${subjectName}" and all its topics?`
      )
    ) {
      setSubjects(subjects.filter((subject) => subject.name !== subjectName));
    }
  };

  const handleDeleteTopic = (subjectName: string, topicName: string) => {
    const updatedSubjects = subjects.map((subject) => {
      if (subject.name === subjectName) {
        return {
          ...subject,
          topics: subject.topics.filter((topic) => topic.name !== topicName),
        };
      }
      return subject;
    });

    setSubjects(updatedSubjects);
  };

  const calculateProgress = (topics: Topic[]): number => {
    if (!topics.length) return 0;
    const completedCount = topics.filter((t) => t.completed).length;
    return Math.round((completedCount / topics.length) * 100);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Exam Study Tracker
      </h1>

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

      {subjects.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">
            No subjects added yet. Add your first subject above!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="bg-white p-4 rounded-lg shadow max-h-[500px] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-indigo-800">
                  {subject.name}
                </h2>
                <button
                  onClick={() => handleDeleteSubject(subject.name)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${calculateProgress(subject.topics)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Progress: {calculateProgress(subject.topics)}% (
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
                    <li
                      key={topic.name}
                      className="py-2 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={topic.completed}
                          onChange={() =>
                            handleTopicToggle(subject.name, topic.name)
                          }
                          className="w-4 h-4 text-indigo-600 mr-3"
                        />
                        <span
                          className={
                            topic.completed ? "line-through text-gray-500" : ""
                          }
                        >
                          {topic.name}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteTopic(subject.name, topic.name)
                        }
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
