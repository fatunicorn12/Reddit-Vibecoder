import pygame

# 1. Initialize Pygame
pygame.init()

# 2. Define Game Constants
TILE_SIZE = 60
GRID_WIDTH = 8
GRID_HEIGHT = 8
SCREEN_WIDTH = GRID_WIDTH * TILE_SIZE
SCREEN_HEIGHT = GRID_HEIGHT * TILE_SIZE
FPS = 10  # Slower FPS for visible sliding movement

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (150, 150, 150)  # Empty/Lube floor
BROWN = (139, 69, 19)   # Obstacle
GREEN = (0, 200, 0)     # Exit tile
BLUE = (0, 0, 255)      # Player character
RED = (255, 0, 0)       # Game Over/Win text

# Set up the game window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Lube Slide")
clock = pygame.time.Clock()

# 3. Create Game Map
# 0: Empty/Lube, 1: Obstacle, 2: Player Start, 3: Exit
game_map_template = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0],
    [2, 0, 0, 0, 0, 0, 0, 3]
]

# 4. Implement Player State & Initializer
player_x, player_y = 0, 0
sliding_direction = 'NONE' # 'UP', 'DOWN', 'LEFT', 'RIGHT'
game_state = 'PLAYING' # 'PLAYING', 'GAME_OVER', 'WIN'

def find_player_start(game_map):
    """Finds the initial player position on the map."""
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            if game_map[y][x] == 2:
                return x, y
    return 0, 0 # Fallback if start is not found

def reset_game():
    """Resets the game state for a new session."""
    global player_x, player_y, sliding_direction, game_state
    player_x, player_y = find_player_start(game_map_template)
    sliding_direction = 'NONE'
    game_state = 'PLAYING'

# Initialize game state at the start
reset_game()

# 5. Develop Drawing Logic
def draw_game():
    """Renders all game elements to the screen."""
    screen.fill(BLACK) # Clear screen with black background

    # Draw grid tiles
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            rect = pygame.Rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
            tile_type = game_map_template[y][x]
            if tile_type == 0 or tile_type == 2: # Empty/Lube or Player Start (visually empty)
                pygame.draw.rect(screen, GRAY, rect)
            elif tile_type == 1: # Obstacle
                pygame.draw.rect(screen, BROWN, rect)
            elif tile_type == 3: # Exit
                pygame.draw.rect(screen, GREEN, rect)
            pygame.draw.rect(screen, BLACK, rect, 1) # Draw grid lines

    # Draw player character
    player_rect = pygame.Rect(player_x * TILE_SIZE, player_y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    pygame.draw.rect(screen, BLUE, player_rect)

    # Display status messages
    font = pygame.font.Font(None, 48)
    if game_state == 'GAME_OVER':
        text = font.render("GAME OVER!", True, RED)
        text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 30))
        screen.blit(text, text_rect)
        restart_text = font.render("Press R to Restart", True, RED)
        restart_text_rect = restart_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 30))
        screen.blit(restart_text, restart_text_rect)
    elif game_state == 'WIN':
        text = font.render("YOU WIN!", True, GREEN)
        text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 30))
        screen.blit(text, text_rect)
        restart_text = font.render("Press R to Restart", True, GREEN)
        restart_text_rect = restart_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 30))
        screen.blit(restart_text, restart_text_rect)
    elif sliding_direction == 'NONE':
        instruction_font = pygame.font.Font(None, 30)
        instruction_text = instruction_font.render("Use Arrow Keys to Slide", True, WHITE)
        instruction_text_rect = instruction_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - 20))
        screen.blit(instruction_text, instruction_text_rect)


# 6. Implement Movement and Collision Logic
def update_game_state():
    """Updates player position and handles collisions."""
    global player_x, player_y, sliding_direction, game_state

    if game_state != 'PLAYING' or sliding_direction == 'NONE':
        return

    # Calculate next potential position
    next_x, next_y = player_x, player_y
    if sliding_direction == 'UP':
        next_y -= 1
    elif sliding_direction == 'DOWN':
        next_y += 1
    elif sliding_direction == 'LEFT':
        next_x -= 1
    elif sliding_direction == 'RIGHT':
        next_x += 1

    # Check for off-map collision
    if not (0 <= next_x < GRID_WIDTH and 0 <= next_y < GRID_HEIGHT):
        game_state = 'GAME_OVER'
        sliding_direction = 'NONE' # Stop sliding upon collision
        return

    # Check for tile collision
    next_tile_type = game_map_template[next_y][next_x]
    if next_tile_type == 1: # Obstacle
        game_state = 'GAME_OVER'
        sliding_direction = 'NONE' # Stop sliding upon collision
        # Player visually stops *before* the collision point, so its position doesn't change here.
        return
    elif next_tile_type == 3: # Exit
        player_x, player_y = next_x, next_y # Move to exit before winning
        game_state = 'WIN'
        sliding_direction = 'NONE' # Stop sliding upon winning
        return
    else: # Empty/Lube or Player Start (which acts as empty after starting)
        player_x, player_y = next_x, next_y


# 8. Construct Main Game Loop
running = True
while running:
    # 7. Handle User Input
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if game_state == 'PLAYING' and sliding_direction == 'NONE':
                if event.key == pygame.K_UP:
                    sliding_direction = 'UP'
                elif event.key == pygame.K_DOWN:
                    sliding_direction = 'DOWN'
                elif event.key == pygame.K_LEFT:
                    sliding_direction = 'LEFT'
                elif event.key == pygame.K_RIGHT:
                    sliding_direction = 'RIGHT'
            elif event.key == pygame.K_r: # 'R' key to restart
                if game_state == 'GAME_OVER' or game_state == 'WIN':
                    reset_game()

    # Update game logic
    update_game_state()

    # Draw all elements
    draw_game()

    # Update the display
    pygame.display.flip()

    # Control frame rate
    clock.tick(FPS)

pygame.quit()