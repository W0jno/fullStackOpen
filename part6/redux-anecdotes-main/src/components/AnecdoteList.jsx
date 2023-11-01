import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer.js";
function AnecdoteList() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
  };

  const byVotes = (a, b) => b.votes - a.votes;
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
    </div>
  );
}

export default AnecdoteList;
