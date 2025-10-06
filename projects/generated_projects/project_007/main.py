import pygame
import random
import sys

# 1. Pygame Initialization and Setup
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
SCREEN = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Avoid the Entities!")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
YELLOW = (255, 255, 0)

# Game clock for frame rate control
CLOCK = pygame.time.Clock()
FPS = 60

# Fonts
font_small = pygame.font.Font(None, 36)
font_large = pygame.font.Font(None, 72)

# 2. Player Object Implementation
class Player:
    def __init__(self):
        self.size = 30
        self.color = BLUE
        self.speed = 5
        self.rect = pygame.Rect(
            SCREEN_WIDTH // 2 - self.size // 2,
            SCREEN_HEIGHT // 2 - self.size // 2,
            self.size,
            self.size
        )
        # Define 'personal space' slightly larger than the visual representation
        self.personal_space_buffer = 15 # Buffer around the player
        self.personal_space_rect = pygame.Rect(
            self.rect.left - self.personal_space_buffer,
            self.rect.top - self.personal_space_buffer,
            self.rect.width + 2 * self.personal_space_buffer,
            self.rect.height + 2 * self.personal_space_buffer
        )

    def move(self, dx, dy):
        self.rect.x += dx * self.speed
        self.rect.y += dy * self.speed

        # Keep player within screen boundaries
        if self.rect.left < 0:
            self.rect.left = 0
        if self.rect.right > SCREEN_WIDTH:
            self.rect.right = SCREEN_WIDTH
        if self.rect.top < 0:
            self.rect.top = 0
        if self.rect.bottom > SCREEN_HEIGHT:
            self.rect.bottom = SCREEN_HEIGHT

        # Update personal space rect to follow player
        self.personal_space_rect.center = self.rect.center

    def draw(self, surface):
        pygame.draw.rect(surface, self.color, self.rect)
        # Optionally draw personal space for debugging (comment out for final game)
        # pygame.draw.rect(surface, GREEN, self.personal_space_rect, 1)

# 3. Entity Management
class Entity:
    def __init__(self):
        self.size = random.randint(15, 25)
        self.color = RED
        self.speed = random.randint(2, 5)

        # Spawn entities from random points on one side
        spawn_side = random.choice(['top', 'right', 'bottom', 'left'])
        if spawn_side == 'top':
            self.rect = pygame.Rect(random.randint(0, SCREEN_WIDTH - self.size), -self.size, self.size, self.size)
            self.direction = pygame.Vector2(random.uniform(-0.5, 0.5), random.uniform(0.5, 1)).normalize()
        elif spawn_side == 'right':
            self.rect = pygame.Rect(SCREEN_WIDTH, random.randint(0, SCREEN_HEIGHT - self.size), self.size, self.size)
            self.direction = pygame.Vector2(random.uniform(-1, -0.5), random.uniform(-0.5, 0.5)).normalize()
        elif spawn_side == 'bottom':
            self.rect = pygame.Rect(random.randint(0, SCREEN_WIDTH - self.size), SCREEN_HEIGHT, self.size, self.size)
            self.direction = pygame.Vector2(random.uniform(-0.5, 0.5), random.uniform(-1, -0.5)).normalize()
        else: # left
            self.rect = pygame.Rect(-self.size, random.randint(0, SCREEN_HEIGHT - self.size), self.size, self.size)
            self.direction = pygame.Vector2(random.uniform(0.5, 1), random.uniform(-0.5, 0.5)).normalize()

    def update(self):
        self.rect.x += self.direction.x * self.speed
        self.rect.y += self.direction.y * self.speed

    def draw(self, surface):
        pygame.draw.circle(surface, self.color, self.rect.center, self.size // 2)

def reset_game():
    global player, entities, score, game_over, start_time
    player = Player()
    entities = []
    score = 0
    game_over = False
    start_time = pygame.time.get_ticks()

# Game variables
player = Player()
entities = []
score = 0
game_over = False
running = True
start_time = pygame.time.get_ticks()
entity_spawn_timer = 0
ENTITY_SPAWN_DELAY = 1000 # milliseconds

# 4. Game Loop Structure
while running:
    # 5. Game State Update (and 4. Event Handling)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if game_over and event.key == pygame.K_r:
                reset_game()

    if not game_over:
        keys = pygame.key.get_pressed()
        player_dx = 0
        player_dy = 0
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            player_dx = -1
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            player_dx = 1
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            player_dy = -1
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            player_dy = 1
        player.move(player_dx, player_dy)

        # Entity spawning
        current_time = pygame.time.get_ticks()
        if current_time - entity_spawn_timer > ENTITY_SPAWN_DELAY:
            entities.append(Entity())
            entity_spawn_timer = current_time

        # Update entity positions
        for entity in entities:
            entity.update()

        # Remove entities that move off-screen
        entities = [entity for entity in entities if
                    entity.rect.right > -50 and entity.rect.left < SCREEN_WIDTH + 50 and
                    entity.rect.bottom > -50 and entity.rect.top < SCREEN_HEIGHT + 50]

        # Update score (time survived)
        score = (current_time - start_time) // 1000

        # 6. Collision Detection
        for entity in entities:
            if entity.rect.colliderect(player.personal_space_rect):
                game_over = True
                break
    else:
        # 8. Game Over and Restart Logic - Pause entity spawning/movement
        pass # Game logic is already paused because of the 'if not game_over' condition

    # 7. Drawing and Rendering
    SCREEN.fill(BLACK) # Clear the screen

    player.draw(SCREEN)
    for entity in entities:
        entity.draw(SCREEN)

    # Render score
    score_text = font_small.render(f"Score: {score}", True, WHITE)
    SCREEN.blit(score_text, (10, 10))

    if game_over:
        game_over_text = font_large.render("Game Over!", True, WHITE)
        restart_text = font_small.render("Press R to Restart", True, WHITE)
        
        game_over_rect = game_over_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 30))
        restart_rect = restart_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 30))

        SCREEN.blit(game_over_text, game_over_rect)
        SCREEN.blit(restart_text, restart_rect)

    pygame.display.flip() # Update the full display surface

    CLOCK.tick(FPS) # Control frame rate

pygame.quit()
sys.exit()