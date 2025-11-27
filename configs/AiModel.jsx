const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1.0,
  maxOutputTokens: 8192,
  topP: 0.95,
  topK: 64,
  responseMimeType: "application/json"
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const GenerateCourseLayout_AI = model.startChat( {
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          { text: "Generate a course Tutorial on following details with feild as Course Name, Description, Along with Chapter Name, about, Duration "}
        ],
      },
      {
        role: "model",
parts: [
  {
    text: `'''json
    {
      "course": {
        "name": "Intro to Web Development",
        "description": "A beginner-friendly course covering the basics of HTML, CSS, and JavaScript.",
        "chapters": [
          {
            "chapter_name": "HTML Fundamentals",
            "about": "Understanding the structure and basic tags of HTML5.",
            "duration": "2 hours"
          },
          {
            "chapter_name": "Styling with CSS",
            "about": "Learning selectors, the box model, and responsive design techniques.",
            "duration": "3 hours"
          },
          {
            "chapter_name": "JavaScript Basics",
            "about": "Variables, data types, functions, and DOM manipulation.",
            "duration": "4 hours"
          }
        ],
        "category": "Web Development",
        "topic": "Web Development",
        "level": "Beginner",
        "duration": "9 hours",
        "numberOfChapters": 3
      }
    }
    '''

      Generate a course tutorial STRICTLY following the JSON structure above.
      DO NOT remove or skip any fields. The following fields MUST always be present: 
      - "category"
      - "topic"
      - "level"
      - "duration"
      - "numberOfChapters"

      Ensure the output is valid JSON only, without any extra text or commentary.`
        }
      ],

      }
    ]
  });

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  
  history: [
   {
  role: "user",
  parts: [
    {
      text: "\nExplain the concept in Detail on Topic: Python Basic, Chapter: Variables and Data Types, in JSON Format with list of array with field as title, explanation on give chapter in detail , Code Example(Code field in <precode> format) if applicable"
    },
  ],
},
{
  role: "model",
  parts: [
    {
      text: "`json\n[\n  {\n    \"title\": \"Introduction to Variables\",\n    \"explanation\": \"A **variable** is essentially a named storage location that holds a value. Think of it like a label or a box where you can store data. In Python, you create a variable the moment you first assign a value to it using the assignment operator (`=`). Python is **dynamically typed**, meaning you don't need to declare the variable's data type beforehand; the interpreter figures it out based on the assigned value. Variable names must start with a letter or an underscore (`_`) and can only contain alphanumeric characters and underscores.\",\n    \"codeExample\": \"<pre><code># Assigning a string value to a variable\\nuser_name = \\\"Alice\\\"\\n\\n# Assigning an integer value\\nuser_age = 30\\n\\n# Variables can change type\\nmy_var = 10\\nmy_var = \\\"Now I am a string\\\"\\n</code></pre>\"\n  },\n  {\n    \"title\": \"Core Python Data Types: Numeric\",\n    \"explanation\": \"Numeric types are used to store numbers. Python supports three main numeric types:\\n\\n* **int (Integers):** Whole numbers, positive or negative, without a decimal point (e.g., `10`, `-500`).\\n* **float (Floating-Point Numbers):** Numbers with a decimal point (e.g., `3.14`, `-0.001`).\\n* **complex (Complex Numbers):** Numbers written with a 'j' as the imaginary part (e.g., `1 + 2j`).\",\n    \"codeExample\": \"<pre><code>age = 25              # int\\nprice = 99.99           # float\\ncomplex_num = 5 + 3j    # complex\\n\\n# You can check the type with the type() function\\nprint(type(age))        # Output: <class 'int'>\\n</code></pre>\"\n  },\n  {\n    \"title\": \"Core Python Data Types: Text and Boolean\",\n    \"explanation\": \"These are two fundamental non-numeric data types:\\n\\n* **str (String):** Used for sequences of characters (text). Strings are enclosed in single quotes (`'...'`) or double quotes (`\\\"...\\\"`). Strings are **immutable**, meaning they cannot be changed after creation.\\n* **bool (Boolean):** Represents one of two values: **True** or **False**. Booleans are crucial for conditional logic (e.g., `if` statements) and comparisons.\",\n    \"codeExample\": \"<pre><code>message = \\\"Hello Python!\\\"  # str\\nis_active = True             # bool\\nis_expired = False            # bool\\n\\nprint(len(message))          # Output: 15\\nprint(is_active and is_expired) # Output: False\\n</code></pre>\"\n  },\n  {\n    \"title\": \"Collection Data Types (Sequences and Mappings)\",\n    \"explanation\": \"Python provides powerful collection types to store multiple values in a single variable:\\n\\n* **list:** An ordered, mutable (changeable) collection of items. Defined using square brackets (`[]`).\\n* **tuple:** An ordered, **immutable** (unchangeable) collection of items. Defined using parentheses (`()`).\\n* **dict (Dictionary):** An unordered collection of items stored as **key-value pairs**. Mutable and optimized for retrieving values based on a key. Defined using curly braces (`{}`).\\n* **set:** An unordered collection of unique items. Defined using curly braces (`{}`) or the `set()` function.\",\n    \"codeExample\": \"<pre><code>my_list = [\\\"apple\\\", 5, True]          # list\\nmy_tuple = (1, 2, 3)                  # tuple\\nmy_dict = {\\\"name\\\": \\\"Bob\\\", \\\"age\\\": 42}  # dict\\nmy_set = {1, 2, 3, 3}                 # set (will only store {1, 2, 3})\\n\\nprint(my_dict[\\\"name\\\"]) # Output: Bob\\nmy_list.append(\\\"banana\\\")\\n</code></pre>\"\n  }\n]\n`"
    },
  ],
}  ]
});