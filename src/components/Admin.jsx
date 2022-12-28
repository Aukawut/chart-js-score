import React, { useState, useEffect } from "react"
import { TextField, Button, ButtonGroup } from "@mui/material"
import Swal from "sweetalert2"
import axios from "axios"
import { ChakraProvider, Badge, Input } from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"

import Modal from "react-bootstrap/Modal"
const Admin = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [score, setScore] = useState("")
  const [name2, setName2] = useState("")
  const [score2, setScore2] = useState("")
  const [add, setAdd] = useState(false)
  const [idPadding, setIdPadding] = useState("")
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
  const reset = () => {
    setName("")
    setScore("")
  }
  const getData = async () => {
    await axios.get("https://lazy-blue-reindeer.cyclic.app/scoreall").then((res) => {
      setData(res.data.results)
    })
  }
  useEffect(() => {
    authen()
    getData()
  }, [add])
  const addScore = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    await axios
      .post(
        "https://lazy-blue-reindeer.cyclic.app/addscore",
        {
          name: name,
          score: score,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (!res.data.err) {
          add ? setAdd(false) : setAdd(true)
          Swal.fire({
            icon: "success",
            title: "Add score successfully!",
            timer: 1500,
          })

          reset()
        } else {
          Swal.fire({
            icon: "error",
            title: "Opps!",
            timer: 1500,
          })
        }
      })
  }
  const editData = (id) => {
    console.log(id)
    axios.post("https://lazy-blue-reindeer.cyclic.app/scoreperid", { id: id }).then((res) => {
      console.log(res.data.results)
      setName2(res.data.results[0].name)
      setScore2(res.data.results[0].score)
      setIdPadding(res.data.results[0].id)
      if (res.data.results.length > 0) {
        handleShow()
      }
    })
  }
  const deleteData = (id) => {
    const token = localStorage.getItem("token")
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    myHeaders.append("Content-Type", "application/json")
    const raw = JSON.stringify({
      id: id,
    })
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
    fetch("https://lazy-blue-reindeer.cyclic.app/delete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (!result.err) {
          Swal.fire({
            icon: "success",
            title: "Deleted successfully!",
            timer: 1500,
          })
          add ? setAdd(false) : setAdd(true)
        }else if(result.err && result.msg.message == 'invalid token'){
          Swal.fire({
            icon: "error",
            title: "Invalid token!",
            timer: 1500,
          }).then(() => {
            navigate('/login')
          })
        } else {
          Swal.fire({
            icon: "error",
            title: "Opps!",
            timer: 1500,
          })
        }
      })
      .catch((error) => console.log("error", error))
  }
  const h1Style = {
    fontSize: "35px",
    fontWeight: "bold",
  }
  const handleSubmitUpdate = (e) => {
    const token = localStorage.getItem("token")
    e.preventDefault()
    axios
      .post("https://lazy-blue-reindeer.cyclic.app/update", {
        name: name2,
        score: score2,
        id: idPadding,
      },{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        if(!res.data.err){
          Swal.fire({
            icon:'success',
            title:'Updated successfully!',
            timer:1500
          })
          add?setAdd(false):setAdd(true)
          handleClose()
        }else if(res.data.err && res.data.msg == 'Token invalid'){
          Swal.fire({
            icon:'error',
            title:'Token invalid!',
            timer:1500
          }).then(() => {
            navigate('/login')
          })
        }else if(res.data.err && res.data.msg.message == 'invalid token'){
          Swal.fire({
            icon:'error',
            title:'Token invalid!',
            timer:1500
          }).then(() => {
            navigate('/login')
          })
        }else{
          Swal.fire({
            icon:'error',
            title:'Opps!',
            timer:1500
          })

        }
        console.log(res.data)
      })
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmitUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Update</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChakraProvider>
              <Input placeholder="Name" className="mb-2" onChange={e => setName2(e.target.value)} value={name2} />
              <Input placeholder="Score" type="number" onChange={e => setScore2(e.target.value)} value={score2} />
            </ChakraProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="contained" type="submit">
              Updates
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <h2 className="text-center" style={h1Style}>
        ADMIN
      </h2>
      <hr />
      <div className="container mt-3">
        <div className="row">
          <div className="col col-12 col-xl-6">
            <form onSubmit={addScore}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="Name"
                autoComplete="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="score"
                label="score"
                id="score"
                autoComplete="score"
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                SEND
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
                onClick={reset}
              >
                RESET
              </Button>
            </form>
          </div>
          <div className="col col-12 col-xl-6">
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
              <table
                className="table table-hover table-striped text-center"
                style={{ high: 200 }}
              >
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((val, idx) => {
                    return (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>{val.name}</td>
                        <td>{val.score}</td>

                        <ChakraProvider>
                          <td>
                            {val.score >= 50 ? (
                              <>
                                {" "}
                                <Badge
                                  colorScheme="green"
                                  className="animate-flicker"
                                >
                                  Pass
                                </Badge>
                              </>
                            ) : (
                              <>
                                {" "}
                                <Badge
                                  colorScheme="red"
                                  className="animate-flicker"
                                >
                                  Not Pass
                                </Badge>
                              </>
                            )}
                          </td>
                        </ChakraProvider>

                        <td>
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button
                              value={val.id}
                              onClick={(e) => {
                                editData(e.target.value)
                              }}
                            >
                              EDIT
                            </Button>
                            <Button
                              color="error"
                              value={val.id}
                              onClick={(e) => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteData(e.target.value)
                                  }
                                })
                              }}
                            >
                              DEL
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Admin
