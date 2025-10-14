import random
import os

# Global game state variables
anger_level = 0
turns_survived = 0
MAX_ANGER = 100
high_score = 0

# Advice options with anger impact values
ADVICE_OPTIONS = [
    ("Listen carefully and acknowledge their feelings", -2),
    ("Give them space to cool down", -1),
    ("Apologize sincerely", -3),
    ("Suggest talking it out calmly", -1),
    ("Offer to make their favorite meal", -2),
    ("Tell them they're overreacting", 8),
    ("Bring up their past mistakes", 12),
    ("Roll your eyes and walk away", 10),
    ("Say 'calm down' repeatedly", 9),
    ("Ignore them completely", 7),
    ("Change the subject abruptly", 6),
    ("Make a joke about the situation", 4),
    ("Defend yourself aggressively", 11),
    ("Blame them for the problem", 13),
    ("Suggest they're being too sensitive", 8),
    ("Ask what's really bothering them", -1),
    ("Give them a hug", -2),
    ("Admit you made a mistake", -3),
    ("Promise to do better", -1),
    ("Validate their concerns", -2)
]

def clear_screen():
    """Clear the console screen (optional)"""
    try:
        os.system('cls' if os.name == 'nt' else 'clear')
    except:
        print("\n" * 50)

def display_game_state():
    """Display current game state"""
    clear_screen()
    print("=" * 50)
    print("    RELATIONSHIP SURVIVAL SIMULATOR")
    print("=" * 50)
    print(f"Partner's Anger Level: {anger_level}/{MAX_ANGER}")
    print(f"Turns Survived: {turns_survived}")
    print(f"High Score: {high_score}")
    print("-" * 50)
    
    # Visual anger meter
    anger_bar = "█" * (anger_level // 5) + "░" * ((MAX_ANGER - anger_level) // 5)
    print(f"Anger Meter: [{anger_bar}]")
    print("-" * 50)

def get_random_advice_options():
    """Get 3-4 random unique advice options"""
    num_options = random.randint(3, 4)
    return random.sample(ADVICE_OPTIONS, num_options)

def get_valid_input(max_choice):
    """Get valid input from player with error handling"""
    while True:
        try:
            choice = input(f"\nEnter your choice (1-{max_choice}): ").strip()
            if not choice:
                continue
            choice_num = int(choice)
            if 1 <= choice_num <= max_choice:
                return choice_num - 1  # Return 0-based index
            else:
                print(f"Please enter a number between 1 and {max_choice}")
        except ValueError:
            print("Please enter a valid number")
        except (EOFError, KeyboardInterrupt):
            print("\nGame interrupted. Thanks for playing!")
            exit()

def game_over():
    """Handle game over condition"""
    global high_score, anger_level, turns_survived
    
    print("\n" + "!" * 50)
    print("    💥 RELATIONSHIP MELTDOWN! 💥")
    print("!" * 50)
    print(f"Your partner's anger reached {anger_level}!")
    print(f"You survived {turns_survived} turns.")
    
    if turns_survived > high_score:
        high_score = turns_survived
        print(f"🎉 NEW HIGH SCORE: {high_score}! 🎉")
    else:
        print(f"High Score: {high_score}")
    
    print("\nGame Over! Your relationship needs some work...")
    
    while True:
        try:
            play_again = input("\nPlay again? (y/n): ").strip().lower()
            if play_again in ['y', 'yes']:
                # Reset game state
                anger_level = 0
                turns_survived = 0
                return True
            elif play_again in ['n', 'no']:
                return False
            else:
                print("Please enter 'y' for yes or 'n' for no")
        except (EOFError, KeyboardInterrupt):
            print("\nThanks for playing!")
            return False

def main_game_loop():
    """Main game loop"""
    global anger_level, turns_survived
    
    print("Welcome to Relationship Survival Simulator!")
    print("Your goal: Keep your partner's anger below the meltdown point!")
    print("Choose your responses wisely...")
    
    try:
        input("\nPress Enter to start...")
    except (EOFError, KeyboardInterrupt):
        print("\nGame cancelled. Thanks for playing!")
        return
    
    while True:
        # Display current game state
        display_game_state()
        
        # Check for game over condition
        if anger_level >= MAX_ANGER:
            if not game_over():
                break
            continue
        
        # Get random advice options
        advice_options = get_random_advice_options()
        
        # Display advice options
        print("Your partner is upset! How do you respond?")
        print()
        for i, (advice, impact) in enumerate(advice_options, 1):
            print(f"{i}. {advice}")
        
        # Get player choice
        choice_index = get_valid_input(len(advice_options))
        chosen_advice, anger_impact = advice_options[choice_index]
        
        # Update anger level
        old_anger = anger_level
        anger_level += anger_impact
        
        # Implement difficulty scaling - baseline anger increase
        baseline_increase = (turns_survived // 5) + 1
        anger_level += baseline_increase
        
        # Ensure anger doesn't go below 0
        anger_level = max(0, anger_level)
        
        # Increment turns survived
        turns_survived += 1
        
        # Show result of choice
        print(f"\nYou chose: {chosen_advice}")
        if anger_impact < 0:
            print(f"✅ Good choice! Anger decreased by {abs(anger_impact)} points.")
        else:
            print(f"❌ That backfired! Anger increased by {anger_impact} points.")
        
        if baseline_increase > 0:
            print(f"⚠️  Baseline tension increased by {baseline_increase} points.")
        
        print(f"Anger level: {old_anger} → {anger_level}")
        
        try:
            input("\nPress Enter to continue...")
        except (EOFError, KeyboardInterrupt):
            print("\nGame interrupted. Thanks for playing!")
            break
    
    print("\nThanks for playing Relationship Survival Simulator!")

if __name__ == "__main__":
    main_game_loop()