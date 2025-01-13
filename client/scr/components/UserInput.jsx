import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Paper } from '@mui/material';
import '../App.css';

const UserInput = ({ view, setView, fetchData, isLoading }) => {
    const [input, setInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [history, setHistory] = useState([]); // To store user input history

    const handleUserInput = (event) => {
        // Clear error if present
        if (errorMessage) setErrorMessage("");
        setInput(event.target.value);
    };

    const handleView = (event) => {
        setView(event.target.value);
    };

    const handleBtn = () => {
        // Validate the year
        if (!/^\d{4}$/.test(input)) {
            setErrorMessage("Error: Not a valid Year!");
            return;
        }

        if (input < new Date().getFullYear() || input > 2500) {
            setErrorMessage("Error: Year is out of bounds!");
            return;
        }

        // Year is valid, make the API call, clean the input, and update history
        setInput("");
        fetchData(input);
        setHistory((prevHistory) => [...prevHistory, input]); // Add input to history
    };

    const downloadReport = () => {
        // Generate a downloadable report of the history
        const reportData = history.join("\n");
        const blob = new Blob([reportData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "natural_catastrophe_risk_report.txt";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Paper className="user-input">
            <div className="nav-left">
                <div className="year-input">
                    <TextField
                        size="small"
                        label={`Enter Year`}
                        value={input}
                        error={errorMessage.length > 0}
                        onChange={handleUserInput}
                        helperText={
                            errorMessage
                                ? errorMessage
                                : `Please Enter a Year between ${new Date().getFullYear()} And 2500`
                        }
                    />
                    <Button disabled={isLoading} variant="contained" onClick={handleBtn}>
                        Predict
                    </Button>
                </div>

                <FormControl className="mui-input" size="small">
                    <InputLabel id="demo-simple-select-label">View</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={view}
                        label="View"
                        onChange={handleView}
                    >
                        <MenuItem value={"Avg"}>Avg</MenuItem>
                        <MenuItem value={"Fire"}>Fire</MenuItem>
                        <MenuItem value={"Flood"}>Flood</MenuItem>
                        <MenuItem value={"Hurricane"}>Hurricane</MenuItem>
                        <MenuItem value={"Severe Storm"}>Severe Storm</MenuItem>
                        <MenuItem value={"Tornado"}>Tornado</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="nav-right">
                <Button href="#section-map">Map</Button>
                <Button href="#section-bar">Bar</Button>
                <Button href="#state_table">Table</Button>
                <Button variant="outlined" onClick={downloadReport}>
                    Download Report
                </Button>
            </div>
            <div className="history-section">
                <h3>History</h3>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </Paper>
    );
};

export default UserInput;
