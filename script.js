const submitBtn = document.getElementById("submit");
      const player1Input = document.getElementById("player-1");
      const player2Input = document.getElementById("player-2");
      const board = document.querySelector(".board");
      const messageDiv = document.querySelector(".message");
      const cells = document.querySelectorAll(".cell");

      let player1 = "";
      let player2 = "";
      let currentPlayer = "";
      let currentSymbol = "X";
      let boardState = Array(9).fill("");

      submitBtn.addEventListener("click", () => {
        player1 = player1Input.value.trim();
        player2 = player2Input.value.trim();

        if (player1 === "" || player2 === "") {
          alert("Please enter names for both players!");
          return;
        }

        document.querySelector(".input-section").style.display = "none";
        board.style.display = "block";

        currentPlayer = player1;
        currentSymbol = "X";
        messageDiv.textContent = `${currentPlayer}, you're up!`;
      });

      cells.forEach((cell) => {
        cell.addEventListener("click", () => {
          const id = cell.id - 1;

          // If already filled or no names entered, ignore click
          if (boardState[id] !== "" || !player1 || !player2) return;

          boardState[id] = currentSymbol;
          cell.textContent = currentSymbol;

          if (checkWinner()) {
            messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
            disableBoard();
            return;
          }

          // Switch turns
          if (currentSymbol === "X") {
            currentSymbol = "O";
            currentPlayer = player2;
          } else {
            currentSymbol = "X";
            currentPlayer = player1;
          }

          messageDiv.textContent = `${currentPlayer}, you're up!`;
        });
      });

      function disableBoard() {
        cells.forEach((cell) => (
            cell.style.pointerEvents = "none",
            cell.style.backgroundColor ="pink"
        ));
      }

      function checkWinner() {
        const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        return winPatterns.some((pattern) => {
          const [a, b, c] = pattern;
          return (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
          );
        });
      }
