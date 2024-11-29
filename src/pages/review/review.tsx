import { axiosInstance } from "@apis/axiosInstance";
import React, { useState } from "react";
import styled from "styled-components";

export const ReviewPage = () => {
  const [dayDefinition, setDayDefinition] = useState("");
  const [emotionInfo, setEmotionInfo] = useState<string>(""); // textarea 상태 관리
  const [selected, setSelected] = useState("");

  const handleClick = (customType: string) => {
    setSelected(customType);
  }; // 만족 상태 관리

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmotionInfo(e.target.value); // 입력값 업데이트
  };
  const handleSubmit = async () => {
    // restId를 적절히 설정해주세요.
    const restId = 1; // 예시: ID를 실제 데이터에 맞게 변경
    const satisfaction = selected === "satisfied";

    const requestBody = {
      todayDefinition: dayDefinition,
      satisfaction: satisfaction,
      todayEmotion: emotionInfo,
    };

    try {
      const response = await axiosInstance.post(
        `/sum/today-rest/${restId}`,
        requestBody
      );
      console.log("성공적으로 전송됨:", response.data);
    } catch (error) {
      console.error("전송 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <Section>
        <Title>
          <span style={{ color: "#0487D9" }}>하루</span>의 정의
        </Title>
        <InputContainer>
          <h3>당신의 하루에 이름을 지어주세요 </h3>
          <Input
            placeholder="ex. 기쁨, 설렘, 여유"
            value={dayDefinition}
            onChange={(e) => setDayDefinition(e.target.value)}
          />
        </InputContainer>
        <ButtonGroup>
          <SatisfactionButton
            customType="satisfied"
            onClick={() => handleClick("satisfied")}
            style={
              selected === "satisfied"
                ? { backgroundColor: "#7ED957", color: "white" }
                : {}
            }
          >
            만족
          </SatisfactionButton>
          <SatisfactionButton
            customType="unsatisfied"
            onClick={() => handleClick("unsatisfied")}
            style={
              selected === "unsatisfied"
                ? { backgroundColor: "#F68B2C", color: "white" }
                : {}
            }
          >
            불만족
          </SatisfactionButton>
        </ButtonGroup>
      </Section>
      <Section>
        <Title>
          <span style={{ color: "#0487D9" }}>오늘</span>의 감정
        </Title>
        <EmotionContainer>
          <Date>11월 17일 (일)</Date>
          <TextArea
            placeholder="info"
            value={emotionInfo} // 상태를 value에 바인딩
            onChange={handleTextareaChange} // 상태 업데이트 핸들러
          />
        </EmotionContainer>
        <AddButton onClick={handleSubmit}>추가하기</AddButton>
      </Section>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 25px; /* 양쪽 여백 축소 */
  font-family: Arial, sans-serif;
  background-color: #ffffff; /* 배경색을 흰색으로 변경 */
  height: 100vh;
`;

const Section = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 16px;
  font-weight: bold;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 0.3px solid #0378a6;
  padding: 8px;
  align-items: right;
  border-radius: 10px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 14px; /* 폰트 크기 줄이기 */
  border: 1px solid;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center; /* 버튼 중앙 배치 */
`;

const SatisfactionButton = styled.button<{ customType: string }>`
  width: 320px; /* 버튼 너비 확대 */
  height: 50px; /* 버튼 높이 설정 */
  border: 2px solid;
  border-color: ${(props) =>
    props.customType === "satisfied" ? "#7ED957" : "#F68B2C"};
  color: ${(props) =>
    props.customType === "satisfied" ? "#7ED957" : "#F68B2C"};
  background-color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 30px;
  &:hover {
    background-color: ${(props) =>
      props.customType === "satisfied" ? "#7ED957" : "#F68B2C"};
    color: white;
  }
  &:first-child {
    border-radius: 30px 0 0 30px; /* 왼쪽 버튼 */
  }

  &:last-child {
    border-radius: 0 30px 30px 0; /* 오른쪽 버튼 */
  }
`;

const EmotionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  border: 1px solid #8b8b8b;
  padding: 8px;
  border-radius: 10px;
`;

const Date = styled.div`
  font-size: 25px;
  color: #555;
  padding-left: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 220px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;