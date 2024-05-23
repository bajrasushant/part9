import { NewDiaryEntry, Visibility, Weather } from "../types";

interface NewDiaryEntryFormProps {
  newDiaryEntry: NewDiaryEntry;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
}
const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const { newDiaryEntry, handleChange, handleSubmit } = props;
  return (
    <div>
      <h3>Add new entry </h3>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={newDiaryEntry.date}
          />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                id={v}
                name="visibility"
                onChange={handleChange}
                checked={v === newDiaryEntry.visibility}
                value={v}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          weather
          {Object.values(Weather).map((v) => (
            <label key={v}>
              <input
                type="radio"
                id={v}
                name="weather"
                onChange={handleChange}
                checked={v === newDiaryEntry.weather}
                value={v}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          comment
          <input
            type="text"
            id="comment"
            name="comment"
            onChange={handleChange}
            value={newDiaryEntry.comment}
          />
          <div>
            <input type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewDiaryEntryForm;
