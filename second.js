document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    let wickets = 0;
    let overs = 0;
    let balls = 0;
    let inning = 1;
    let targetScore = 0;

    let maxOvers = parseInt(localStorage.getItem("over")) || 2;
    let maxwicket = parseInt(localStorage.getItem("player")) || 10;
    let isInningActive = true;

    const scoreEl = document.getElementById("score");
    const wktEl = document.getElementById("wkt");
    const overEl = document.getElementById("over");
    const targetEl = document.getElementById("target");
    const inningBtn = document.getElementById("inning");
    const newGameBtn = document.getElementById("new");

    function updateDisplay() {
        scoreEl.textContent = score;
        wktEl.textContent = wickets;
        overEl.textContent = `${overs}.${balls}`;
    }
    function logBall(event) {
    const li = document.createElement("li");
    li.textContent = `Over ${overs}.${balls + 1} - ${event}`;
    logList.prepend(li);
  }

    function endInning() {
        isInningActive = false;
        if (inning === 1) {
            targetEl.textContent = "First inning over Click '2nd Inning' to continue";
        } else {
            targetEl.textContent = "🏁 Match Complete";

        }
    }

    function checkEndConditions() {
        if (wickets >= maxwicket || (overs >= maxOvers && balls === 0)) {
            endInning();
        }
    }

    document.querySelectorAll(".key").forEach((btn) => {
        const btnId = btn.getAttribute("id");
        if (btnId === "inning" || btnId === "new") return;

        btn.addEventListener("click", () => {
            if (!isInningActive) return;


            const value = btn.textContent;
            if (value === "Out") {
                wickets++;
                logBall("wicket");
            }
             else if (value === "Wide" || value === "No Ball") {
                score++;
                logBall(value)
                updateDisplay();
                return;
            } else if (!isNaN(value)) {
                score += parseInt(value);
                logBall(`${value} run`)
            }

            balls++;
            if (balls === 6) {
                overs++;
                balls = 0;
            }

            updateDisplay();

            if (inning === 2 && score >= targetScore) {
                alert("🏆 Target Achieved. Match Over!");
                endInning();
            } else {
                checkEndConditions();
            }

        });
    });

    inningBtn.addEventListener("click", () => {
        if (inning === 1 && !isInningActive) {
            inning = 2;
            targetScore = score + 1;
            score = 0;
            wickets = 0;
            overs = 0;
            balls = 0;
            isInningActive = true;
            targetEl.textContent = `Target: ${targetScore}`;
            updateDisplay();
        }
    });

    newGameBtn.addEventListener("click", () => {
        window.location = "index.html";
        localStorage.clear();
    });
    updateDisplay();
})