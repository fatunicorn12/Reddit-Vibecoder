import pygame
import random
import sys

# 1. Initialize Pygame
pygame.init()

# 2. Define Game Constants
# Screen dimensions
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 400

# Colors (R, G, B)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
GREY = (100, 100, 100)
YELLOW = (255, 255, 0)

# Player properties
PLAYER_WIDTH = 50
PLAYER_HEIGHT = 50
PLAYER_SPEED = 5

# Boss Attack properties
BOSS_ATTACK_WIDTH = 30
BOSS_ATTACK_HEIGHT = 30
BOSS_ATTACK_SPEED = 3  # Initial speed
STRESS_INCREASE_PER_HIT = 15

# Stress Meter properties
MAX_STRESS = 100
STRESS_BAR_HEIGHT = 20
STRESS_BAR_WIDTH = 200 # Width of the stress bar

# Game timing and difficulty
FPS = 60
INITIAL_ATTACK_INTERVAL = 1500  # milliseconds between attacks
MIN_ATTACK_INTERVAL = 400     # minimum interval
DIFFICULTY_INCREASE_RATE = 0.98 # Multiplier for attack interval every 10 seconds
DIFFICULTY_INCREASE_TIME = 10000 # Time in ms to apply difficulty increase

# Score
SCORE_INTERVAL_MS = 5000  # 1 day worked for every 5 seconds of survival

# Set up the display window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Employee Stress Management")

# Font for text
font = pygame.font.Font(None, 36)
game_over_font = pygame.font.Font(None, 48)

# Game clock
clock = pygame.time.Clock()

# 3. Game State Variables (initialized in reset_game function)
player_x = 0
player_y = 0
player_speed_x = 0
current_stress = 0
boss_attacks = []  # List of dictionaries: [{'rect': pygame.Rect, 'speed': int}]
days_worked = 0
game_over = False
last_attack_time = 0
start_time = 0
current_attack_interval = INITIAL_ATTACK_INTERVAL
last_difficulty_increase_time = 0

def reset_game():
    """Resets all game state variables to their initial values."""
    global player_x, player_y, player_speed_x, current_stress, boss_attacks, \
           days_worked, game_over, last_attack_time, start_time, \
           current_attack_interval, last_difficulty_increase_time

    player_x = (SCREEN_WIDTH - PLAYER_WIDTH) // 2
    player_y = SCREEN_HEIGHT - PLAYER_HEIGHT - 10
    player_speed_x = 0
    current_stress = 0
    boss_attacks = []
    days_worked = 0
    game_over = False
    last_attack_time = pygame.time.get_ticks()
    start_time = pygame.time.get_ticks()
    current_attack_interval = INITIAL_ATTACK_INTERVAL
    last_difficulty_increase_time = pygame.time.get_ticks()

# Initial call to set up the game
reset_game()

# 4. Create Game Loop
running = True
while running:
    # Get current time for time-based calculations
    current_time = pygame.time.get_ticks()

    # 5. Event Handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                player_speed_x = -PLAYER_SPEED
            elif event.key == pygame.K_RIGHT:
                player_speed_x = PLAYER_SPEED
            elif event.key == pygame.K_r and game_over:
                reset_game()
        if event.type == pygame.KEYUP:
            if event.key == pygame.K_LEFT and player_speed_x < 0:
                player_speed_x = 0
            elif event.key == pygame.K_RIGHT and player_speed_x > 0:
                player_speed_x = 0

    if not game_over:
        # 6. Player Movement Logic
        player_x += player_speed_x
        # Keep player within screen bounds
        if player_x < 0:
            player_x = 0
        if player_x > SCREEN_WIDTH - PLAYER_WIDTH:
            player_x = SCREEN_WIDTH - PLAYER_WIDTH

        player_rect = pygame.Rect(player_x, player_y, PLAYER_WIDTH, PLAYER_HEIGHT)

        # 7. Boss Attack Generation
        if current_time - last_attack_time > current_attack_interval:
            attack_x = random.randrange(0, SCREEN_WIDTH - BOSS_ATTACK_WIDTH)
            attack_rect = pygame.Rect(attack_x, 0, BOSS_ATTACK_WIDTH, BOSS_ATTACK_HEIGHT)
            # Make attacks slightly faster over time for difficulty
            attack_speed_multiplier = 1 + (current_time - start_time) / 60000.0 # Increase speed by 1 over 60 seconds
            boss_attacks.append({'rect': attack_rect, 'speed': BOSS_ATTACK_SPEED * attack_speed_multiplier})
            last_attack_time = current_time

        # Difficulty increase over time (more frequent attacks)
        if current_time - last_difficulty_increase_time > DIFFICULTY_INCREASE_TIME:
            current_attack_interval = max(MIN_ATTACK_INTERVAL, current_attack_interval * DIFFICULTY_INCREASE_RATE)
            last_difficulty_increase_time = current_time

        # 8. Boss Attack Movement
        for attack in boss_attacks[:]: # Iterate over a slice to allow modification
            attack['rect'].y += attack['speed']
            if attack['rect'].y > SCREEN_HEIGHT:
                boss_attacks.remove(attack)

        # 9. Collision Detection
        for attack in boss_attacks[:]:
            if player_rect.colliderect(attack['rect']):
                current_stress += STRESS_INCREASE_PER_HIT
                boss_attacks.remove(attack) # Remove collided attack
                if current_stress >= MAX_STRESS:
                    current_stress = MAX_STRESS # Cap stress at max
                    game_over = True

        # 10. Score Update
        days_worked = (current_time - start_time) // SCORE_INTERVAL_MS

    # 11. Drawing
    screen.fill(BLACK) # Clear the screen

    # Draw player
    pygame.draw.rect(screen, BLUE, player_rect)

    # Draw boss attacks
    for attack in boss_attacks:
        pygame.draw.rect(screen, RED, attack['rect'])

    # Draw stress meter
    stress_bar_x = (SCREEN_WIDTH - STRESS_BAR_WIDTH) // 2
    stress_bar_y = SCREEN_HEIGHT - STRESS_BAR_HEIGHT - 50
    # Background for stress bar
    pygame.draw.rect(screen, GREY, (stress_bar_x, stress_bar_y, STRESS_BAR_WIDTH, STRESS_BAR_HEIGHT), 2)
    # Current stress level
    stress_width = (current_stress / MAX_STRESS) * STRESS_BAR_WIDTH
    pygame.draw.rect(screen, YELLOW, (stress_bar_x, stress_bar_y, stress_width, STRESS_BAR_HEIGHT))

    # Draw 'Days Worked' score
    score_text = font.render(f"Days Worked: {days_worked}", True, WHITE)
    screen.blit(score_text, (10, 10))

    # Draw 'Game Over' message if applicable
    if game_over:
        game_over_text = game_over_font.render("GAME OVER!", True, RED)
        restart_text = font.render("Press 'R' to Restart", True, WHITE)
        screen.blit(game_over_text, ((SCREEN_WIDTH - game_over_text.get_width()) // 2, (SCREEN_HEIGHT - game_over_text.get_height()) // 2 - 30))
        screen.blit(restart_text, ((SCREEN_WIDTH - restart_text.get_width()) // 2, (SCREEN_HEIGHT - restart_text.get_height()) // 2 + 20))


    # 12. Update Display
    pygame.display.flip()

    # 13. Frame Rate Control
    clock.tick(FPS)

pygame.quit()
sys.exit()