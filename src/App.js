const MyUtils = require("../Utils/MyUtils");

let version = 0;

class App {
  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.\n");

    version = await this.getGameVersion();

    const answer = this.generateAnswer(version);

    await this.printResult(answer);
  }

  async printResult(answer) {
    let attempt = 0;
    let minNum = 1; 
    let maxNum = 100;
    let minChar = "A";
    let maxChar = "z";
    let result;
    let condition;
  
    while (true) {
      let input;
      if (version === "1") {
        result = await this.getUserInputNumber(minNum, maxNum, answer);
        input = result.number;
        condition = result.condition;
        
        attempt++;
        if (input === answer) {
          MyUtils.Console.print("정답!");
          break;
        } else if (condition) {
          MyUtils.Console.print("UP");
          minNum = input + 1;
        } else {
          MyUtils.Console.print("DOWN");
          maxNum = input - 1;
        }
      } else if (version === "2") {
        result = await this.getUserInputChar(minChar, maxChar, answer);
        input = result.input;
        condition = result.condition;
  
        attempt++;
        if (input === answer) {
          MyUtils.Console.print("정답!");
          break;
        } else if (condition) {
          MyUtils.Console.print("UP");
          minChar = String.fromCharCode(input.charCodeAt(0) + 1);
        } else {
          MyUtils.Console.print("DOWN");
          maxChar = String.fromCharCode(input.charCodeAt(0) - 1);
        }
      }
    }
    MyUtils.Console.print(`시도한 횟수 : ${attempt}회`);
  }

  async getGameVersion() {
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    const version = await MyUtils.Console.readLineAsync();
    if (version !== "1" && version !== "2") {
      throw new Error("[ERROR] 존재하지 않는 버전입니다.");
    }
    return version;
  }

  async getUserInputNumber(min, max, answer) {
    MyUtils.Console.print( `숫자를 입력해주세요(${min} ~ ${max}) : `);
    while (true) {
      const input = await MyUtils.Console.readLineAsync();
      if (isNaN(input) || !/^\d+$/.test(input.trim())) {
        MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
        continue;
      }
      const number = parseInt(input);
      if (number < 1 || number > 100) {
        MyUtils.Console.print("[ERROR] 범위 내의 숫자를 입력하세요.");
        continue;
      }
      else (input > min)
      
     const condition = number < answer;
      return {number, condition};
    }
  }

  async getUserInputChar(min, max, answer) {
    MyUtils.Console.print(`영어를 입력해주세요(${min} ~ ${max}) : `);
  
    while (true) {
      const input = await MyUtils.Console.readLineAsync();
      if (!input.match(/^[A-Za-z]$/)) {
        MyUtils.Console.print("[ERROR] 알파벳을 입력하세요.");
        continue;
      }
      if (min.charCodeAt(0) < input.charCodeAt(0) || max.charCodeAt(0) > input.charCodeAt(0)) {
        MyUtils.Console.print("[ERROR] 범위 내의 알파벳을 입력하세요.");
      }
      const condition = input.charCodeAt(0) < answer.charCodeAt(0);
      return {input, condition};
    }
  }
  

  generateAnswer(version) {
    if (version === "1") {
      return this.generateRandomNumber();
    } else if (version === "2") {
      return this.generateRandomChar();
    }
  }

  generateRandomNumber() {
    const correctNum = Math.floor(Math.random() * 100) + 1;
    return correctNum;
  }

  generateRandomChar() {
    const UporLow = Math.random() < 0.5 ? 65 : 97
    const correctEng = String.fromCharCode(UporLow + Math.floor(Math.random() * 26));
    return correctEng;
  }
}

module.exports = App;