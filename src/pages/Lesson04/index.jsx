import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart04";
import instruction from "./instruction.md?raw";

const convertData = (input) => {

  let data = [];
  for(let i=0;i<input.length;i++){
    let speciesExist = -1
    for(let j=0;j<data.length;j++){
      if(input[i].species === data[j].id){
        speciesExist = j;
      }
    }
    if(speciesExist === -1){
      data.push({id:input[i].species,data:[]});
    }else{
      data[speciesExist].data.push({x:input[i].sepalLength,y:input[i].petalWidth});
    }
  }

  return data; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer04"
      dataUrl="data/iris.json"
      convertData={convertData}
      instruction={instruction}
      title="Lesson 04"
      Chart={Chart}
    />
  );
};

export default Lesson;
