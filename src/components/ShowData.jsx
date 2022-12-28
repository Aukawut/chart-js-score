import React,{useState,useEffect} from "react"
import axios from "axios"
import { ChakraProvider,Badge  } from '@chakra-ui/react'
const ShowData = () => {
    const [score,setScore]  = useState([])
    useEffect(() => {
        axios.get('https://lazy-blue-reindeer.cyclic.app/scoreall').then((res) => {
            setScore(res.data.results)
        })
    },[])
    const h1 ={
        fontSize:'40px',
        fontWeight:'bold'
    }
  return (
    <div className="container">
      <h1 className="text-center" style={h1}>Table Score</h1>
      <hr />
      <table className="table table-hover text-center">
        <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
    {score.map((val) => {
        return (
            <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>{val.score}</td>
                    <ChakraProvider><td>{val.score >= 50 ? <> <Badge colorScheme='green' className="animate-flicker">Pass</Badge></>
                    :<> <Badge colorScheme='red' className="animate-flicker">Not Pass</Badge></>}</td></ChakraProvider>
            </tr>
        )
    })}
           
        </tbody>
      </table>
    </div>
  )
}

export default ShowData
