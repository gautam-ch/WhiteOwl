document
    .getElementById("startup-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const userName = document.getElementById("userName").value;
        const startupName = document.getElementById("startupName").value;
        const startupDetails =
            document.getElementById("startupDetails").value;
        console.log(userName, startupName, startupDetails);
        const responseDiv = document.getElementById("response");
        responseDiv.textContent = "";

        try {
            const response = await fetch("http://localhost:3003/startup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    startupName,
                    startupDetails,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                responseDiv.textContent = "Success: " + data.message;
                responseDiv.style.color = "green";
            } else {
                responseDiv.textContent = "Error: " + data.message;
                responseDiv.style.color = "red";
            }
        } catch (error) {
            responseDiv.textContent = "Error: " + error.message;
            responseDiv.style.color = "red";
        }
    });
