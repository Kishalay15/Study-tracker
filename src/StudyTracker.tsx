import { useState, useEffect } from "react";
import AddSubjectForm from "./components/AddSubjectForm";
import AddTopicForm from "./components/AddTopicForm";
import SubjectCard from "./components/SubjectCard";

export interface Topic {
  name: string;
  completed: boolean;
}

export interface Subject {
  name: string;
  topics: Topic[];
}

export default function StudyTracker() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const savedData = localStorage.getItem("studyTrackerData");
    return savedData ? (JSON.parse(savedData) as Subject[]) : [];
  });

  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    localStorage.setItem("studyTrackerData", JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    const exists = subjects.some(
      (s) => s.name.toLowerCase() === newSubject.toLowerCase()
    );
    if (exists) return alert("This subject already exists!");
    setSubjects([...subjects, { name: newSubject, topics: [] }]);
    setNewSubject("");
  };

  const handleAddTopic = () => {
    if (!newTopic.trim() || !selectedSubject) return;
    setSubjects((prev) =>
      prev.map((subject) => {
        if (subject.name === selectedSubject) {
          const exists = subject.topics.some(
            (t) => t.name.toLowerCase() === newTopic.toLowerCase()
          );
          if (exists) {
            alert("This topic already exists for this subject!");
            return subject;
          }
          return {
            ...subject,
            topics: [...subject.topics, { name: newTopic, completed: false }],
          };
        }
        return subject;
      })
    );
    setNewTopic("");
  };

  const toggleTopic = (subjectName: string, topicName: string) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.name === subjectName
          ? {
              ...s,
              topics: s.topics.map((t) =>
                t.name === topicName ? { ...t, completed: !t.completed } : t
              ),
            }
          : s
      )
    );
  };

  const deleteSubject = (name: string) => {
    if (confirm(`Delete "${name}" and its topics?`)) {
      setSubjects(subjects.filter((s) => s.name !== name));
    }
  };

  const deleteTopic = (subjectName: string, topicName: string) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.name === subjectName
          ? {
              ...s,
              topics: s.topics.filter((t) => t.name !== topicName),
            }
          : s
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Exam Study Tracker
      </h1>

      <AddSubjectForm
        newSubject={newSubject}
        setNewSubject={setNewSubject}
        handleAddSubject={handleAddSubject}
      />

      <AddTopicForm
        subjects={subjects}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        newTopic={newTopic}
        setNewTopic={setNewTopic}
        handleAddTopic={handleAddTopic}
      />

      {subjects.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No subjects added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.name}
              subject={subject}
              onToggle={toggleTopic}
              onDeleteSubject={deleteSubject}
              onDeleteTopic={deleteTopic}
            />
          ))}
        </div>
      )}
    </div>
  );
}
