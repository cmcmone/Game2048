"use strict";

let color = {
  "": "rgba(238, 228, 218, 0.35)",
  2: "#eee4da",
  4: "#eee1c9",
  8: "#f3b27a",
  16: "#f69664",
  32: "#f8563d",
  64: "#f77c5f",
  128: "#00c3dd",
  256: "#00a4be",
  512: "#00abcb",
  1024: "#00abcb",
  2048: "#00abcb",
  4096: "#005d6e",
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Game2048 {
  score = 0;
  row = 4;
  col = 4;
  arr = new Array(this.row * this.col);

  constructor() {
    this.arr.fill(0);

    for (let i = 0; i < 2; i++) {
      let pos;
      do {
        pos = getRandomInt(this.row * this.col) + 1;
      } while (this.arr[pos] != 0);

      this.arr[pos - 1] = this.generateNumber();
    }
    this.resetTable();
  }

  generateNumber() {
    return getRandomInt(10) === 0 ? 4 : 2;
  }

  resetTable() {
    for (let i = 0; i < this.arr.length; i++) {
      let element = document.querySelectorAll(".game-body table tr td")[i];
      if (this.arr[i] != 0) {
        element.innerHTML = this.arr[i];
        element.style.fontSize = "55px";
        element.style.fontWeight = "800";
        element.style.borderRradius = "5px";
        element.style.backgroundColor = color[this.arr[i]];
        element.style.cursor = "default";
      } else {
        element.innerHTML = "";
        element.removeAttribute("style");
      }
    }
    let score = document.querySelector(".game-head .score");
    score.innerHTML = this.score;
    this.gameOver();
  }

  changeValue(pos1, pos2) {
    if (this.arr[pos1] === this.arr[pos2]) {
      this.arr[pos1] *= 2;
      this.score += this.arr[pos1];
      this.arr[pos2] = 0;
    } else if (this.arr[pos1] === 0 && this.arr[pos2] !== 0) {
      this.arr[pos1] = this.arr[pos2];
      this.arr[pos2] = 0;
    }
  }

  moveUp() {
    for (let i = 0; i < this.col; i++) {
      for (let j = 1; j < this.row; j++) {
        for (let k = j - 1; k >= 0; k--) {
          this.changeValue(k * this.col + i, (k + 1) * this.col + i);
        }
      }
    }
    this.addPuzzle();
    this.resetTable();
  }

  moveDown() {
    for (let i = 0; i < this.col; i++) {
      for (let j = this.row - 1; j > 0; j--) {
        for (let k = j; k <= this.row - 1; k++) {
          this.changeValue(k * this.col + i, (k - 1) * this.col + i);
        }
      }
    }
    this.addPuzzle();
    this.resetTable();
  }

  moveLeft() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 1; j < this.col; j++) {
        for (let k = j - 1; k >= 0; k--) {
          this.changeValue(k + this.col * i, k + this.col * i + 1);
        }
      }
    }
    this.addPuzzle();
    this.resetTable();
  }

  moveRight() {
    for (let i = 0; i < this.col; i++) {
      for (let j = this.row - 1; j > 0; j--) {
        for (let k = j; k <= this.row - 1; k++) {
          this.changeValue(k + this.col * i, k + this.col * i - 1);
        }
      }
    }
    this.addPuzzle();
    this.resetTable();
  }

  addPuzzle() {
    if (!this.isFull()) {
      let pos;
      do {
        pos = getRandomInt(this.row * this.col);
      } while (this.arr[pos] != 0);
      this.arr[pos] = this.generateNumber();
    }
  }

  isFull() {
    let isFull = true;
    this.arr.forEach((element) => {
      if (element === 0) {
        isFull = false;
        return;
      }
    });
    return isFull;
  }

  canMerge() {
    for (let i = 0; i < this.arr.length; i++) {
      if (i - this.col >= 0 && this.arr[i] === this.arr[i - this.col]) {
        return true;
      }

      if (
        i + this.col <= this.arr.length &&
        this.arr[i] === this.arr[i + this.col]
      ) {
        return true;
      }

      if (i - 1 >= 0 && i % this.col != 0 && this.arr[i] === this.arr[i - 1]) {
        return true;
      }

      if (
        i + 1 <= this.arr.length &&
        (i + 1) % this.col != 0 &&
        this.arr[i] === this.arr[i + 1]
      ) {
        return true;
      }
    }
    return false;
  }

  gameOver() {
    if (!this.isFull()) {
      return false;
    }

    if (!this.canMerge()) {
      alert("Game Over!");
    }
  }
}

function init() {
  let game = new Game2048();

  let newGame = document.querySelector("#game2048 .game-head .new-game");
  newGame.addEventListener("click", init);

  document.onkeydown = function (event) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
        game.moveUp();
        break;
      case "ArrowDown":
      case "s":
        game.moveDown();
        break;
      case "ArrowLeft":
      case "a":
        game.moveLeft();
        break;
      case "ArrowRight":
      case "d":
        game.moveRight();
      default:
        break;
    }
  };
}

window.onload = init;
