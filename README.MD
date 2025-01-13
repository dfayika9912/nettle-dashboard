## NELLTE Features

Machine Learning Integration: Utilizes machine learning algorithms to train a model and generate predictions.
Interactive Visualization: Employs D3.js to display predictions on a map, providing a visual representation of the data.
Data Representation Options: Offers multiple visualization options, including a bar chart and a table, to facilitate easy understanding of the predictions.
User Input and Customization: Allows users to input a specific year and select their preferred visualization type, enabling personalized exploration of the data.

## Technologies Used

- React
- Python/Flask
- D3.js
- Material-UI


### How to use it
Enter a Year: Input a year in the designated field to view predictions for that year.
Select a Visualization Type: Choose from three visualization options:
Map: Displays predicted disasters by state.
Bar Chart: Shows predictions for each disaster type.
Table: Lists predictions for each state.
Explore the Predictions: Interact with the selected visualization to gain insights into the predicted natural disasters.

## How run it locally 

Step 1: Clone the Repository

## Bash

git clone https://github.com/dfayika9912/Nettle.git


Step 2: Install Required Software
NodeJS: Download and install the latest version of NodeJS.
Python: Install Python if it's not already installed on your machine. Ensure you have at least version 3.x.x.
Step 3: Install Dependencies
1. Client-Side Dependencies: Navigate to the client directory and run

cd natural-catastrophe-main /client
npm install
2. Server-Side Dependencies: Navigate to the server directory and run:

cd natural-catastrophe-main /server
pip install -r requirements.txt

Step 4: Start the Servers
1. Python Flask Server: Start the server by running:

python main.py

Note the URL provided in the console (e.g., http://127.0.0.1:5000).
2. React App: Start the React app by running:

npm run dev

Step 5: Configure the React App
Open src/App.jsx in the client directory.
Update the URL variable with the URL provided by the Python Flask server, including the predetermined route (e.g., const URL = "http://127.0.0.1:5000?year=";).


nettle-dashboard/
├── server/
│   ├── main.py
│   ├── model.py
│   ├── requirements.txt
│   ├── processed_data.csv
│   ├── us_disaster_declarations.csv
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BarChart.jsx
│   │   │   ├── Map.jsx
|   |   |  ├── StateTable.jsx
│   │   │   └── UserInput.jsx
│   │   ├── App.css
│   │   ├── App.jsx
|   |    ├──main.jsx
│   │   └── index.css
│   │       ├── api.ts
│   ├── package-lock.json
│   ├── package.json
├── README.md
└── .gitignore