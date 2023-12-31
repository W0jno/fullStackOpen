import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });
  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading....</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
