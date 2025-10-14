import tkinter as tk
from tkinter import ttk
import random

# Game state variables
current_score = 0
incorrect_guesses = 0
max_incorrect_guesses = 3
high_score = 0
game_active = False
current_snippet_data = None
initial_time_per_snippet = 10
time_per_snippet = initial_time_per_snippet
current_snippet_time_left = 0
snippet_timer_id = None

# Snippet data pool
snippets_pool = [
    {"text": "The sun was shining brightly as I walked to the store this morning.", "is_ai": False},
    {"text": "As an AI language model, I can help you with various tasks and questions.", "is_ai": True},
    {"text": "My grandmother's apple pie recipe has been in our family for generations.", "is_ai": False},
    {"text": "The quantum entanglement phenomenon exhibits non-local correlations between particles.", "is_ai": True},
    {"text": "I love the smell of coffee in the morning - it's the best part of waking up.", "is_ai": False},
    {"text": "Machine learning algorithms optimize parameters through iterative gradient descent.", "is_ai": True},
    {"text": "Yesterday I dropped my phone and the screen cracked. So frustrating!", "is_ai": False},
    {"text": "Natural language processing enables computers to understand human communication.", "is_ai": True},
    {"text": "The kids are playing in the backyard while I prepare dinner.", "is_ai": False},
    {"text": "Deep neural networks utilize multiple layers to extract hierarchical features.", "is_ai": True},
    {"text": "I can't believe it's already Friday! This week went by so fast.", "is_ai": False},
    {"text": "Blockchain technology provides decentralized consensus through cryptographic hashing.", "is_ai": True},
    {"text": "The movie was okay, but the popcorn was definitely overpriced.", "is_ai": False},
    {"text": "Reinforcement learning agents maximize rewards through exploration and exploitation.", "is_ai": True},
    {"text": "Traffic was terrible this morning - took me twice as long to get to work.", "is_ai": False},
]

def reset_game_state():
    global current_score, incorrect_guesses, time_per_snippet, game_active, snippets_pool
    current_score = 0
    incorrect_guesses = 0
    time_per_snippet = initial_time_per_snippet
    random.shuffle(snippets_pool)
    game_active = True
    lbl_game_message.config(text="")

def start_game():
    reset_game_state()
    update_labels()
    display_next_snippet()
    btn_start_game.config(text="Restart Game")

def update_timer():
    global current_snippet_time_left, snippet_timer_id
    if not game_active:
        return
    
    current_snippet_time_left -= 1
    lbl_time_left.config(text=f"Time: {current_snippet_time_left}s")
    
    if current_snippet_time_left <= 0:
        lbl_game_message.config(text="Time's up!", fg="red")
        global incorrect_guesses
        incorrect_guesses += 1
        window.after(1000, display_next_snippet)
    else:
        snippet_timer_id = window.after(1000, update_timer)

def display_next_snippet():
    global current_snippet_data, current_snippet_time_left, snippet_timer_id
    
    if snippet_timer_id:
        window.after_cancel(snippet_timer_id)
        snippet_timer_id = None
    
    if incorrect_guesses >= max_incorrect_guesses:
        end_game()
        return
    
    if not snippets_pool:
        # Refill the pool if empty
        snippets_pool.extend([
            {"text": "The sun was shining brightly as I walked to the store this morning.", "is_ai": False},
            {"text": "As an AI language model, I can help you with various tasks and questions.", "is_ai": True},
            {"text": "My grandmother's apple pie recipe has been in our family for generations.", "is_ai": False},
            {"text": "The quantum entanglement phenomenon exhibits non-local correlations between particles.", "is_ai": True},
            {"text": "I love the smell of coffee in the morning - it's the best part of waking up.", "is_ai": False},
            {"text": "Machine learning algorithms optimize parameters through iterative gradient descent.", "is_ai": True},
            {"text": "Yesterday I dropped my phone and the screen cracked. So frustrating!", "is_ai": False},
            {"text": "Natural language processing enables computers to understand human communication.", "is_ai": True},
            {"text": "The kids are playing in the backyard while I prepare dinner.", "is_ai": False},
            {"text": "Deep neural networks utilize multiple layers to extract hierarchical features.", "is_ai": True},
            {"text": "I can't believe it's already Friday! This week went by so fast.", "is_ai": False},
            {"text": "Blockchain technology provides decentralized consensus through cryptographic hashing.", "is_ai": True},
            {"text": "The movie was okay, but the popcorn was definitely overpriced.", "is_ai": False},
            {"text": "Reinforcement learning agents maximize rewards through exploration and exploitation.", "is_ai": True},
            {"text": "Traffic was terrible this morning - took me twice as long to get to work.", "is_ai": False},
        ])
        random.shuffle(snippets_pool)
    
    current_snippet_data = snippets_pool.pop()
    text_snippet_display.config(text=current_snippet_data['text'])
    
    update_labels()
    current_snippet_time_left = time_per_snippet
    update_timer()

def make_guess(is_human_guess):
    global current_score, incorrect_guesses, time_per_snippet, snippet_timer_id
    
    if not game_active:
        return
    
    if snippet_timer_id:
        window.after_cancel(snippet_timer_id)
        snippet_timer_id = None
    
    # Check if guess is correct
    correct = (is_human_guess and not current_snippet_data['is_ai']) or \
              (not is_human_guess and current_snippet_data['is_ai'])
    
    if correct:
        current_score += 1
        lbl_game_message.config(text="Correct!", fg="green")
        # Difficulty scaling - reduce time every 5 points
        if current_score % 5 == 0 and time_per_snippet > 3:
            time_per_snippet -= 1
    else:
        incorrect_guesses += 1
        lbl_game_message.config(text="Wrong!", fg="red")
    
    window.after(1000, display_next_snippet)

def make_human_guess():
    make_guess(True)

def make_ai_guess():
    make_guess(False)

def end_game():
    global game_active, high_score, snippet_timer_id
    game_active = False
    
    if snippet_timer_id:
        window.after_cancel(snippet_timer_id)
        snippet_timer_id = None
    
    if current_score > high_score:
        high_score = current_score
    
    lbl_game_message.config(text=f"Game Over! Your Score: {current_score}", fg="red")
    btn_start_game.config(text="Play Again")
    update_labels()

def update_labels():
    lbl_current_score.config(text=f"Score: {current_score}")
    lbl_incorrect_guesses.config(text=f"Lives: {max_incorrect_guesses - incorrect_guesses}")
    lbl_high_score.config(text=f"High Score: {high_score}")
    lbl_time_left.config(text=f"Time: {current_snippet_time_left}s")

# Initialize Tkinter window
window = tk.Tk()
window.title("Human vs AI Text Classifier")
window.geometry("800x600")
window.configure(bg="#f0f0f0")

# Create UI widgets
title_label = tk.Label(window, text="Human vs AI Text Classifier", font=("Arial", 20, "bold"), bg="#f0f0f0")
title_label.pack(pady=10)

instructions_label = tk.Label(window, text="Read each text snippet and guess if it was written by a Human or AI", 
                             font=("Arial", 12), bg="#f0f0f0")
instructions_label.pack(pady=5)

# Text snippet display
text_snippet_display = tk.Label(window, text="Click 'Start Game' to begin!", 
                               font=("Arial", 14), wraplength=700, justify="center",
                               bg="white", relief="solid", borderwidth=1, padx=20, pady=20)
text_snippet_display.pack(pady=20, padx=20, fill="x")

# Buttons frame
buttons_frame = tk.Frame(window, bg="#f0f0f0")
buttons_frame.pack(pady=20)

btn_human = tk.Button(buttons_frame, text="Human", font=("Arial", 16, "bold"), 
                     bg="#4CAF50", fg="white", padx=30, pady=10, command=make_human_guess)
btn_human.pack(side="left", padx=20)

btn_ai = tk.Button(buttons_frame, text="AI", font=("Arial", 16, "bold"), 
                  bg="#2196F3", fg="white", padx=30, pady=10, command=make_ai_guess)
btn_ai.pack(side="right", padx=20)

# Stats frame
stats_frame = tk.Frame(window, bg="#f0f0f0")
stats_frame.pack(pady=20)

lbl_current_score = tk.Label(stats_frame, text="Score: 0", font=("Arial", 14), bg="#f0f0f0")
lbl_current_score.pack(side="left", padx=20)

lbl_incorrect_guesses = tk.Label(stats_frame, text=f"Lives: {max_incorrect_guesses}", font=("Arial", 14), bg="#f0f0f0")
lbl_incorrect_guesses.pack(side="left", padx=20)

lbl_high_score = tk.Label(stats_frame, text="High Score: 0", font=("Arial", 14), bg="#f0f0f0")
lbl_high_score.pack(side="left", padx=20)

lbl_time_left = tk.Label(stats_frame, text="Time: 0s", font=("Arial", 14), bg="#f0f0f0")
lbl_time_left.pack(side="left", padx=20)

# Game message
lbl_game_message = tk.Label(window, text="", font=("Arial", 16, "bold"), bg="#f0f0f0")
lbl_game_message.pack(pady=10)

# Start game button
btn_start_game = tk.Button(window, text="Start Game", font=("Arial", 16, "bold"), 
                          bg="#FF9800", fg="white", padx=30, pady=10, command=start_game)
btn_start_game.pack(pady=20)

# Instructions at bottom
controls_label = tk.Label(window, text="Click 'Human' or 'AI' to make your guess. You have 3 lives. Time decreases as you score higher!", 
                         font=("Arial", 10), bg="#f0f0f0", fg="gray")
controls_label.pack(side="bottom", pady=10)

# Start the main loop
window.mainloop()