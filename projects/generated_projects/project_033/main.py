import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Game states
START_SCREEN = 0
PLAYING = 1
GAME_OVER = 2

class FastFoodGame:
    def __init__(self):
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("Fast Food Reaction Game")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.Font(None, 36)
        self.small_font = pygame.font.Font(None, 24)
        
        # Game state
        self.state = START_SCREEN
        self.current_score = 0
        self.high_score = 0
        self.timer = 3.0
        self.max_timer = 3.0
        
        # Food items and their correct restaurants
        self.food_items = {
            "Big Mac": "McDonald's",
            "Whopper": "Burger King",
            "Fries": "McDonald's",
            "Chicken Nuggets": "McDonald's",
            "Onion Rings": "Burger King"
        }
        
        self.restaurants = ["McDonald's", "Burger King"]
        
        # Current round data
        self.current_item = ""
        self.current_bag = ""
        self.is_correct_match = False
        
        self.generate_new_round()
    
    def generate_new_round(self):
        # Select random item and decide if it should be correct or mismatch
        self.current_item = random.choice(list(self.food_items.keys()))
        correct_restaurant = self.food_items[self.current_item]
        
        # 50% chance for correct match
        if random.random() < 0.5:
            self.current_bag = correct_restaurant
            self.is_correct_match = True
        else:
            # Choose wrong restaurant
            wrong_restaurants = [r for r in self.restaurants if r != correct_restaurant]
            self.current_bag = random.choice(wrong_restaurants)
            self.is_correct_match = False
    
    def handle_input(self, event):
        if self.state == START_SCREEN:
            if event.type == pygame.KEYDOWN:
                self.state = PLAYING
                self.timer = self.max_timer
        
        elif self.state == PLAYING:
            if event.type == pygame.KEYDOWN:
                player_choice = None
                if event.key == pygame.K_c:
                    player_choice = True  # Correct match
                elif event.key == pygame.K_m:
                    player_choice = False  # Mismatch
                
                if player_choice is not None:
                    if player_choice == self.is_correct_match:
                        # Correct answer
                        self.current_score += 1
                        if self.current_score > self.high_score:
                            self.high_score = self.current_score
                        
                        # Increase difficulty
                        if self.current_score % 5 == 0:
                            self.max_timer = max(1.0, self.max_timer - 0.1)
                        
                        self.timer = self.max_timer
                        self.generate_new_round()
                    else:
                        # Wrong answer
                        self.state = GAME_OVER
        
        elif self.state == GAME_OVER:
            if event.type == pygame.KEYDOWN:
                self.restart_game()
    
    def update(self, dt):
        if self.state == PLAYING:
            self.timer -= dt
            if self.timer <= 0:
                self.state = GAME_OVER
    
    def restart_game(self):
        self.current_score = 0
        self.timer = 3.0
        self.max_timer = 3.0
        self.state = PLAYING
        self.generate_new_round()
    
    def draw_start_screen(self):
        self.screen.fill(WHITE)
        
        title = self.font.render("Fast Food Reaction Game", True, BLACK)
        title_rect = title.get_rect(center=(SCREEN_WIDTH//2, 200))
        self.screen.blit(title, title_rect)
        
        instructions = [
            "Match food items with correct restaurant bags!",
            "Press 'C' for Correct Match",
            "Press 'M' for Mismatch",
            "React quickly before time runs out!",
            "",
            "Press any key to start"
        ]
        
        y_pos = 300
        for instruction in instructions:
            text = self.small_font.render(instruction, True, BLACK)
            text_rect = text.get_rect(center=(SCREEN_WIDTH//2, y_pos))
            self.screen.blit(text, text_rect)
            y_pos += 30
    
    def draw_playing_screen(self):
        self.screen.fill(WHITE)
        
        # Draw current item
        item_text = self.font.render(f"Food Item: {self.current_item}", True, BLACK)
        item_rect = item_text.get_rect(center=(SCREEN_WIDTH//2, 150))
        self.screen.blit(item_text, item_rect)
        
        # Draw current bag
        bag_text = self.font.render(f"Restaurant Bag: {self.current_bag}", True, BLACK)
        bag_rect = bag_text.get_rect(center=(SCREEN_WIDTH//2, 250))
        self.screen.blit(bag_text, bag_rect)
        
        # Draw timer
        timer_color = RED if self.timer < 1.0 else BLACK
        timer_text = self.font.render(f"Time: {self.timer:.1f}s", True, timer_color)
        timer_rect = timer_text.get_rect(center=(SCREEN_WIDTH//2, 350))
        self.screen.blit(timer_text, timer_rect)
        
        # Draw scores
        score_text = self.small_font.render(f"Score: {self.current_score}", True, BLACK)
        self.screen.blit(score_text, (20, 20))
        
        high_score_text = self.small_font.render(f"High Score: {self.high_score}", True, BLACK)
        self.screen.blit(high_score_text, (20, 50))
        
        # Draw controls
        controls = [
            "Press 'C' for Correct Match",
            "Press 'M' for Mismatch"
        ]
        
        y_pos = 450
        for control in controls:
            text = self.small_font.render(control, True, BLUE)
            text_rect = text.get_rect(center=(SCREEN_WIDTH//2, y_pos))
            self.screen.blit(text, text_rect)
            y_pos += 25
    
    def draw_game_over_screen(self):
        self.screen.fill(WHITE)
        
        game_over_text = self.font.render("GAME OVER!", True, RED)
        game_over_rect = game_over_text.get_rect(center=(SCREEN_WIDTH//2, 200))
        self.screen.blit(game_over_text, game_over_rect)
        
        final_score_text = self.font.render(f"Final Score: {self.current_score}", True, BLACK)
        final_score_rect = final_score_text.get_rect(center=(SCREEN_WIDTH//2, 280))
        self.screen.blit(final_score_text, final_score_rect)
        
        high_score_text = self.font.render(f"High Score: {self.high_score}", True, GREEN)
        high_score_rect = high_score_text.get_rect(center=(SCREEN_WIDTH//2, 320))
        self.screen.blit(high_score_text, high_score_rect)
        
        restart_text = self.small_font.render("Press any key to play again", True, BLACK)
        restart_rect = restart_text.get_rect(center=(SCREEN_WIDTH//2, 400))
        self.screen.blit(restart_text, restart_rect)
    
    def draw(self):
        if self.state == START_SCREEN:
            self.draw_start_screen()
        elif self.state == PLAYING:
            self.draw_playing_screen()
        elif self.state == GAME_OVER:
            self.draw_game_over_screen()
        
        pygame.display.flip()
    
    def run(self):
        running = True
        while running:
            dt = self.clock.tick(60) / 1000.0  # Delta time in seconds
            
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                else:
                    self.handle_input(event)
            
            self.update(dt)
            self.draw()
        
        pygame.quit()
        sys.exit()

if __name__ == "__main__":
    game = FastFoodGame()
    game.run()