let chart;
let stepsData = [];
let labels = [];

function calculatePlan() {

    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let targetWeight = parseFloat(document.getElementById("targetWeight").value);

    if (!weight || !height || !targetWeight) {
        alert("Enter all values!");
        return;
    }

    let heightInMeters = height / 100;
    let bmi = weight / (heightInMeters * heightInMeters);

    let plan = "";
    let badge = "";

    if (bmi < 18.5) {
        plan = "Gain weight: Strength training 4 days/week, 1 hour daily.";
        badge = "🏆 Beginner Lion";
    } 
    else if (bmi >= 18.5 && bmi < 25) {
        plan = "Maintain: Mixed cardio + strength 5 days/week, 45-60 mins.";
        badge = "🔥 Warrior Lion";
    } 
    else {
        plan = "Fat loss: Cardio 6 days/week, 60-75 mins daily.";
        badge = "🦁 Alpha Beast";
    }

    document.getElementById("result").innerHTML =
        "BMI: " + bmi.toFixed(2) + "<br>" + plan +
        "<br>🎯 Target: " + targetWeight + " kg";

    document.getElementById("badge").innerHTML = badge;

    generateMotivation();
}

function addSteps() {

    let steps = parseInt(document.getElementById("stepsInput").value);

    if (!steps) {
        alert("Enter steps!");
        return;
    }

    let dayNumber = labels.length + 1;

    labels.push("Day " + dayNumber);
    stepsData.push(steps);

    updateChart();

    document.getElementById("stepsInput").value = "";
}

function updateChart() {

    let ctx = document.getElementById('stepsChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Your Steps",
                data: stepsData,
                borderWidth: 3
            }]
        }
    });
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

function generateMotivation() {

    const quotes = [
        "🦁 Some lions don't wait. They dominate.",
        "🔥 Pain is temporary. Pride is forever.",
        "🦁 Train insane or remain the same.",
        "💪 Respect is earned in silence.",
        "🦁 Be the alpha of your life."
    ];

    let random = Math.floor(Math.random() * quotes.length);

    document.getElementById("motivationText").innerText = quotes[random];
}
