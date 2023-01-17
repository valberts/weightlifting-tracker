import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
)

import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2'

export default function Graph(props) {
    const { currentlySelectedExercise } = props
    const data = !currentlySelectedExercise
        ? {
              labels: ['No data'],
              datasets: [
                  {
                      data: [],
                      fill: {
                          target: 'origin',
                          above: 'rgba(0, 0, 255, 0.3)', // Area will be blue above the origin
                          below: 'rgba(0, 0, 255, 0.3)', // And blue below the origin
                      },
                  },
              ],
          }
        : {
              labels: ['January', 'February', 'March', 'April', 'May'],
              datasets: [
                  {
                      data: [0.1, 0.4, 0.2, 0.3, 0.7],
                      fill: {
                          target: 'origin',
                          above: 'rgba(0, 0, 255, 0.3)', // Area will be blue above the origin
                          below: 'rgba(0, 0, 255, 0.3)', // And blue below the origin
                      },
                  },
              ],
          }
    const options = !currentlySelectedExercise
        ? {
              plugins: {
                  legend: {
                      display: false,
                  },
              },
              elements: {
                  lines: {
                      tension: 0,
                      borderWidth: 2,
                      borderColor: 'rgba(47,97,68,1)',
                      fill: 'start',
                      backgroundColor: 'rgba(47,97,68,0.3)',
                  },
                  point: {
                      radius: 0,
                      hitRadius: 0,
                  },
              },
              scales: {
                  xAxis: {
                      display: false,
                  },
                  yAxis: {
                      display: false,
                  },
              },
          }
        : {
              plugins: {
                  legend: {
                      display: false,
                  },
                  title: {
                      display: true,
                      text: currentlySelectedExercise,
                  },
              },
              elements: {
                  lines: {
                      tension: 0,
                      borderWidth: 2,
                      borderColor: 'rgba(47,97,68,1)',
                      fill: 'start',
                      backgroundColor: 'rgba(47,97,68,0.3)',
                  },
                  point: {
                      radius: 0,
                      hitRadius: 0,
                  },
              },
              scales: {
                  xAxis: {
                      display: false,
                  },
                  yAxis: {
                      display: false,
                  },
              },
          }

    return (
        <div>
            <Line data={data} width={1000} height={400} options={options} />
        </div>
    )
}
