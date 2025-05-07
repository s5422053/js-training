import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart06";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  let data = [];
  for(let i=0;i<input.length;i++){
    let color;
    if(input[i].gender === "男性"){
      color = "blue";
    }else{
      color = "red";
    }
    data.push(
      {
        color:color,
        gender:input[i].gender,
        bmi:input[i].y/(input[i].x ** 2),
        weight:input[i].x,
        height:input[i].y
      }
    );
  }
  return data; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer06"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 06"
      Chart={Chart}
    />
  );
};

export default Lesson;
