import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart01";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  let objInput = [];
  /*
  for(let i=0;input.length>i;i++){
    objInput[i] = {name: input[i][0], count:input[i][1]}
  };
  */
  objInput = input.map(([name,count])=>({name: name,count: count}));
  return objInput; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer01"
      convertData={convertData}
      dataUrl="data/chs-capacity.json"
      instruction={instruction}
      title="Lesson 01"
      Chart={Chart}
    />
  );
};

export default Lesson;
