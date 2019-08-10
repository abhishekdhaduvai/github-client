import React from 'react';
import Timestamp from './Timestamp';

function CommitDetails ({ owner, name, commit }) {
  const avatar_url = commit.author !== null ? commit.author.avatar_url : undefined;
  const authorUrl = commit.author !== null ? commit.author.url : undefined;
  return (
    <li key={commit.sha} className="commit">
      <div className="commit-message">
        <a href={`https://github.com/${owner}/${name}/commit/${commit.sha}`}>{commit.commit.message}</a>
      </div>
      <div className="commit-author">
        {<img height={"20"} src={avatar_url} className="avatar" alt="avatar" />}
        <span className="commit-meta">
          <a href={authorUrl} className="author">{commit.commit.author.name}</a> commited
          <Timestamp time={commit.commit.author.date} />
        </span>
      </div>
    </li>
  );
}

export default CommitDetails;