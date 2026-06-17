const form = document.getElementById("predictionForm");
const resultCard = document.getElementById("resultCard");
const predictionText = document.getElementById("predictionText");
const usageLevel = document.getElementById("usageLevel");
const suggestion = document.getElementById("suggestion");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const temperature = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;
    const date = document.getElementById("date").value;
    const hour = document.getElementById("hour").value;

    const inputData = {
        temperature: Number(temperature),
        humidity: Number(humidity),
        date: date,
        hour: Number(hour)
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        });

        const data = await response.json();

        if (response.ok) {
            resultCard.style.display = "block";

            predictionText.innerText = `Predicted Energy: ${data.predicted_energy} ${data.unit}`;
            usageLevel.innerText = `Usage Level: ${data.usage_level}`;
            suggestion.innerText = `Suggestion: ${data.suggestion}`;
        } else {
            resultCard.style.display = "block";
            predictionText.innerText = "Prediction failed";
            usageLevel.innerText = "";
            suggestion.innerText = data.error;
        }

    } catch (error) {
        resultCard.style.display = "block";
        predictionText.innerText = "Backend not connected";
        usageLevel.innerText = "";
        suggestion.innerText = "Make sure Flask backend is running on http://127.0.0.1:5000";
    }
});