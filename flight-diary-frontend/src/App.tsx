import { useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { createNewDiaryEntry, getAllDiaryEntries } from "./diaryService";
import DiaryEntries from "./components/DiaryEntries";
import NewDiaryEntryForm from "./components/NewDiaryEntryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const [error, setError] = useState("");

  const [newDiaryEntry, setNewDiaryEntry] = useState({
    date: "",
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiaryEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    try {
      getAllDiaryEntries().then((data) => setDiaryEntries(data));
    } catch {
      setError("Error: Failed to fetch diary entries");
    }
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewDiaryEntry(newDiaryEntry)
      .then((data) => {
        if (data) {
          setDiaryEntries(diaryEntries.concat(data));
          setNewDiaryEntry({
            date: "",
            visibility: Visibility.Great,
            weather: Weather.Sunny,
            comment: "",
          });
          setError("");
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <>
      <h3>Diary Entries</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <NewDiaryEntryForm
        handleChange={handleChange}
        handleSubmit={diaryEntryCreation}
        newDiaryEntry={newDiaryEntry}
      />
      <DiaryEntries entries={diaryEntries} />
    </>
  );
}

export default App;
