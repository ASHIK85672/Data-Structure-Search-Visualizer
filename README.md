# Data Structure Lab Mini Project
## Linear Search & Binary Search Visualizer

This project contains:
- `index.html` - Website structure
- `style.css` - Website design
- `script.js` - Step-by-step search visualization
- `linear_search.c` - Linear Search C program
- `binary_search.c` - Binary Search C program

## Run the Website in VS Code
1. Extract the ZIP file.
2. Open the extracted folder in VS Code.
3. Open `index.html`.
4. Right-click `index.html` and choose **Open with Live Server**.
   - If Live Server is not installed, install the extension named **Live Server**.
5. You can also double-click `index.html` to open it directly in a browser.

## Use the Website
1. Enter numbers separated by commas.
   Example: `12, 5, 8, 20, 15, 7, 30`
2. Enter the target number.
3. Click **Run Linear Search** or **Run Binary Search**.
4. Use **Next Step**, **Previous**, or **Auto Play** to see the procedure.

## Run C Programs
You need a C compiler such as GCC/MinGW.

### Linear Search
```bash
gcc linear_search.c -o linear_search
./linear_search
```

On Windows PowerShell:
```powershell
gcc linear_search.c -o linear_search.exe
.\linear_search.exe
```

### Binary Search
```bash
gcc binary_search.c -o binary_search
./binary_search
```

On Windows PowerShell:
```powershell
gcc binary_search.c -o binary_search.exe
.\binary_search.exe
```

## Mini Project Concept
- Linear Search works with any array and checks elements one by one.
- Binary Search first needs sorted data and repeatedly divides the search range in half.
