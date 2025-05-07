import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart05";
import instruction from "./instruction.md?raw";

const convertData = (input) => {
  let data1 = [];
  for(let i=0;i<input.length;i++){
    data1.push({y:Math.round(input[i].y),gender:input[i].gender});
  }
  let data2 = [];
  for(let i=0;i<data1.length;i++){
    let binExist = -1;
    for(let j=0;j<data2.length;j++){
      if(data1[i].y === data2[j].bin){
        binExist = j;
      }
    }
    if(binExist === -1){
      data2.push({bin:data1[i].y,"男性":0,"女性":0});
      if(data1[i].gender === "男性"){
        data2[data2.length-1].男性 += 1;
      }else{
        data2[data2.length-1].女性 += 1;
      }
    }else{
      if(data1[i].gender === "男性"){
        data2[binExist].男性 += 1;
      }else{
        data2[binExist].女性 += 1;
      }
    }
  }

  return data2.sort((a,b) => a.bin - b.bin); // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer05"
      convertData={convertData}
      dataUrl="data/size-and-weight.json"
      instruction={instruction}
      title="Lesson 05"
      Chart={Chart}
    />
  );
};

export default Lesson;
