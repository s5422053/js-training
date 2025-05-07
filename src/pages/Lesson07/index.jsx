import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md?raw";

const convertData = (input) => {

  let data = [
    {id:"tweet",data:[]},
    {id:"retweet",data:[]}
  ];
  for(let i=0;i<input.length;i++){
    let index;
    if(input[i].isRetweet === true){
      index = 1;
    }else{
      index = 0;
    }
    let d = new Date(input[i].createdAt);
    d.setHours(d.getHours() + 9);

    let m = d.getMonth();
    if(m < 10){
      m = "0" + m;
    }

    let day = d.getDay();
    if(day < 10){
      day = "0"+ day;
    }

    let date = d.getFullYear()+"-"+ m +"-"+ day ;

    let dateExist = -1;
    for(let j=0;j<data[index].data.length;j++){
      if(date === data[index].data[j].x){
        dateExist = j;
      }
    }
    if(dateExist === -1){
      data[index].data.push({x:date,y:1});
    }else{
      data[index].data[dateExist].y += 1;
    }
  }
  return data; // ここを作りましょう！
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
