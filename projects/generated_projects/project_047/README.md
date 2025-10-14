# Develop a simple, replayable game where users are presented with short text snippets and must quickly determine if each was written by a human or an AI, aiming for a high score before making a set number of incorrect guesses.

A simple GUI game where users identify short text snippets as human or AI-generated. Players aim for a high score by making correct choices before accumulating a set number of incorrect guesses. Difficulty increases as the game progresses by reducing the time allowed per snippet.

## Source Reddit Post
[View original post](https://reddit.com/r/TrueOffMyChest/comments/1lbxglh/how_to_read_the_rules_app/)

## Features
- Display of individual text snippets for classification.
- Two choice buttons: 'Human' and 'AI'.
- Real-time display of current score.
- Tracking and display of incorrect guesses (lives system).
- Game over condition when max incorrect guesses are reached.
- Difficulty scaling: time limit per snippet decreases with score.
- Display of the current high score (persistent within the session).
- Timer for each snippet, triggering an incorrect guess if time runs out.
- Clean game restart functionality after game over.

## How to Run
- Run with: `python main.py`


## Preview
![Screenshot](../../../screenshots/project_047.png)
