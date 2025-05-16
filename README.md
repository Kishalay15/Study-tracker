# Exam Study Tracker

A responsive web application to help students organize and track their exam preparation progress.

**Live Demo:** [https://study-tracker-mauve-rho.vercel.app/](https://study-tracker-mauve-rho.vercel.app/)

## Features

- 📚 Organize study material by subjects, topics, and subtopics
- ✅ Track completion progress for each subject and topic
- 📱 Fully responsive design that works on desktop and mobile devices
- 💾 Data persistence using local storage
- 🎨 Clean, intuitive user interface with progress indicators

## Tech Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling and responsive design
- **Lucide React**: For iconography
- **LocalStorage**: For data persistence

## Usage

### Adding Subjects

1. Enter a subject name in the "Add New Subject" field
2. Click "Add Subject" to create a new subject card

### Adding Topics

1. Select a subject from the dropdown menu
2. Enter a topic name in the input field
3. Click "Add Topic" to add the topic to the selected subject

### Adding Subtopics

1. Each topic has its own subtopic field
2. Enter a subtopic name and click "Add"

### Tracking Progress

- Check the checkbox next to a topic or subtopic to mark it as completed
- Progress bars automatically update to show your overall progress in each subject

### Managing Content

- Delete subjects, topics, or subtopics using the delete icons
- Expand/collapse subtopics list when there are many subtopics

## Project Structure

- `StudyTracker.tsx`: Main component that handles state and renders the application
- `AddSubjectForm.tsx`: Component for adding new subjects
- `AddTopicForm.tsx`: Component for adding new topics to subjects
- `AddSubtopicForm.tsx`: Component for adding subtopics to topics
- `SubjectCard.tsx`: Component for displaying a subject card with its topics
- `TopicItem.tsx`: Component for displaying a topic with its subtopics

## Data Persistence

The application uses the browser's localStorage to save your study tracker data, ensuring your progress is saved between sessions.

## Responsive Design

The interface adapts to various screen sizes:
- Mobile view includes a collapsible menu for input forms
- Desktop view displays forms side by side for efficient use of space
- Cards adjust their layout based on available screen real estate

## Future Enhancements

- User accounts and cloud synchronization
- Study session timer
- Priority indicators for topics
- Due date tracking
- Notes and resource links for topics

---

Created with 💜 for by [Kishalay](https://personal-portfolio-wheat-kappa.vercel.app/)
