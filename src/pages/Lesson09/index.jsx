import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart09";
import instruction from "./instruction.md?raw";

/*
const convertData = (input) => {
  let count = input.length;
  let otherBorder = count / 100.0;

  let data = {children:[]};
  for(let i=0;i<input.length;i++){
    let miniExist = data.children.findIndex(d => d.name === input[i].ministry);
    if(miniExist === -1){
      data.children.push({name:input[i].ministry,children:[]});
      miniExist = data.children.length - 1;
    }

    let bureauExist = data.children[miniExist].children.findIndex(d => d.name === input[i].bureau);
    if(bureauExist === -1){
      data.children[miniExist].children.push({name:input[i].bureau,children:[]});
      bureauExist = data.children[miniExist].children.length - 1;
    }

    let departExist = data.children[miniExist].children[bureauExist].children.findIndex(d => d.name === input[i].department);
    if(departExist === -1){
      data.children[miniExist].children[bureauExist].children.push({name:input[i].department,count:1});
    }else{
      data.children[miniExist].children[bureauExist].children[departExist].count += 1;
    }
  }
  
  for(let i=0;i<data.children.length;i++){
    for(let j=0;j<data.children[i].children.length;j++){
      data.children[i].children[j].children.sort((a,b) => b.count - a.count);
      let otherCount = 0;
      for(let k=data.children[i].children[j].children.length-1; k>=0;k--){
        if(otherBorder > data.children[i].children[j].children[k].count){
          otherCount += data.children[i].children[j].children[k].count;
          data.children[i].children[j].children.pop();
        }
      }
      data.children[i].children[j].children.push({name:"その他",count:otherCount});
    }
    data.children[i].children.sort((a,b) => {
      let countA = 0;
      for(let x=0;x<a.length;x++){
        countA += a[x].count;
      }
      let countB = 0;
      for(let y=0;y<b.length;y++){
        countB += b[x].count;
      }
      return countB - countA;
    }
    )
    let otherCount = 0;
    for(let j=data.children[i].children.length-1;j>=0;j--){
      let childrenSum = 0;
      for(let k=0;k<data.children[i].children[j].children.length;k++){
        childrenSum += data.children[i].children[j].children[k].count;
      }
      if(childrenSum < otherBorder){
        otherCount += childrenSum;
        data.children[i].children.pop();
      }
    }
    data.children[i].children.push({name:"その他",count:otherCount});
  }

  data.children.sort((a,b) => {
    let sumA = 0;
    for(let i=0;i<a.children.length;i++){
      if(a.children[i].name === "その他") {
        sumA += a.children[i].count;
      }else{
        for(let j=0;j<a.children[i].children.length;j++){
          sumA += a.children[i].children[j].count;
        }
      }
    }

    let sumB = 0;
    for(let i=0;i<b.children.length;i++){
      if(b.children[i].name === "その他") {
        sumB += b.children[i].count;
      }else{
        for(let j=0;j<b.children[i].children.length;j++){
          sumB += b.children[i].children[j].count;
        }
      }
    }
    return sumB - sumA;
  })


  return data; // ここを作りましょう！
};
*/



// 上のが自分で書いたがバグがある・かつ読みにくすぎて改善することが難しくなってしまったdogshitなコード
// 下のコードは、上のコードをchatGPTに投げて修正させたもの
// 中間変数を使うのは逆に読みにくくなるかなと思っていたけど、いざ使われているのを見ると読みやすさが段違い

const convertData = (input) => {
  const totalCount = input.length;
  const otherBorder = totalCount / 100.0;

  const data = { children: [] };

  // 1) データを階層的に集計
  for (const item of input) {
    // 省庁レベル
    let miniIndex = data.children.findIndex(d => d.name === item.ministry);
    if (miniIndex === -1) {
      data.children.push({ name: item.ministry, children: [] });
      miniIndex = data.children.length - 1;
    }
    const miniNode = data.children[miniIndex];

    // 局レベル
    let bureauIndex = miniNode.children.findIndex(d => d.name === item.bureau);
    if (bureauIndex === -1) {
      miniNode.children.push({ name: item.bureau, children: [] });
      bureauIndex = miniNode.children.length - 1;
    }
    const bureauNode = miniNode.children[bureauIndex];

    // 部署レベル
    let deptIndex = bureauNode.children.findIndex(d => d.name === item.department);
    if (deptIndex === -1) {
      bureauNode.children.push({ name: item.department, count: 1 });
    } else {
      bureauNode.children[deptIndex].count += 1;
    }
  }

  // 2) "その他" 集約とソート処理
  for (const miniNode of data.children) {
    // 局レベルでの "その他"
    for (const bureauNode of miniNode.children) {
      bureauNode.children.sort((a, b) => b.count - a.count);
      let otherCount = 0;
      bureauNode.children = bureauNode.children.filter(d => {
        if (d.count < otherBorder) {
          otherCount += d.count;
          return false;
        }
        return true;
      });
      if (otherCount > 0) {
        bureauNode.children.push({ name: "その他", count: otherCount });
      }
    }

    // 省庁レベルでの "その他"
    // 各局の合計を計算
    miniNode.children.forEach(b => {
      b._total = b.children.reduce((sum, c) => sum + c.count, 0);
    });
    let otherTotal = 0;
    miniNode.children = miniNode.children.filter(b => {
      if (b._total < otherBorder) {
        otherTotal += b._total;
        return false;
      }
      return true;
    });
    if (otherTotal > 0) {
      miniNode.children.push({ name: "その他", count: otherTotal });
    }
    // 一時プロパティ削除
    miniNode.children.forEach(b => delete b._total);
  }

  // 3) 省庁レベルのソート
  data.children.sort((a, b) => {
    const sumChildren = node => node.children.reduce((sum, c) => {
      if (c.children) {
        return sum + c.children.reduce((s2, d) => s2 + d.count, 0);
      }
      return sum + c.count;
    }, 0);
    return sumChildren(b) - sumChildren(a);
  });

  return data;
};


const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer09"
      convertData={convertData}
      dataUrl="data/judgit-departments.json"
      instruction={instruction}
      title="Lesson 09"
      Chart={Chart}
    />
  );
};

export default Lesson;
