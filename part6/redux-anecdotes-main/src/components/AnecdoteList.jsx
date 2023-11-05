import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer.js";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
  };
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};
function AnecdoteList() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === null) {
      return anecdotes;
    }
    const regex = new RegExp(filter, "i");
    return anecdotes.filter((anecdote) => anecdote.content.match(regex));
  });
  const byVotes = (a, b) => b.votes - a.votes;
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </>
  );
}

export default AnecdoteList;
