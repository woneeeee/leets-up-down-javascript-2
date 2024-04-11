const App = require("../src/App");
const MyUtils = require("../Utils/MyUtils");

describe("업다운", () => {
  beforeEach(() => {
    MyUtils.setUserInput("");
  });

  const mockInput = async (inputs) => {
    const inputSpy = jest.spyOn(MyUtils.Console, "readLineAsync");
    for (const input of inputs) {
      inputSpy.mockResolvedValueOnce(input);
    }
    return inputSpy;
  };

  const mockOutput = () => {
    const outputSpy = jest.spyOn(MyUtils.Console, "print");
    outputSpy.mockClear();
    return outputSpy;
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("숫자 버전 - 정상적인 게임 플레이", async () => {
    const outputSpy = mockOutput();
    jest.spyOn(App.prototype, "generateAnswer").mockReturnValue(57);

    const app = new App();
    const inputSpy = await mockInput(["1", "50", "75", "57"]);

    await app.play();

    const expectedMessages = ["UP", "DOWN", "정답!", "시도한 횟수 : 3회"];

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("영어 버전 - 정상적인 게임 플레이", async () => {
    const outputSpy = mockOutput();
    jest.spyOn(App.prototype, "generateAnswer").mockReturnValue("b");

    const app = new App();
    const inputSpy = await mockInput(["2", "a", "c", "b"]);

    await app.play();

    const expectedMessages = ["UP", "DOWN", "정답!", "시도한 횟수 : 3회"];

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("잘못된 버전 입력 - 잘못된 숫자 입력", async () => {
    const app = new App();
    const inputSpy = await mockInput(["3"]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 존재하지 않는 버전입니다."
    );

    inputSpy.mockRestore();
  });

  test("잘못된 버전 입력 - 잘못된 타입 입력", async () => {
    const app = new App();
    const inputSpy = await mockInput(["a"]);

    await expect(app.play()).rejects.toThrow(
      "[ERROR] 존재하지 않는 버전입니다."
    );

    inputSpy.mockRestore();
  });

  test("영어 버전 - 범위 밖의 알파벳 입력", async () => {
    const outputSpy = mockOutput();
    jest.spyOn(App.prototype, "generateAnswer").mockReturnValue("Z");
    const userInput = ["2", "B", "A", "Z"];
    const expectedMessages = [
      "업다운 게임을 시작합니다.\n",
      "버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ",
      "영어를 입력해주세요(A ~ z) : ",
      "UP",
      "영어를 입력해주세요(C ~ z) : ",
      "[ERROR] 범위 내의 알파벳을 입력하세요.",
      "영어를 입력해주세요(C ~ z) : ",
      "정답!",
      "시도한 횟수 : 3회",
    ];

    const app = new App();
    const inputSpy = await mockInput(userInput);
    await app.play();

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("숫자 버전 - 잘못된 타입 입력", async () => {
    const outputSpy = mockOutput();
    jest.spyOn(App.prototype, "generateAnswer").mockReturnValue(88);
    const expectedMessages = [
      "업다운 게임을 시작합니다.\n",
      "버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ",
      "숫자를 입력해주세요(1 ~ 100) : ",
      "[ERROR] 입력 문자의 타입이 맞지 않습니다.",
      "숫자를 입력해주세요(1 ~ 100) : ",
      "[ERROR] 입력 문자의 타입이 맞지 않습니다.",
      "숫자를 입력해주세요(1 ~ 100) : ",
      "UP",
      "숫자를 입력해주세요(4 ~ 100) : ",
      "DOWN",
      "숫자를 입력해주세요(4 ~ 89) : ",
      "UP",
      "숫자를 입력해주세요(51 ~ 89) : ",
      "정답!",
      "시도한 횟수 : 6회",
    ];

    const inputSpy = await mockInput(["1", "a", "ㄱ", "3", "90", "50", "88"]);
    const app = new App();
    await app.play();

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("영어 버전 - 잘못된 타입 입력", async () => {
    const outputSpy = mockOutput();
    jest.spyOn(App.prototype, "generateAnswer").mockReturnValue("b");
    const expectedMessages = [
      "업다운 게임을 시작합니다.\n",
      "버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ",
      "영어를 입력해주세요(A ~ z) : ",
      "[ERROR] 입력 문자의 타입이 맞지 않습니다.",
      "영어를 입력해주세요(A ~ z) : ",
      "UP",
      "영어를 입력해주세요(L ~ z) : ",
      "[ERROR] 입력 문자의 타입이 맞지 않습니다.",
      "영어를 입력해주세요(L ~ z) : ",
      "정답!",
      "시도한 횟수 : 4회",
    ];

    const inputSpy = await mockInput(["2", "1", "K", "ㄱ", "b"]);
    const app = new App();
    await app.play();

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("숫자 버전 - 잘못된 타입 입력", async () => {
    const outputSpy = mockOutput();
    jest.spyOn(App.prototype, "generateAnswer").mockReturnValue(88);
    const expectedMessages = [
      "업다운 게임을 시작합니다.\n",
      "버전을 입력해주세요 (숫자 버전: 1, 영어 버전: 2) : ",
      "숫자를 입력해주세요(1 ~ 100) : ",
      "[ERROR] 입력 문자의 타입이 맞지 않습니다.",
      "숫자를 입력해주세요(1 ~ 100) : ",
      "[ERROR] 입력 문자의 타입이 맞지 않습니다.",
      "숫자를 입력해주세요(1 ~ 100) : ",
      "UP",
      "숫자를 입력해주세요(4 ~ 100) : ",
      "DOWN",
      "숫자를 입력해주세요(4 ~ 89) : ",
      "UP",
      "숫자를 입력해주세요(51 ~ 89) : ",
      "정답!",
      "시도한 횟수 : 6회",
    ];

    const inputSpy = await mockInput(["1", "a", "ㄱ", "3", "90", "50", "88"]);
    const app = new App();
    await app.play();

    expectedMessages.forEach((expectedMessage) => {
      expect(outputSpy).toHaveBeenCalledWith(
        expect.stringContaining(expectedMessage)
      );
    });

    inputSpy.mockRestore();
  });

  test("숫자 버전 - 1 ~ 100 사이의 난수 생성", () => {
    const app = new App();
    for (let i = 0; i < 100; i++) {
      const answer = app.generateAnswer("1");
      expect(answer).toBeGreaterThanOrEqual(1);
      expect(answer).toBeLessThanOrEqual(100);
    }
  });

  test("영어 버전 - 대문자와 소문자 사이의 알파벳 임의 선택", () => {
    const app = new App();
    for (let i = 0; i < 100; i++) {
      const answer = app.generateAnswer("2");
      expect(answer).toMatch(/^[A-Za-z]$/);
    }
  });
});
