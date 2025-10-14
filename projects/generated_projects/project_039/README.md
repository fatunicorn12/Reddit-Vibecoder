# Develop a replayable text-based game where players select from progressively terrible advice options to intentionally escalate a virtual partner's anger, triggering a humorous "relationship meltdown" game-over.

A replayable text-based console game where players choose from various advice options to manage a virtual partner's escalating anger. The objective is to survive as many turns as possible before the partner's anger reaches a 'meltdown' point, triggering a game over. The game tracks turns survived and a persistent high score.

## Source Reddit Post
[View original post](https://reddit.com/r/AskMen/comments/1o1oava/which_of_these_do_you_recommend_saying_to_your/)

## Features
- Display of current anger level, turns survived, and high score.
- Presentation of multiple randomly selected advice options per turn, each with a different anger impact.
- Player input to select an advice option.
- Dynamic update of partner's anger level based on player's choice.
- Game over condition when anger level exceeds a maximum threshold (the 'relationship meltdown').
- Difficulty scaling: baseline anger increases slightly each turn, making choices more impactful over time.
- Persistent high score tracking (within the game session).
- Clean game restart functionality after a game over.

## How to Run
- Run with: `python main.py`


## Preview
![Screenshot](../../../screenshots/project_039.png)
