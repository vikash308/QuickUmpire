

// For index.html
document.addEventListener("DOMContentLoaded", () => {
    const playerInput = document.getElementById("player");
    const matchInput = document.getElementById("match");
    const submitBtn = document.getElementById("btn");

    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            const player = parseInt(playerInput.value);
            const over = parseInt(matchInput.value);

            if (!isNaN(player) && !isNaN(over)) {
                localStorage.setItem("player", player);
                localStorage.setItem("over", over);
                window.location.href = "second.html";
            } else {
                alert("Please enter valid numbers.");
            }
        });
    }

    // For second.html
    const scoreDisplay = document.getElementById("score");
    const wktDisplay = document.getElementById("wkt");
    const overDisplay = document.getElementById("over");
    const targetDisplay = document.getElementById("target");
    const inningBtn = document.getElementById("inning");
    const restart = document.getElementById("new");

    const keys = document.querySelectorAll(".key");

    let score = 0, wickets = 0, balls = 0;
    const maxOvers = localStorage.getItem("over") || 0;
    const target = parseInt(localStorage.getItem("player")) || 0;

    function updateDisplay() {
        scoreDisplay.textContent = score;
        wktDisplay.textContent = wickets;
        overDisplay.textContent = `${Math.floor(balls / 6)}.${balls % 6}`;
    }

    function increaseBall() {
        balls++;
        if (balls >= maxOvers * 6 || wickets >= 10) {
            alert("Innings Over");
            keys.forEach(btn => btn.disabled = true);
            inningBtn.disabled=false;
        }
        inningBtn.addEventListener("click", ()=>{
            keys.forEach(btn => btn.disabled = false)
            inningBtn.disabled = true;
        })
    }
    

    keys.forEach(button => {
        button.addEventListener("click", () => {
            const val = button.textContent;

            if (!val) return;

            switch (val.toLowerCase()) {
                case "out":
                    wickets++;
                    increaseBall();
                    break;
                case "wide":
                case "no ball":
                    break;
                case "no + run":
                case "wide + run":
                    score += 1;
                    break;
                case "2nd inning":
                    targetDisplay.textContent = score;
                    alert("Second innings started");
                    score = 0;
                    wickets = 0;
                    balls = 0;
                    updateDisplay();

                    break;
                default:
                    const run = parseInt(val);
                    if (!isNaN(run)) {
                        score += run;
                        increaseBall();
                    }
            }

            updateDisplay();
        });
    });

    updateDisplay();

    restart.addEventListener("click" , ()=>{
        window.location.href= "index.html";
    })

});
document.getElementById("toss").addEventListener("click" , ()=>{
    window.location.href = "toss.html";
})
