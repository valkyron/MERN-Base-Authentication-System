// add option of only Yes or NO to differently abled
// what if I had to add multiple tables like PI qualifications.. mutiple states?
// post to axios
// show project duration
// allocated jury ka kuch karna hai

// files bhi upload karni hai.. with certain restrictions (eg. excel file should be only this much allowed)

import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout';
import FileUpload from '../components/Layout/FileUpload';
import FileList from '../components/Layout/FileList';
import '../css/ProposalPage.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Layout/Spinner';
import { Form, Input, message } from 'antd';
import axios from 'axios';

const ProposalPage = () => {
  const [files, setFiles] = useState([])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

    // const [PIinfo, setPIinfo] = useState([{ fname: '', dob: '', orgAdd: '', email: '', contactNo: '', gender: '',
    //                                         orgName: '', diffAbled: '', pTitle: '', pstartDt: '', pendDt: '', psumm: '', orgcdt: ''}]);
    // const [rows, setRows] = useState([{ degree: '', year: '', subject: '', institution: '', percentage: '' }]);
    // const [formEntries, setformEntries] = useState({});
    
    // const handleAddRow = (e) => {
    //   e.preventDefault();
    //   if (rows.length >= 4) {
    //     alert('Maximum number of rows reached');
    //     return;
    //   }
    //   setRows([...rows, { degree: '', year: '', subject: '', institution: '', percentage: '' }]);
    // };
  
    // const handleDeleteRow = (index) => {
    //   const updatedRows = [...rows];
    //   updatedRows.splice(index, 1);
    //   setRows(updatedRows);
    // };

    // const handleInputChange = (index, event) => {
    //   const { name, value } = event.target;
    //   const updatedRows = [...rows];
    //   updatedRows[index] = { ...updatedRows[index], [name]: value };
    //   setRows(updatedRows);
    //   // console.log(rows);
    // };

  //next page bhejo
  const handleNextButtonClick = (values) => {
    console.log(values);
    const form = document.querySelector (".form"), 
      allInput = form.querySelectorAll(".first .input");
  
      // for (let i = 0; i < allInput.length; i++) {
        // const input = allInput[i];
        // console.log(input.name, input.value)
        // if(input.name === "diffAbled") {
        //   if(input.value !== "Yes" && input.value!=="No") {
        //     form.classList.remove("secActive");
        //     alert( "\"" + input.name + "\" has to be Yes or No");
        //     break; // Exit the loop
        //   }
        // }

        // if(input.name === "gender") {
        //   if(input.value !== "Male" && input.value!=="Female" && input.value!=="Non-Binary") {
        //     form.classList.remove("secActive");
        //     alert( "\"" + input.name + "\" can only be Male, Female, Non-Binary");
        //     break; // Exit the loop
        //   }
        // }

        // if (input.value === "") {
        //   form.classList.remove("secActive");
        //   alert( "\"" + input.placeholder + "\" is empty");
        //   break; // Exit the loop
        // }
      
        form.classList.add("secActive");
      // }
      
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveProgress = async() => {
    const form = document.querySelector (".form"), 
    allInput = form.querySelectorAll(".input");
    var formPrototype = {};

      for (let i = 0; i < allInput.length; i++) {
        const input = allInput[i];

        formPrototype[input.name] = input.value;
      }

      // for (let i = 0; i < 13; i++) {
      //   const input = allInput[ allInput.length - i - 1];
  
      //   formPrototype[input.name] = input.value;
      // }

      if(formPrototype["fullname"] === '' || formPrototype["pTitle"] === '') {
        message.error("Full Name and Project Title must be filled to save progress.");
      }

      else {
        // formPrototype["PIedQualif"] = rows;
        formPrototype["status"] = "Incomplete";
        // console.log("pppoooo",formPrototype);
        // setformEntries(formPrototype);
    
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          setLoading(true);
          const response = await axios.post('/proposals//getdraftproposals', {userid: user._id})
          if(response.data === null) {
              await axios.post("/proposals/newproposal", {...formPrototype, userid:user._id});
              message.success("Progress Saved!");
          } else {
            const updatedData = {
              ...response.data,
              ...formPrototype,
            };
            await axios.put(`/proposals/updateproposal/${updatedData._id}`, updatedData);
            message.success("Progress Saved!");
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
          message.error("Something went wrong");
        }
      }
  }

  //form submit
  const submitHandler = async () => {
    const form = document.querySelector (".form"), 
      secondFormInput = form.querySelectorAll(".second .input");
      var flag = 1;

      for (let i = 0; i < secondFormInput.length; i++) {
        const input = secondFormInput[i];

        if (input.value === "") {
          flag = 0;
          alert( "\"" + input.placeholder + "\" is empty");
          break; // Exit the loop
        }
      }

    if(flag) {
      const allInput = form.querySelectorAll(".input");
      var formPrototype = {};

      for (let i = 0; i < allInput.length; i++) {
        const input = allInput[i];

        formPrototype[input.name] = input.value;
      }

      // for (let i = 0; i < 13; i++) {
      //   const input = allInput[ allInput.length - i - 1];
  
      //   formPrototype[input.name] = input.value;
      // }
    
      // formPrototype["PIedQualif"] = rows;
      formPrototype["status"] = "Submitted";
      // setformEntries(formPrototype);

      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        await axios.post("/proposals/newproposal", {...formPrototype, userid:user._id});
        message.success("Proposal sent successfully!");
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
        message.error("Something went wrong");
      }
    }
  };

  const handleBackButtonClick = () => {
    const form = document.querySelector (".form");
    form.classList.remove('secActive');
  }

  useEffect(() => {
    const fetchSavedProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user.name);
        const response = await axios.post('/proposals//getdraftproposals', {userid: user._id})
        if(response.data !== null) {
          let vals = response.data;
          console.log(vals);
          // while(rows.length < 4) handleAddRow();
          // setRows(rows);

          const form = document.querySelector (".form"), 
          allInput = form.querySelectorAll(".input");

          for(let i=0; i<13; i++) {
            console.log(allInput[i].type, vals[allInput[i].name]);
            if(allInput[i].value === null || allInput[i].value === undefined) 
              allInput[i].value = null;
            if(allInput[i].type==="text") {
              allInput[i].value = vals[allInput[i].name];
            } else if(allInput[i].type==="number") {
              allInput[i].value = parseInt(vals[allInput[i].name]);
            }
          }

          console.log("EdQ ki baari");
          // for (let i = 0; i < 13; i++) {
          //   console.log(allInput[allInput.length - i - 1].name);
          //   allInput[ allInput.length - i - 1].value = vals[allInput[allInput.length - i - 1].name];;
          // }

          // const newElement = { degree: '', year: '', subject: '', institution: '', percentage: '' };
          // console.log(vals["PIedQualif"]);
          // while(vals["PIedQualif"].length < 4)
          //   vals["PIedQualif"].push(newElement);
          // setRows(vals["PIedQualif"]);
          // console.log(vals["PIedQualif"]);

          // for(let i=13; i<38; i++) {
            // , vals["PIedQualif"][(i-13)/5]
            // console.log((i-13)/5, allInput[i].name);
            // allInput[i].value = vals["PIedQualif"][Math.trunc((i - 13) / 5)][allInput[i].name];
          // }

        } 
      } catch (error) {
        setLoading(false);
        console.log(error);
        message.error("Something went wrong");
      }
    }

    fetchSavedProgress();

  }, []);

  return (
    <Layout>
      {loading && <Spinner />}
      <div className='body'>
        <div className='container'>
          <header>Registration</header>

          <Form>
          {loading && <Spinner />}
           <div className='form'>
              <div className='form first'>
                  <div className='details user'>
                    <span className='title'> PI BioData</span>

                    <div className='fields'>
                      <Form.Item className='input-field'>
                        <label> Full Name </label>
                        <Input className='input' name='fullname' type='text' placeholder='Enter your name' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Date of Birth </label>
                        <Input className='input' name='dob' type='date' placeholder='Enter DOB' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Organization Address </label>
                        <Input className='input' name='orgAddress' type='text' placeholder='Enter your address' required ></Input>
                      </Form.Item>

                      <Form.Item className='input-field'>
                        <label> Email </label>
                        <Input className='input' name='email' type='text' placeholder='Enter your email' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Contact Number </label>
                        <Input className='input' name='cno' type='number' placeholder='Enter Mobile no.' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Gender </label>
                        <Input className='input' name='gender' type='text' placeholder='(Male/Female/Trans)' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Organization Name </label>
                        <Input className='input' name='orgName' type='text' placeholder='Enter your institution' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Whether differently abled </label>
                        <Input className='input' name='diffAbled' type='text' placeholder='(Yes/No)' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                    </div>
                  </div>

                  <div className='details identity'>
                    <span className='title'> Project details</span>

                    <div className='fields'>
                      <Form.Item className='input-field'>
                        <label> Project Title </label>
                        <Input className='input' name='pTitle' type='text' placeholder='Enter ID Type' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Planned start date </label>
                        <Input className='input' name='pStartDate' type='date' placeholder='Enter start date'required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Planned end date </label>
                        <Input className='input' name='pEndDate' type='date' placeholder='Enter end date' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Project Summary </label>
                        <Input className='input' name='pSummary' type='text' maxLength={250} placeholder='Max length 250 words' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Organization Contact Details </label>
                        <Input className='input' name='orgCno' type='number' placeholder='Enter Mobile no.' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                      <Form.Item className='input-table'>
                        <span className='title'>PI Educational Qualifications</span>
                        <table>
                          <thead>
                            <tr>
                              <th>Degree</th>
                              <th>Year</th>
                              <th>Subject</th>
                              <th>University/Institution</th>
                              <th>Percentage/CGPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> <Input className='input' type='text' name='first.degree' placeholder='Enter degree' required></Input> </td>
                              <td> <Input className='input' type='text' name='first.year' placeholder='Enter year' required ></Input> </td>
                              <td> <Input className='input' type='text' name='first.subject' placeholder='Enter subject' required ></Input> </td>
                              <td> <Input className='input' type='text' name='first.institution' placeholder='Enter university/institution' required ></Input> </td>
                              <td> <Input className='input' type='text' name='first.percentage' placeholder='Enter percentage/CGPA' required ></Input> </td>
                            </tr>
                            <tr>
                              <td> <Input className='input' type='text' name='2nd.degree' placeholder='Enter degree'></Input> </td>
                              <td> <Input className='input' type='text' name='2nd.year' placeholder='Enter year' required ></Input> </td>
                              <td> <Input className='input' type='text' name='2nd.subject' placeholder='Enter subject' required ></Input> </td>
                              <td> <Input className='input' type='text' name='2nd.institution' placeholder='Enter university/institution' required ></Input> </td>
                              <td> <Input className='input' type='text' name='2nd.percentage' placeholder='Enter percentage/CGPA' required ></Input> </td>
                            </tr>
                            <tr>
                              <td> <Input className='input' type='text' name='3rd.degree' placeholder='Enter degree' required></Input> </td>
                              <td> <Input className='input' type='text' name='3rd.year' placeholder='Enter year' required ></Input> </td>
                              <td> <Input className='input' type='text' name='3rd.subject' placeholder='Enter subject' required ></Input> </td>
                              <td> <Input className='input' type='text' name='3rd.institution' placeholder='Enter university/institution' required ></Input> </td>
                              <td> <Input className='input' type='text' name='3rd.percentage' placeholder='Enter percentage/CGPA' required ></Input> </td>
                            </tr>                            <tr>
                              <td> <Input className='input' type='text' name='4th.degree' placeholder='Enter degree' required></Input> </td>
                              <td> <Input className='input' type='text' name='4th.year' placeholder='Enter year' required ></Input> </td>
                              <td> <Input className='input' type='text' name='4th.subject' placeholder='Enter subject' required ></Input> </td>
                              <td> <Input className='input' type='text' name='4th.institution' placeholder='Enter university/institution' required ></Input> </td>
                              <td> <Input className='input' type='text' name='4th.percentage' placeholder='Enter percentage/CGPA' required ></Input> </td>
                            </tr>
                          </tbody>
                        </table>
                      </Form.Item>
                      {/* <Form.Item className='input-table'>
                        <span className='title'>PI Educational Qualifications</span>
                        <table>
                          <thead>
                            <tr>
                              <th>Degree</th>
                              <th>Year</th>
                              <th>Subject</th>
                              <th>University/Institution</th>
                              <th>Percentage/CGPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='degree'
                                    value={row.degree}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter degree'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='year'
                                    value={row.year}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter year'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='subject'
                                    value={row.subject}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter subject'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='institution'
                                    value={row.institution}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter university/institution'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='percentage'
                                    value={row.percentage}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter percentage/CGPA'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <button onClick={() => handleDeleteRow(index)}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button onClick={handleAddRow}>Add Row</button>

                      </Form.Item> */}

                      {/* <Form.Item className='input-field'>
                        <label> Contact Number </label>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' required ></Input>
                      </Form.Item>                  */}
                        {/* <button onClick={handleDeleteRow}>Delete Row</button> */}
                      <Form.Item className='input-field'></Form.Item>
                      <Form.Item className='input-field'></Form.Item>

                      <button onClick={saveProgress} className="nextBtn"> 
                        <span className="btnText">Save Progress</span> 
                      </button>

                      <button onClick={handleNextButtonClick} className="nextBtn"> 
                        <span className="btnText">Next</span> 
                      </button>

                    </div>
                  </div>
              </div>
          {/* </Form> */}

          {/* <Form> */}
              <div className='form second'>
                  <div className='details project'>
                    <span className='title'> Budget Details</span>

                    <div className='fields'>
                      <Form.Item className='input-field'>
                        <label> Budget Requested </label>
                        <Input className='input' name='budget' type='number' placeholder='Enter your budget' required ></Input>
                      </Form.Item>
                      {/* show hem the allocated jury, yaha nahi toh kahi aur.. maybe final proposal mein */}
                      <Form.Item className='input-field'>
                        <label> Jury allocated </label>
                        <Input className='input' name='jury' type='text' placeholder='Will show jury allocated' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Budget Summary </label>
                        <Input className='input' name='budgetSummary' type='text' placeholder='Evaluate your budget request' required ></Input>
                      </Form.Item>

                      <Form.Item className='input-field'>
                        <label> Extra Entry 1 </label>
                        <Input className='input' name='ee1' type='text' placeholder='Enter your email' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 2 </label>
                        <Input className='input' name='ee2' type='number' placeholder='Enter Mobile no.' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 3 </label>
                        <Input className='input' name='ee3' type='text' placeholder='Enter entry 1' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 4 </label>
                        <Input className='input' name='ee4' type='text' placeholder='Enter entry 2' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 5 </label>
                        <Input className='input' name='ee5' type='text' placeholder='Enter entry 3' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                    </div>
                  </div>

                  <div className='details identity'>
                    <span className='title'> Identity details</span>

                    <div className='fields'>
                      <Form.Item className='input-field'>
                        <label> Extra entry 6 </label>
                        <Input className='input' name='ee6' type='text' placeholder='Enter ID Type' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 7 </label>
                        <Input className='input' name='ee7' type='number' placeholder='Enter ID no.' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 8 </label>
                        <Input className='input' name='ee8' type='text' placeholder='Enter your address' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 9 </label>
                        <Input className='input' name='ee9' type='text' placeholder='Enter your email' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'>
                        <label> Extra entry 10 </label>
                        <Input className='input' name='ee10' type='number' placeholder='Enter Mobile no.' required ></Input>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                      {/*<div className='input-table'>
                        <span className='title'>Partner Names</span>
                        <table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Year</th>
                              <th>Subject</th>
                              <th>University/Institution</th>
                              <th>Percentage/CGPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='degree'
                                    value={row.degree}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter degree'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='year'
                                    value={row.year}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter year'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='subject'
                                    value={row.subject}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter subject'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='institution'
                                    value={row.institution}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter university/institution'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <Input className='input'
                                    type='text'
                                    name='percentage'
                                    value={row.percentage}
                                    onChange={(e) => handleInputChange(index, e)}
                                    placeholder='Enter percentage/CGPA'
                                    
                                  required ></Input>
                                </td>
                                <td>
                                  <button onClick={() => handleDeleteRow(index)}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button onClick={handleAddRow}>Add Row</button>
                      </div> */}

                      {/* <Form.Item className='input-field'>
                        <label> Contact Number </label>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' required ></Input>
                      </Form.Item>                  */}
                      
                      {/* <Form.Item className='input-field'></Form.Item>
                      <Form.Item className='input-field'></Form.Item> */}
                    </div>

                    <div className='buttons'>
                    <button onClick={saveProgress} className="nextBtn"> 
                        <span className="btnText">Save Progress</span> 
                      </button>

                      <div onClick={handleBackButtonClick} className="backBtn"> 
                        <span className="btnText">Back</span> 
                      </div>
                      

                      {/* <Form.Item> */}
                      <button onClick={submitHandler} className="nextBtn"> 
                        <span className="btnText">Submit</span> 
                      </button>
                      {/* </Form.Item> */}
                    </div>
                  </div>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div className="App">
        <div className="title">Upload file</div>
        <FileUpload files={files} setFiles={setFiles}
          removeFile={removeFile} />
        <FileList files={files} removeFile={removeFile} />
      </div>
      </Layout>
  );
}

export default ProposalPage