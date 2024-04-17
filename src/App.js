const MyUtils = require("../Utils/MyUtils");

class App {
  constructor() {
    this.console = MyUtils.Console;
  }

  async play() {
    this.console.print("업다운 게임을 시작합니다.");

    const version = await this.getGameVersion();

    const answer = this.generateAnswer(version);

    this.console.print(version === "1" ? "숫자를 입력해주세요(1 ~ 100) : " : "영어를 입력해주세요(A ~ Z) : ");

    let attempt = 0;
    while (true) {
      let input;
      if (version === "1") {
        input = await this.getUserInputNumber();
      } else if (version === "2") {
        input = await this.getUserInputChar();
      }
      attempt++;
      if (input === answer) {
        this.console.print("정답!");
        break;
      } else if (input < answer) {
        this.console.print("UP");
      } else {
        this.console.print("DOWN");
      }
    }

    this.console.print("시도한 횟수 : " + attempt + "회");
  }

  async getGameVersion() {
    this.console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    const version = await this.console.readLineAsync();
    if (version !== "1" && version !== "2") {
      throw new Error("[ERROR] 존재하지 않는 버전입니다.");
    }
    return version;
  }

  async getUserInputNumber() {
    while (true) {
      const input = await this.console.readLineAsync();
      if (isNaN(input) || !/^\d+$/.test(input.trim())) {
        this.console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
        this.console.print("숫자를 입력해주세요(1 ~ 100) : ");
        continue;
      }
      const number = parseInt(input);
      if (number < 1 || number > 100) {
        this.console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
        this.console.print("숫자를 입력해주세요(1 ~ 100) : ");
        continue;
      }
      return number;
    }
  }
  
  async getUserInputChar() {
    const input = await this.console.readLineAsync();
    const char = input.toUpperCase();
    if (!char.match(/^[A-Z]$/)) {
      throw new Error("[ERROR] 알파벳을 입력하세요.");
    }
    return input;
  }

  generateAnswer(version) {
    if (version === "1") {
      return this.generateRandomNumber();
    } else if (version === "2") {
      return this.generateRandomChar();
    }
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  generateRandomChar() {
    const ascii = Math.floor(Math.random() * 26);
    const isUpperCase = Math.random() < 0.5;
    if (isUpperCase) {
      return String.fromCharCode(ascii + 65);
        } else {
      return String.fromCharCode(ascii + 97);
    }
  }
}

module.exports = App;