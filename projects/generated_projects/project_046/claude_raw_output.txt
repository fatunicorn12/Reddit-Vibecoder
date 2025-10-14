def get_numeric_input(prompt, input_type="float"):
    """Get numeric input from user with error handling."""
    while True:
        try:
            value = input(prompt)
            if input_type == "float":
                return float(value)
            elif input_type == "int":
                return int(value)
        except ValueError:
            print("Invalid input. Please enter a valid number.")

def calculate_hourly_rate(earnings, duration_minutes):
    """Calculate effective hourly rate."""
    duration_hours = duration_minutes / 60
    hourly_rate = earnings / duration_hours
    return hourly_rate

def main():
    """Main program loop."""
    print("=== Micro-Task Hourly Rate Calculator ===")
    print("Calculate the effective hourly rate for your micro-tasks!\n")
    
    while True:
        print("-" * 50)
        
        # Get potential earnings
        earnings = get_numeric_input("Enter the potential earnings (e.g., 2.50 for $2.50): $")
        
        # Validate earnings is positive
        while earnings <= 0:
            print("Earnings must be greater than 0.")
            earnings = get_numeric_input("Enter the potential earnings (e.g., 2.50 for $2.50): $")
        
        # Get estimated duration
        duration = get_numeric_input("Enter the estimated duration in minutes (e.g., 15): ", "float")
        
        # Validate duration is positive
        while duration <= 0:
            print("Duration must be greater than 0 minutes.")
            duration = get_numeric_input("Enter the estimated duration in minutes (e.g., 15): ", "float")
        
        # Calculate hourly rate
        hourly_rate = calculate_hourly_rate(earnings, duration)
        
        # Display result
        print(f"\n✓ The effective hourly rate for this task is: ${hourly_rate:.2f}/hour")
        
        # Additional helpful information
        if hourly_rate < 10:
            print("💡 This is below minimum wage in many areas.")
        elif hourly_rate >= 20:
            print("💰 This looks like a good rate!")
        
        # Ask if user wants to continue
        print("\n" + "-" * 50)
        while True:
            continue_choice = input("Would you like to calculate another task? (y/n): ").lower().strip()
            if continue_choice in ['y', 'yes']:
                break
            elif continue_choice in ['n', 'no']:
                print("\nThank you for using the Micro-Task Hourly Rate Calculator!")
                return
            else:
                print("Please enter 'y' for yes or 'n' for no.")

if __name__ == "__main__":
    main()