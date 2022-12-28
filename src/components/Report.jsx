import React, { useState, useEffect } from "react"
import { Bar, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import axios from "axios"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement
)
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
const Report = () => {
  const navigate = useNavigate()
  const authen = async () => {
    const token = localStorage.getItem("token")
    await axios
      .post(
        "https://lazy-blue-reindeer.cyclic.app/adminauthen",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.err) {
          Swal.fire({
            icon: "error",
            title: "Token invalid!",
          }).then(() => {
            navigate("/login")
          })
        }
      })
  }
  const [score, setScore] = useState([])
  const getData = async () => {
    await axios.get("https://lazy-blue-reindeer.cyclic.app/score").then((res) => {
      setScore(res.data.results)
    })
  }
  setTimeout(() => {
    getData()
  },120000)
  useEffect(() => {
    getData()
    authen()
  }, [])

  const data = {
    labels: score.map((x) => x.name),
    datasets: [
      {
        label: `${score.length} Data Avalible`,
        data: score.map((x) => x.score),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }
  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  }
  return (
    <div>
      <div className="container">
        <h1 className="text-center">Report Chart</h1>
        <h2 className="text-center">Top 5 Score</h2>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-xl-6">
            <div style={{ width: 500 }}>
              <Bar data={data} height={400} options={options} />
            </div>
          </div>

          <div className="col col-12 col-xl-6">
            <div style={{ width: 500 }}>
              <Doughnut data={data} height={400} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
