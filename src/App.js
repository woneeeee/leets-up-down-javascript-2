const MyUtils = require("../Utils/MyUtils");

let input;
let attempt;
let answer;

class App {

  constructor(){
    this.version;
  }

  async play() {
    MyUtils.Console.print("업다운 게임을 시작합니다.\n");
    MyUtils.Console.print("버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ");
    this.version = await MyUtils.Console.readLineAsync();

    try{
      if(isNaN(this.version)){
        MyUtils.Console.print("[ERROR] 입력 문자의 타입이 맞지 않습니다.");
      }
      if(this.version == 1){
        answer = this.generateAnswer(this.version);
        await this.printVersion1Result();
      }
      else if(this.version == 2){
        answer = this.generateAnswer(this.version);
        await this.printVersion2Result();
      }
      else{
        throw '[ERROR] 존재하지 않는 버전입니다.';
      }
    } catch(error){
      throw new Error(`[ERROR] ${error}`);
    }
  }

  generateAnswer(version) {
    if (version == 1) {
      let correctNum = Math.floor(Math.random() * 100) + 1;
      return correctNum;
    }
    else if (version == 2) {
      let correctEng = Math.floor(Math.random() * 26) + (Math.random() > 0.5 ? 65 : 97);
      correctEng = String.fromCharCode(correctEng);
      return correctEng;
    }
  }

  async printVersion1Result() {
    let isAnswer = false;
    let minNum = 1; 
    let maxNum = 100;
    attempt = 0;
  
    while (!isAnswer) {
      try{
        MyUtils.Console.print(`숫자를 입력해주세요(${minNum} ~ ${maxNum}) : `);
        input = await MyUtils.Console.readLineAsync();
        attempt ++;
        if (isNaN(input)){
          throw `[ERROR] 입력 문자의 타입이 맞지 않습니다.`;
        }
        else{
          if(input < minNum || input > maxNum){
            throw `[ERROR] 범위 내의 숫자를 입력하세요.`;
          }
          
          else{
            if(input == answer){
              isAnswer = true;
            }
            else{
              if (input < answer){
                MyUtils.Console.print("UP");
                minNum = parseInt(input) + 1;
              }
              else{
                MyUtils.Console.print("DOWN");
                maxNum = parseInt(input) - 1;
              }
            }
          }
        }
      } catch(error){
        MyUtils.Console.print(`[ERROR] ${error}`);
      }
    }
    MyUtils.Console.print(`정답!`);
    MyUtils.Console.print(`시도한 횟수 : ${attempt}회`);
  }

  async printVersion2Result() {
    let isAnswer = false;
    let minChar = 'A';
    let maxChar = 'z';
    attempt = 0;
  
    while (!isAnswer) {
      try{
        MyUtils.Console.print(`영어를 입력해주세요(${minChar} ~ ${maxChar}) : `);
        input = await MyUtils.Console.readLineAsync();
        attempt ++;
        if (!isNaN(input)){
          throw `[ERROR] 입력 문자의 타입이 맞지 않습니다.`;
        }
        else{
          if(input < minChar || input > maxChar){
            throw `[ERROR] 범위 내의 알파벳를 입력하세요.`;
          }
          
          if(input == answer){
            isAnswer = true;
          }
          else{
            if(input < answer){
              MyUtils.Console.print("UP");
              minChar = String.fromCharCode(input.charCodeAt(0) +1);
            }
            else{
              MyUtils.Console.print("DOWN");
              maxChar = String.fromCharCode(input.charCodeAt(0)-1);
            }
          }
        }
      }
      catch(error){
        MyUtils.Console.print(`[ERROR] ${error}`);
      }
    }
    MyUtils.Console.print("정답!");
    MyUtils.Console.print(`시도한 횟수 : ${attempt}회`);
  }
          
}

module.exports = App;