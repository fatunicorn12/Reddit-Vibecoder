# A static web app (HTML/CSS/JS) that simulates moderating a subreddit by presenting mock posts and comments with rules, allowing users to practice identifying violations or approving content with immediate feedback.

A static web application (HTML/CSS/JS) designed to simulate the experience of moderating a subreddit. Users are presented with procedurally generated mock posts and comments, along with a set of active subreddit rules. The goal is to identify violations and make correct moderation decisions (Approve/Remove) to earn points. The app provides immediate visual feedback, scales difficulty, tracks scores, and includes a persistent high score feature, making it an engaging and practical training tool.

## Source Reddit Post
[View original post](https://reddit.com/r/CasualConversation/comments/1k4k6nt/rcasualconversation_is_looking_for_new_moderators/)

## Features
- Main Menu Screen: 'Start Moderating', 'How to Play', 'Rules Settings', 'High Scores' options.
- Dynamic Content Generation: Procedural creation of mock posts and comments with varied titles, bodies, authors, and metadata (upvotes, timestamp).
- Customizable Rule Sets: Users can enable/disable different pre-defined subreddit rules (e.g., 'No Personal Attacks', 'No Spam', 'Off-Topic Content') via a settings screen, persisted with localStorage.
- Interactive Moderation Interface: A dedicated display area for the current post/comment with prominent 'Approve', 'Remove', and 'Skip' action buttons.
- Intelligent Violation Identification: The system can programmatically determine if a generated post/comment violates any of the currently active rules.
- Immediate Visual Feedback: Clear 'Correct!' (green) or 'Incorrect!' (red) messages, point changes, and visual highlights on the moderated item after each decision.
- Scoring System with Streak Bonus: Points awarded for correct decisions, deducted for incorrect ones. Consecutive correct decisions increase a streak multiplier.
- Progressive Difficulty Scaling: As the player's score increases, the posts/comments present more subtle violations, rule sets become more complex, or a time limit is introduced/reduced.
- Persistent High Score Tracking: Utilizes localStorage to save and display the all-time highest score.
- Game Over Condition: Reaching a negative score threshold or exhausting a 'lives' counter results in a game over screen.
- Comprehensive Instructions/Tutorial: A 'How to Play' screen detailing objectives, scoring, rule types, and moderation actions.
- In-game 'Return to Main Menu' Functionality: Button accessible during gameplay and on the game over screen for easy navigation.

## Visual Polish
- Card-based UI with Interactive Hover Effects: Posts and comments displayed in distinct, styled cards. Action buttons and interactive elements will feature subtle lift/shadow animations on hover, indicating interactivity.
- Dynamic Decision Feedback Animations: Score changes (+/- points) will pop up and animate away from the moderated item. Correct/Incorrect decisions will trigger a quick, color-coded border flash or particle burst around the post card.
- Smooth Screen Transitions: Navigation between the Main Menu, Game, Instructions, and Settings screens will utilize elegant fade-in/out or slide-in/out CSS transitions for a fluid user experience.
- Visual Difficulty/Progress Indicator: A 'heat' meter or progress bar visually representing the current difficulty level or an impending time limit, changing colors (e.g., green to yellow to red) as difficulty increases or time depletes.
- Cohesive Themed Color Scheme & Typography: A clean, modern UI with a carefully selected, consistent color palette (e.g., dark mode with vibrant accents) and legible, professional fonts for an appealing aesthetic.

## How to Run
- Open `index.html` in your browser


## Preview
![Screenshot](screenshots/project_052.png)
