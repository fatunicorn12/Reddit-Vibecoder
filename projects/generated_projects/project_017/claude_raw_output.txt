#!/usr/bin/env python3

def main():
    # Define quiz questions
    questions = [
        {
            "question": "What is the capital of France?",
            "options": ["London", "Berlin", "Paris", "Madrid"],
            "correct_answer": 2
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "options": ["Venus", "Mars", "Jupiter", "Saturn"],
            "correct_answer": 1
        },
        {
            "question": "What is 15 + 27?",
            "options": ["40", "41", "42", "43"],
            "correct_answer": 2
        },
        {
            "question": "Who wrote 'Romeo and Juliet'?",
            "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            "correct_answer": 1
        },
        {
            "question": "What is the largest mammal in the world?",
            "options": ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            "correct_answer": 1
        },
        {
            "question": "Which element has the chemical symbol 'O'?",
            "options": ["Gold", "Silver", "Oxygen", "Iron"],
            "correct_answer": 2
        },
        {
            "question": "In which year did World War II end?",
            "options": ["1944", "1945", "1946", "1947"],
            "correct_answer": 1
        },
        {
            "question": "What is the square root of 64?",
            "options": ["6", "7", "8", "9"],
            "correct_answer": 2
        },
        {
            "question": "Which ocean is the largest?",
            "options": ["Atlantic", "Indian", "Arctic", "Pacific"],
            "correct_answer": 3
        },
        {
            "question": "What is the currency of Japan?",
            "options": ["Yuan", "Yen", "Won", "Rupee"],
            "correct_answer": 1
        }
    ]
    
    # Initialize score tracking
    score = 0
    total_questions = len(questions)
    
    print("=" * 50)
    print("COMPETITIVE EXAM QUIZ")
    print("=" * 50)
    print(f"Welcome! You will be asked {total_questions} questions.")
    print("Choose the correct option by entering the number (1-4).")
    print("=" * 50)
    
    # Main quiz loop
    for i, question_data in enumerate(questions, 1):
        print(f"\nQuestion {i}/{total_questions}:")
        print(question_data["question"])
        print()
        
        # Display options
        for j, option in enumerate(question_data["options"], 1):
            print(f"{j}. {option}")
        
        # Get user input with validation
        while True:
            try:
                user_input = input("\nEnter your choice (1-4): ").strip()
                user_choice = int(user_input)
                
                if 1 <= user_choice <= len(question_data["options"]):
                    break
                else:
                    print(f"Please enter a number between 1 and {len(question_data['options'])}.")
            except ValueError:
                print("Please enter a valid number.")
        
        # Convert to 0-based index
        user_index = user_choice - 1
        correct_index = question_data["correct_answer"]
        
        # Check answer and provide feedback
        if user_index == correct_index:
            print("Correct!")
            score += 1
        else:
            correct_option = question_data["options"][correct_index]
            print(f"Incorrect. The correct answer was: {correct_option}")
        
        print("-" * 30)
    
    # Display final results
    print("\n" + "=" * 50)
    print("QUIZ COMPLETED!")
    print("=" * 50)
    print(f"You scored {score} out of {total_questions} questions.")
    
    # Calculate percentage
    percentage = (score / total_questions) * 100
    print(f"Your accuracy: {percentage:.1f}%")
    
    # Provide performance feedback
    if percentage >= 90:
        print("Excellent! Outstanding performance!")
    elif percentage >= 80:
        print("Great job! Very good performance!")
    elif percentage >= 70:
        print("Good work! Above average performance!")
    elif percentage >= 60:
        print("Fair performance. Keep practicing!")
    else:
        print("Need improvement. Keep studying and try again!")
    
    print("=" * 50)

if __name__ == "__main__":
    main()