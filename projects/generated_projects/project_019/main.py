import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions and setup
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("ATM Cash Back Exploit Simulator")

# Load font
font = pygame.font.Font(None, 36)
small_font = pygame.font.Font(None, 24)

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
GRAY = (128, 128, 128)
YELLOW = (255, 255, 0)

# Game state variables
cash_on_hand = 0
illicit_earnings = 0
days_left = 7
suspicion_level = 0
max_suspicion = 100
game_over = False
high_score = 0
CASH_BACK_AMOUNT = 100

# Bank data
banks = [
    {"name": "First National Bank", "risk": 10, "color": BLUE},
    {"name": "Metro Credit Union", "risk": 15, "color": GREEN},
    {"name": "Downtown Savings", "risk": 25, "color": YELLOW},
    {"name": "Quick Cash Bank", "risk": 35, "color": RED}
]

# Initialize bank rects
for bank in banks:
    bank["rect"] = None

def reset_game():
    global cash_on_hand, illicit_earnings, days_left, suspicion_level, game_over
    cash_on_hand = 0
    illicit_earnings = 0
    days_left = 7
    suspicion_level = 0
    game_over = False

def draw_text(text, font, color, x, y, screen):
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.x = x
    text_rect.y = y
    screen.blit(text_surface, text_rect)
    return text_rect

def draw_centered_text(text, font, color, y, screen):
    text_surface = font.render(text, True, color)
    text_rect = text_surface.get_rect()
    text_rect.centerx = SCREEN_WIDTH // 2
    text_rect.y = y
    screen.blit(text_surface, text_rect)
    return text_rect

def main():
    global cash_on_hand, illicit_earnings, days_left, suspicion_level, game_over, high_score
    
    clock = pygame.time.Clock()
    running = True
    restart_rect = None
    
    # Initialize game
    reset_game()
    
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if event.type == pygame.MOUSEBUTTONDOWN:
                mouse_pos = event.pos
                
                if game_over:
                    # Check restart button click
                    if restart_rect and restart_rect.collidepoint(mouse_pos):
                        reset_game()
                else:
                    # Check bank clicks
                    for bank in banks:
                        if bank["rect"] and bank["rect"].collidepoint(mouse_pos):
                            # Perform transaction
                            cash_on_hand += CASH_BACK_AMOUNT
                            illicit_earnings += CASH_BACK_AMOUNT
                            
                            # Increase suspicion
                            risk_increase = bank["risk"] + random.randint(1, 10)
                            suspicion_level += risk_increase
                            
                            # Decrease days
                            days_left -= 1
                            
                            # Check game over conditions
                            if suspicion_level >= max_suspicion or days_left <= 0:
                                game_over = True
                                if illicit_earnings > high_score:
                                    high_score = illicit_earnings
        
        # Clear screen
        screen.fill(BLACK)
        
        if game_over:
            # Game over screen
            draw_centered_text("GAME OVER", font, RED, 150, screen)
            
            if suspicion_level >= max_suspicion:
                draw_centered_text("You've been BLACKLISTED!", small_font, RED, 200, screen)
            else:
                draw_centered_text("Time's up!", small_font, WHITE, 200, screen)
            
            draw_centered_text(f"Final Illicit Earnings: ${illicit_earnings}", font, WHITE, 250, screen)
            draw_centered_text(f"High Score: ${high_score}", small_font, YELLOW, 300, screen)
            
            restart_rect = draw_centered_text("RESTART", font, GREEN, 400, screen)
            
        else:
            # Active game screen
            # Display stats
            draw_text(f"Cash on Hand: ${cash_on_hand}", font, WHITE, 20, 20, screen)
            draw_text(f"Total Illicit Earnings: ${illicit_earnings}", font, WHITE, 20, 60, screen)
            draw_text(f"Days Left: {days_left}", font, WHITE, 20, 100, screen)
            
            # Color suspicion level based on danger
            suspicion_color = WHITE
            if suspicion_level >= 80:
                suspicion_color = RED
            elif suspicion_level >= 50:
                suspicion_color = YELLOW
            
            draw_text(f"Suspicion Level: {suspicion_level}/{max_suspicion}", font, suspicion_color, 20, 140, screen)
            draw_text(f"High Score: ${high_score}", small_font, GRAY, 20, 180, screen)
            
            # Instructions
            draw_text("Click on a bank to exploit the cash back loophole:", small_font, WHITE, 20, 220, screen)
            
            # Display banks
            y_offset = 260
            for i, bank in enumerate(banks):
                bank_text = f"{bank['name']} (Risk: +{bank['risk']} suspicion)"
                bank_rect = draw_text(bank_text, small_font, bank["color"], 50, y_offset + i * 40, screen)
                
                # Draw clickable area
                click_rect = pygame.Rect(30, y_offset + i * 40 - 5, 700, 30)
                pygame.draw.rect(screen, GRAY, click_rect, 2)
                
                bank["rect"] = click_rect
            
            # Instructions at bottom
            draw_text("Each transaction gives you $100 but increases suspicion!", small_font, WHITE, 20, 450, screen)
            draw_text("Avoid getting blacklisted (100 suspicion) before time runs out!", small_font, WHITE, 20, 480, screen)
        
        # Update display
        pygame.display.flip()
        clock.tick(30)
    
    pygame.quit()

if __name__ == "__main__":
    main()