import { useState, useEffect } from "react";
import type { Subject } from "./types";
import AddSubjectForm from "./components/AddSubjectForm";
import AddTopicForm from "./components/AddTopicForm";
import SubjectCard from "./components/SubjectCard";

export default function StudyTracker() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("studyTrackerData");
    return saved ? JSON.parse(saved) : [];
  });

  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    localStorage.setItem("studyTrackerData", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubject.trim()) return;
    if (
      subjects.some((s) => s.name.toLowerCase() === newSubject.toLowerCase())
    ) {
      alert("Subject already exists");
      return;
    }
    setSubjects([...subjects, { name: newSubject, topics: [] }]);
    setNewSubject("");
  };

  const addTopic = () => {
    if (!newTopic.trim() || !selectedSubject) return;

    setSubjects(
      subjects.map((subject) => {
        if (subject.name === selectedSubject) {
          if (
            subject.topics.some(
              (t) => t.name.toLowerCase() === newTopic.toLowerCase()
            )
          ) {
            alert("Topic already exists");
            return subject;
          }

          return {
            ...subject,
            topics: [
              ...subject.topics,
              { name: newTopic, completed: false, subtopics: [] },
            ],
          };
        }
        return subject;
      })
    );

    setNewTopic("");
  };

  const deleteSubject = (name: string) => {
    if (confirm(`Delete subject "${name}"?`)) {
      setSubjects(subjects.filter((s) => s.name !== name));
    }
  };

  const toggleTopic = (subjectName: string, topicName: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.name === topicName
                  ? { ...topic, completed: !topic.completed }
                  : topic
              ),
            }
          : subject
      )
    );
  };

  const deleteTopic = (subjectName: string, topicName: string) => {
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              topics: subject.topics.filter((t) => t.name !== topicName),
            }
          : subject
      )
    );
  };

  const addSubtopic = (
    subjectName: string,
    topicName: string,
    subName: string
  ) => {
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.name === topicName
                  ? {
                      ...topic,
                      subtopics: [
                        ...topic.subtopics,
                        { name: subName, completed: false },
                      ],
                    }
                  : topic
              ),
            }
          : subject
      )
    );
  };

  const toggleSubtopic = (
    subjectName: string,
    topicName: string,
    subName: string
  ) => {
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.name === topicName
                  ? {
                      ...topic,
                      subtopics: topic.subtopics.map((sub) =>
                        sub.name === subName
                          ? { ...sub, completed: !sub.completed }
                          : sub
                      ),
                    }
                  : topic
              ),
            }
          : subject
      )
    );
  };

  const deleteSubtopic = (
    subjectName: string,
    topicName: string,
    subName: string
  ) => {
    setSubjects(
      subjects.map((subject) =>
        subject.name === subjectName
          ? {
              ...subject,
              topics: subject.topics.map((topic) =>
                topic.name === topicName
                  ? {
                      ...topic,
                      subtopics: topic.subtopics.filter(
                        (sub) => sub.name !== subName
                      ),
                    }
                  : topic
              ),
            }
          : subject
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
        onAdd={addSubject}
      />

      <AddTopicForm
        newTopic={newTopic}
        setNewTopic={setNewTopic}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        subjects={subjects}
        onAdd={addTopic}
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
              onDelete={deleteSubject}
              onToggle={toggleTopic}
              onDeleteTopic={deleteTopic}
              onAddSubtopic={addSubtopic}
              onToggleSubtopic={toggleSubtopic}
              onDeleteSubtopic={deleteSubtopic}
            />
          ))}
        </div>
      )}
    </div>
  );
}
