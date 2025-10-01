import time
import random

# 1. Import necessary standard libraries: `time` for timing and `random` for simulating events. (Already done above)

# 2. Define constants for game parameters
GAME_DURATION_SECONDS = 8  # Automatic demo mode runs for this duration (e.g., 5-10 seconds)
BEAT_INTERVAL_SECONDS = 1  # Fruit appears on each beat, e.g., 1 second per beat
PERFECT_SCORE = 10         # Points awarded for a 'perfect' chop
IMPERFECT_SCORE = 0        # Points awarded for 'early' or 'late' chops

# 3. Initialize game state variables
total_score = 0
perfect_chops = 0
imperfect_chops = 0
beat_count = 0             # To keep track of current beat for timing

# 4. Print a 'Game Starting...' message and instructions for the automatic demo
print("Game Starting...")
print(f"Prepare for an automatic rhythm chop demo over {GAME_DURATION_SECONDS} seconds!")
print("Guillotine will chop fruit automatically. Watch the outcomes and score!")
time.sleep(2) # Give a moment for the user to read before starting

# 5. Record the `start_time` using `time.time()`
start_time = time.time()

# 6. Enter the main game loop
while time.time() - start_time < GAME_DURATION_SECONDS:
    # 7. Inside the loop: Calculate the `next_beat_time`
    # This ensures consistent rhythm regardless of processing time within the loop
    next_beat_time = start_time + ((beat_count + 1) * BEAT_INTERVAL_SECONDS)

    # 8. Wait until the `next_beat_time` to maintain rhythm
    sleep_duration = next_beat_time - time.time()
    if sleep_duration > 0:
        time.sleep(sleep_duration)

    beat_count += 1 # Increment beat count for the next iteration

    # Ensure we don't process a beat if the game duration has already passed
    if time.time() - start_time >= GAME_DURATION_SECONDS:
        break

    # 9. Print a message indicating a 'Fruit appears!'
    print("\nFruit appears!")

    # 10. Simulate guillotine timing: Use `random.choice` to determine chop accuracy
    chop_accuracy = random.choice(['perfect', 'early', 'late'])

    # 11. Based on accuracy, update `total_score`, `perfect_chops`, or `imperfect_chops` accordingly
    # 12. Print the outcome of the chop and the current score
    if chop_accuracy == 'perfect':
        total_score += PERFECT_SCORE
        perfect_chops += 1
        print(f"Perfect Chop! (+{PERFECT_SCORE} points)")
    else: # 'early' or 'late'
        total_score += IMPERFECT_SCORE
        imperfect_chops += 1
        print(f"{chop_accuracy.capitalize()} Chop! (+{IMPERFECT_SCORE} points)")

    print(f"Current Score: {total_score}")

# 13. After the loop, print a 'Game Over!' message
print("\nGame Over!")
time.sleep(1) # Pause briefly before showing summary

# 14. Print a final summary
print("--- Final Summary ---")
print(f"Total Score: {total_score}")
print(f"Perfect Chops: {perfect_chops}")
print(f"Imperfect Chops (Early/Late): {imperfect_chops}")
print("Thank you for playing!")