import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

interface Event {
  id: string;
  date: string; // ISO format: YYYY-MM-DD
  title: string;
  description: string;
  subjectId?: string;
}

interface CalendarProps {
  subjects: Array<{ name: string }>;
}

export default function Calendar({ subjects }: CalendarProps) {
  // State for events and form inputs
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem("studyTrackerEvents");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventSubject, setNewEventSubject] = useState("");
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<"month" | "list">("month");

  // Save events to localStorage when they change
  useEffect(() => {
    localStorage.setItem("studyTrackerEvents", JSON.stringify(events));
  }, [events]);

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get start day of month (0 = Sunday, 1 = Monday, etc.)
  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Add new event
  const addEvent = () => {
    if (!newEventTitle.trim()) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      date: selectedDate,
      title: newEventTitle,
      description: newEventDescription,
      subjectId: newEventSubject || undefined,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");
    setNewEventDescription("");
    setNewEventSubject("");
    setIsAddingEvent(false);
  };

  // Delete event
  const deleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  // Check if a date has events
  const hasEvents = (date: string) => {
    return events.some((event) => event.date === date);
  };

  // Get events for a specific date
  const getEventsForDate = (date: string) => {
    return events.filter((event) => event.date === date);
  };

  // Get all events sorted by date (most recent first)
  const getAllEventsSorted = () => {
    return [...events].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  };

  // Generate calendar days
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startDay = getStartDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the start of the month
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-gray-200 bg-gray-50"
        ></div>
      );
    }

    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentMonth &&
        new Date().getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 ${
            isToday ? "bg-violet-50" : ""
          } overflow-hidden relative`}
          onClick={() => {
            setSelectedDate(date);
            setIsAddingEvent(true);
          }}
        >
          <div className="flex justify-between">
            <span
              className={`${
                isToday
                  ? "bg-violet-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                  : ""
              }`}
            >
              {day}
            </span>
          </div>
          {hasEvents(date) && (
            <div className="mt-1 overflow-y-auto max-h-16">
              {getEventsForDate(date).map((event) => (
                <div
                  key={event.id}
                  className="bg-violet-100 text-violet-800 p-1 mb-1 rounded text-xs truncate"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      confirm(
                        `${event.title}\n\n${event.description}\n\nDelete this event?`
                      )
                    ) {
                      deleteEvent(event.id);
                    }
                  }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
          <CalendarIcon className="mr-2 text-violet-600" size={20} />
          Study Calendar
        </h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded text-sm ${
              viewMode === "month"
                ? "bg-violet-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setViewMode("month")}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${
              viewMode === "list"
                ? "bg-violet-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Month View */}
      {viewMode === "month" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded"
            >
              &lt;
            </button>
            <h3 className="font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={nextMonth}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded"
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center py-1 bg-gray-100 font-medium text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
        </>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Upcoming Events</h3>
            <button
              onClick={() => {
                setSelectedDate(new Date().toISOString().split("T")[0]);
                setIsAddingEvent(true);
              }}
              className="bg-violet-600 text-white px-3 py-1 rounded text-sm hover:bg-violet-700"
            >
              Add Event
            </button>
          </div>

          {getAllEventsSorted().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events scheduled yet
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {getAllEventsSorted().map((event) => (
                <div
                  key={event.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center"
                >
                  <div className="sm:w-32 font-medium">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {event.description}
                    </div>
                    {event.subjectId && (
                      <div className="text-xs text-violet-600 mt-1">
                        Subject: {event.subjectId}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2 sm:mt-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Event Form */}
      {isAddingEvent && (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-2">
            Add Event for{" "}
            {new Date(selectedDate).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Event title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Event description"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Related Subject (optional)
              </label>
              <select
                value={newEventSubject}
                onChange={(e) => setNewEventSubject(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">None</option>
                {subjects.map((subject) => (
                  <option key={subject.name} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={addEvent}
                className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
              >
                Add Event
              </button>
              <button
                onClick={() => setIsAddingEvent(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
