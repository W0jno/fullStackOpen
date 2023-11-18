import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";
import Select from "react-select";

const Authors = ({ show }) => {
  const [nameOptions, setNameOptions] = useState("");
  const [born, setBorn] = useState("");
  const options = [];
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading....</div>;
  }

  result.data.allAuthors.forEach((author) =>
    options.push({
      value: author.name,
      label: author.name,
    })
  );
  const submit = (event) => {
    event.preventDefault();
    const name = nameOptions.value;
    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setBorn("");
    setNameOptions("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={nameOptions}
            onChange={setNameOptions}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
