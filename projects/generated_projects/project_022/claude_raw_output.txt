import random
import sys

class CashGuiltGame:
    def __init__(self):
        self.cash = 0
        self.guilt = 0
        self.target_cash = 600
        self.max_guilt = 100
        self.high_score = 0
        self.current_score = 0
        
        self.actions = [
            {"name": "Steal Tablet", "cash_effect": 150, "guilt_effect": 40},
            {"name": "Do Honest Work", "cash_effect": 50, "guilt_effect": 0},
            {"name": "Beg for Money", "cash_effect": 30, "guilt_effect": 10},
            {"name": "Pickpocket Stranger", "cash_effect": 80, "guilt_effect": 25},
            {"name": "Return Lost Wallet (for reward)", "cash_effect": 40, "guilt_effect": -5},
            {"name": "Sell Personal Items", "cash_effect": 70, "guilt_effect": 5},
            {"name": "Gambling", "cash_effect": random.randint(-50, 200), "guilt_effect": 15},
            {"name": "Help Elderly (small tip)", "cash_effect": 25, "guilt_effect": -10}
        ]
    
    def reset_game(self):
        self.cash = 0
        self.guilt = 0
        self.current_score = 0
    
    def display_stats(self):
        print("\n" + "="*50)
        print("CASH & GUILT GAME")
        print("="*50)
        print(f"Cash: ${self.cash}")
        print(f"Guilt: {self.guilt}/{self.max_guilt}")
        print(f"Target: ${self.target_cash}")
        print(f"Current Score: {self.current_score}")
        print(f"High Score: {self.high_score}")
        
        # Visual guilt meter
        guilt_bar = "#" * (self.guilt // 5) + "-" * (20 - (self.guilt // 5))
        print(f"Guilt Meter: [{guilt_bar}]")
        print("-"*50)
    
    def display_actions(self):
        print("\nChoose your action:")
        for i, action in enumerate(self.actions, 1):
            cash_sign = "+" if action["cash_effect"] >= 0 else ""
            guilt_sign = "+" if action["guilt_effect"] >= 0 else ""
            print(f"{i}. {action['name']} (Cash: {cash_sign}{action['cash_effect']}, Guilt: {guilt_sign}{action['guilt_effect']})")
    
    def get_player_choice(self):
        while True:
            try:
                choice = int(input(f"\nEnter choice (1-{len(self.actions)}): "))
                if 1 <= choice <= len(self.actions):
                    return choice - 1
                else:
                    print(f"Please enter a number between 1 and {len(self.actions)}")
            except ValueError:
                print("Please enter a valid number")
    
    def apply_action(self, action_index):
        action = self.actions[action_index]
        
        # Special handling for gambling (recalculate random effect)
        if action["name"] == "Gambling":
            cash_effect = random.randint(-50, 200)
            action["cash_effect"] = cash_effect
        
        old_cash = self.cash
        old_guilt = self.guilt
        
        self.cash += action["cash_effect"]
        self.guilt += action["guilt_effect"]
        
        # Ensure guilt doesn't go below 0
        if self.guilt < 0:
            self.guilt = 0
        
        # Ensure cash doesn't go below 0
        if self.cash < 0:
            self.cash = 0
        
        # Update score based on cash gained
        if action["cash_effect"] > 0:
            self.current_score += action["cash_effect"]
        
        print(f"\nYou chose: {action['name']}")
        print(f"Cash: ${old_cash} -> ${self.cash} ({action['cash_effect']:+d})")
        print(f"Guilt: {old_guilt} -> {self.guilt} ({action['guilt_effect']:+d})")
    
    def check_suspicious_uncle_event(self):
        # 15% chance of suspicious uncle-in-law event
        if random.randint(1, 100) <= 15:
            print("\n" + "!"*50)
            print("SUSPICIOUS UNCLE-IN-LAW SPOTTED!")
            print("He's asking too many questions about your sudden wealth...")
            print("You panic and flee, losing everything!")
            print("!"*50)
            return True
        return False
    
    def check_win_condition(self):
        if self.cash >= self.target_cash:
            print("\n" + "*"*50)
            print("CONGRATULATIONS! YOU WIN!")
            print(f"You reached ${self.target_cash} with only {self.guilt} guilt!")
            print(f"Final Score: {self.current_score}")
            if self.current_score > self.high_score:
                self.high_score = self.current_score
                print("NEW HIGH SCORE!")
            print("*"*50)
            return True
        return False
    
    def check_loss_condition(self):
        if self.guilt >= self.max_guilt:
            print("\n" + "X"*50)
            print("GAME OVER!")
            print("Your guilt has become unmanageable!")
            print("You can't live with what you've done...")
            print(f"Final Cash: ${self.cash}")
            print(f"Final Score: {self.current_score}")
            print("X"*50)
            return True
        return False
    
    def play_again_prompt(self):
        while True:
            choice = input("\nDo you want to play again? (y/n): ").lower().strip()
            if choice in ['y', 'yes']:
                return True
            elif choice in ['n', 'no']:
                return False
            else:
                print("Please enter 'y' for yes or 'n' for no")
    
    def show_instructions(self):
        print("\n" + "="*60)
        print("GAME INSTRUCTIONS")
        print("="*60)
        print("OBJECTIVE: Reach $600 before your guilt becomes unmanageable!")
        print("\nRULES:")
        print("- Each action affects your Cash and Guilt")
        print("- If Guilt reaches 100, you lose!")
        print("- Watch out for the Suspicious Uncle-in-Law (15% random chance)")
        print("- Score is based on cash earned")
        print("- Some actions can reduce guilt!")
        print("\nCONTROLS:")
        print("- Enter the number of your chosen action")
        print("- Follow the prompts")
        print("="*60)
    
    def run(self):
        print("Welcome to Cash & Guilt Game!")
        self.show_instructions()
        
        while True:
            self.reset_game()
            
            # Main game loop
            while True:
                self.display_stats()
                self.display_actions()
                
                choice = self.get_player_choice()
                self.apply_action(choice)
                
                # Check for suspicious uncle event first
                if self.check_suspicious_uncle_event():
                    break
                
                # Then check win condition
                if self.check_win_condition():
                    break
                
                # Finally check loss condition
                if self.check_loss_condition():
                    break
                
                # Add some suspense
                input("\nPress Enter to continue...")
            
            # Ask if player wants to play again
            if not self.play_again_prompt():
                break
        
        print("\nThanks for playing Cash & Guilt Game!")
        print(f"Your highest score was: {self.high_score}")

# Run the game
if __name__ == "__main__":
    game = CashGuiltGame()
    game.run()