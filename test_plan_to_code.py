import json
from plan_to_code import generate_code_from_plan

# Load the sample plan you saved
with open("sample_plan.json", "r", encoding="utf-8") as f:
    plan = json.load(f)

print("📋 Loaded Plan:")
print(json.dumps(plan, indent=2))

print("\n⏳ Generating code from plan...")
code = generate_code_from_plan(plan)

if code:
    print("\n✅ Code generated (first 500 chars):\n")
    print(code[:500])  # show first part so terminal doesn't blow up

    # Save it for testing
    with open("generated_main.py", "w", encoding="utf-8") as f:
        f.write(code)
    print("\n💾 Saved code to generated_main.py")
else:
    print("❌ No code generated.")
