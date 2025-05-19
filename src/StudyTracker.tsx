// import { useState, useEffect } from "react";
// import type { Subject } from "./types";
// import AddSubjectForm from "./components/AddSubjectForm";
// import AddTopicForm from "./components/AddTopicForm";
// import SubjectCard from "./components/SubjectCard";

// export default function StudyTracker() {
//   const [subjects, setSubjects] = useState<Subject[]>(() => {
//     const saved = localStorage.getItem("studyTrackerData");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [newSubject, setNewSubject] = useState("");
//   const [newTopic, setNewTopic] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("studyTrackerData", JSON.stringify(subjects));
//   }, [subjects]);

//   const addSubject = () => {
//     if (!newSubject.trim()) return;
//     if (
//       subjects.some((s) => s.name.toLowerCase() === newSubject.toLowerCase())
//     ) {
//       alert("Subject already exists");
//       return;
//     }
//     setSubjects([...subjects, { name: newSubject, topics: [] }]);
//     setNewSubject("");
//   };

//   const addTopic = () => {
//     if (!newTopic.trim() || !selectedSubject) return;

//     setSubjects(
//       subjects.map((subject) => {
//         if (subject.name === selectedSubject) {
//           if (
//             subject.topics.some(
//               (t) => t.name.toLowerCase() === newTopic.toLowerCase()
//             )
//           ) {
//             alert("Topic already exists");
//             return subject;
//           }

//           return {
//             ...subject,
//             topics: [
//               ...subject.topics,
//               { name: newTopic, completed: false, subtopics: [] },
//             ],
//           };
//         }
//         return subject;
//       })
//     );

//     setNewTopic("");
//   };

//   const deleteSubject = (name: string) => {
//     if (confirm(`Delete subject "${name}"?`)) {
//       setSubjects(subjects.filter((s) => s.name !== name));
//     }
//   };

//   const toggleTopic = (subjectName: string, topicName: string) => {
//     setSubjects(
//       subjects.map((subject) =>
//         subject.name === subjectName
//           ? {
//               ...subject,
//               topics: subject.topics.map((topic) =>
//                 topic.name === topicName
//                   ? { ...topic, completed: !topic.completed }
//                   : topic
//               ),
//             }
//           : subject
//       )
//     );
//   };

//   const deleteTopic = (subjectName: string, topicName: string) => {
//     setSubjects(
//       subjects.map((subject) =>
//         subject.name === subjectName
//           ? {
//               ...subject,
//               topics: subject.topics.filter((t) => t.name !== topicName),
//             }
//           : subject
//       )
//     );
//   };

//   const addSubtopic = (
//     subjectName: string,
//     topicName: string,
//     subName: string
//   ) => {
//     setSubjects(
//       subjects.map((subject) =>
//         subject.name === subjectName
//           ? {
//               ...subject,
//               topics: subject.topics.map((topic) =>
//                 topic.name === topicName
//                   ? {
//                       ...topic,
//                       subtopics: [
//                         ...topic.subtopics,
//                         { name: subName, completed: false },
//                       ],
//                     }
//                   : topic
//               ),
//             }
//           : subject
//       )
//     );
//   };

//   const toggleSubtopic = (
//     subjectName: string,
//     topicName: string,
//     subName: string
//   ) => {
//     setSubjects(
//       subjects.map((subject) => {
//         if (subject.name !== subjectName) return subject;

//         return {
//           ...subject,
//           topics: subject.topics.map((topic) => {
//             if (topic.name !== topicName) return topic;

//             const updatedSubtopics = topic.subtopics.map((sub) =>
//               sub.name === subName ? { ...sub, completed: !sub.completed } : sub
//             );

//             const allSubtopicsCompleted =
//               updatedSubtopics.length > 0 &&
//               updatedSubtopics.every((sub) => sub.completed);

//             return {
//               ...topic,
//               subtopics: updatedSubtopics,
//               completed: allSubtopicsCompleted,
//             };
//           }),
//         };
//       })
//     );
//   };

//   const deleteSubtopic = (
//     subjectName: string,
//     topicName: string,
//     subName: string
//   ) => {
//     setSubjects(
//       subjects.map((subject) => {
//         if (subject.name !== subjectName) return subject;

//         return {
//           ...subject,
//           topics: subject.topics.map((topic) => {
//             if (topic.name !== topicName) return topic;

//             const updatedSubtopics = topic.subtopics.filter(
//               (sub) => sub.name !== subName
//             );

//             const allSubtopicsCompleted =
//               updatedSubtopics.length > 0 &&
//               updatedSubtopics.every((sub) => sub.completed);

//             return {
//               ...topic,
//               subtopics: updatedSubtopics,
//               completed: allSubtopicsCompleted,
//             };
//           }),
//         };
//       })
//     );
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
//       <header className="mb-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl sm:text-3xl font-bold text-violet-700">
//             Study Tracker
//           </h1>

//           <button
//             className="md:hidden bg-violet-600 text-white p-2 rounded-lg"
//             onClick={toggleMobileMenu}
//           >
//             {isMobileMenuOpen ? "Close" : "Menu"}
//           </button>
//         </div>
//       </header>

//       <div
//         className={`md:hidden transition-all duration-300 overflow-hidden ${
//           isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="space-y-4 bg-white p-4 rounded-lg shadow mb-4">
//           <AddSubjectForm
//             newSubject={newSubject}
//             setNewSubject={setNewSubject}
//             onAdd={addSubject}
//             isMobile={true}
//           />

//           <AddTopicForm
//             newTopic={newTopic}
//             setNewTopic={setNewTopic}
//             selectedSubject={selectedSubject}
//             setSelectedSubject={setSelectedSubject}
//             subjects={subjects}
//             onAdd={addTopic}
//             isMobile={true}
//           />
//         </div>
//       </div>

//       <div className="hidden md:block space-y-6">
//         <AddSubjectForm
//           newSubject={newSubject}
//           setNewSubject={setNewSubject}
//           onAdd={addSubject}
//           isMobile={false}
//         />

//         <AddTopicForm
//           newTopic={newTopic}
//           setNewTopic={setNewTopic}
//           selectedSubject={selectedSubject}
//           setSelectedSubject={setSelectedSubject}
//           subjects={subjects}
//           onAdd={addTopic}
//           isMobile={false}
//         />
//       </div>

//       {subjects.length === 0 ? (
//         <div className="text-center p-8 bg-white rounded-lg shadow">
//           <p className="text-gray-500">No subjects added yet.</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {subjects.map((subject) => (
//             <SubjectCard
//               key={subject.name}
//               subject={subject}
//               onDelete={deleteSubject}
//               onToggle={toggleTopic}
//               onDeleteTopic={deleteTopic}
//               onAddSubtopic={addSubtopic}
//               onToggleSubtopic={toggleSubtopic}
//               onDeleteSubtopic={deleteSubtopic}
//             />
//           ))}
//         </div>
//       )}
//       <footer className="text-center text-gray-400 text-xs py-6">
//         <span>
//           Built with <span className="text-violet-700">💜</span> by{" "}
//           <a
//             href="https://personal-portfolio-wheat-kappa.vercel.app/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-gray-400 hover:text-violet-600 transition-colors"
//           >
//             Kishalay
//           </a>
//         </span>
//       </footer>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import type { Subject } from "./types";
import AddSubjectForm from "./components/AddSubjectForm";
import AddTopicForm from "./components/AddTopicForm";
import SubjectCard from "./components/SubjectCard";
import Calendar from "./components/Calendar";

export default function StudyTracker() {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("studyTrackerData");
    return saved ? JSON.parse(saved) : [];
  });

  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"subjects" | "calendar">(
    "subjects"
  );

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
      subjects.map((subject) => {
        if (subject.name !== subjectName) return subject;

        return {
          ...subject,
          topics: subject.topics.map((topic) => {
            if (topic.name !== topicName) return topic;

            const updatedSubtopics = topic.subtopics.map((sub) =>
              sub.name === subName ? { ...sub, completed: !sub.completed } : sub
            );

            const allSubtopicsCompleted =
              updatedSubtopics.length > 0 &&
              updatedSubtopics.every((sub) => sub.completed);

            return {
              ...topic,
              subtopics: updatedSubtopics,
              completed: allSubtopicsCompleted,
            };
          }),
        };
      })
    );
  };

  const deleteSubtopic = (
    subjectName: string,
    topicName: string,
    subName: string
  ) => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.name !== subjectName) return subject;

        return {
          ...subject,
          topics: subject.topics.map((topic) => {
            if (topic.name !== topicName) return topic;

            const updatedSubtopics = topic.subtopics.filter(
              (sub) => sub.name !== subName
            );

            const allSubtopicsCompleted =
              updatedSubtopics.length > 0 &&
              updatedSubtopics.every((sub) => sub.completed);

            return {
              ...topic,
              subtopics: updatedSubtopics,
              completed: allSubtopicsCompleted,
            };
          }),
        };
      })
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-700">
            Study Tracker
          </h1>

          <button
            className="md:hidden bg-violet-600 text-white p-2 rounded-lg"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 bg-white p-4 rounded-lg shadow mb-4">
          <AddSubjectForm
            newSubject={newSubject}
            setNewSubject={setNewSubject}
            onAdd={addSubject}
            isMobile={true}
          />

          <AddTopicForm
            newTopic={newTopic}
            setNewTopic={setNewTopic}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            subjects={subjects}
            onAdd={addTopic}
            isMobile={true}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <nav className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm md:text-base ${
              activeTab === "subjects"
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            Study Subjects
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm md:text-base ${
              activeTab === "calendar"
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("calendar")}
          >
            Calendar
          </button>
        </div>
      </nav>

      {activeTab === "subjects" && (
        <>
          <div className="hidden md:block space-y-6">
            <AddSubjectForm
              newSubject={newSubject}
              setNewSubject={setNewSubject}
              onAdd={addSubject}
              isMobile={false}
            />

            <AddTopicForm
              newTopic={newTopic}
              setNewTopic={setNewTopic}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              subjects={subjects}
              onAdd={addTopic}
              isMobile={false}
            />
          </div>

          {subjects.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">No subjects added yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </>
      )}

      {activeTab === "calendar" && (
        <div className="mb-6">
          <Calendar subjects={subjects} />
        </div>
      )}

      <footer className="text-center text-gray-400 text-xs py-6">
        <span>
          Built with <span className="text-violet-700">💜</span> by{" "}
          <a
            href="https://personal-portfolio-wheat-kappa.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-violet-600 transition-colors"
          >
            Kishalay
          </a>
        </span>
      </footer>
    </div>
  );
}
