"use client";
import { useState, useEffect } from 'react';
import Chart from "chart.js";

import styles from './page.module.css';
import Header from '~/app/components/Header';
import Footer from '~/app/components/Footer'
import Input from '~/app/components/Input'





export default function Home() {

  var [weight, setWeight] = useState(60);
  var [height, setHeight] = useState(170);
  var [data, setData] = useState([]);

  const handdleCaculator = () => {
    var newData = []
    var today = new Date();
    newData = data;
    if(data.length >= 7) {
      newData = data;
      newData.shift();
    }
    var bmi = weight/((height/100)*(height/100));
    bmi = bmi.toFixed(1)
    newData = [...newData, {weight, height, bmi, date: `${today.getDate()}/${today.getMonth()}`}]
    setData(newData);
  };
//Local storeage get 

useEffect(()=>{
  const stored = localStorage.getItem('bmi');
  setData(stored ? JSON.parse(stored) : []);
}, [])

  // Local storage change
  useEffect(()=>{
    localStorage.setItem('bmi', JSON.stringify(data));
  }, [data])


  //Create Chart
  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: data.map(item => item.date),
        datasets: [
          {
            fill: true,
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            borderColor: "rgba(255, 255, 255, 0.8)",
            data: data.map(item => item.bmi),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [data]);

  return (
    <>
    <Header className={`${styles.header} text-center text-sky-200`}></Header>
    <main className={`${styles.main} sm:container mx-auto`}>
      <div className='flex flex-row justify-between px-64'>
        <Input lable='Cân nặng(kg)' name="Weight" type='number' value={weight} setState={setWeight}></Input>
        <Input lable='Chiều cao(cm)' name="Height" type='number' value={height} setState={setHeight}></Input>
      </div>
      <div className='text-center mt-8'>
        <button className={`${styles.button} rounded-full`} onClick={handdleCaculator}>Tính BMI</button>
      </div>
      <div className="flex-auto mt-8 px-32">
          {/* Chart */}
          <div className={styles.chartContainer}>
            <canvas id="line-chart"></canvas>
          </div>
      </div>
      <h1 className={styles.dataHeading}>Số liệu 7 ngày</h1>
      <div className='sm:container mx-auto text-center'>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Chiều cao</th>
              <th>Cân nặng</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item,index) => 
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.height}</td>
                  <td>{item.weight}</td>
                  <td>{item.bmi}</td>
                </tr>)}
          </tbody>
        </table>
      </div>
    </main>
    <Footer></Footer>
    </>
  )
}
