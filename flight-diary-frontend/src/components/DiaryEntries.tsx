import { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  entries: DiaryEntry[];
}
const DiaryEntries = (props: DiaryEntriesProps) => {
  const diaryEntries = props.entries;
  return (
    <>
      {diaryEntries.map((diaryEntry: DiaryEntry) => (
        <div key={diaryEntry.id}>
          <h4>{diaryEntry.date}</h4>
          <p>visibility {diaryEntry.visibility}</p>
          <p>weather {diaryEntry.weather}</p>
        </div>
      ))}
    </>
  );
};

export default DiaryEntries;
