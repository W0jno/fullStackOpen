import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
      <Filter />
    </div>
  );
};

export default App;
