

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
});
document.getElementById("toss").addEventListener("click" , ()=>{
    window.location.href = "toss.html";
});
