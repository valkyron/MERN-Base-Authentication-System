// add option of only Yes or NO to differently abled
// what if I had to add multiple tables like PI qualifications.. mutiple states?
// post to axios
// show project duration
// allocated jury ka kuch karna hai

// files bhi upload karni hai.. with certain restrictions (eg. excel file should be only this much allowed)

import React, {useState} from 'react'
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
                                            // orgName: '', diffAbled: '', pTitle: '', pstartDt: '', pendDt: '', psumm: '', orgcdt: ''}]);
    // const [rows, setRows] = useState([{ degree: '', year: '', subject: '', institution: '', percentage: '' }]);    
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
    // };

const [firstForm, setfirstForm] = useState({}); 

  //next page bhejo
  const handleNextButtonClick = (values) => {
    console.log("blu", values);
    const form = document.querySelector (".form"); 

    // console.log(values['cno']);

    // const keysToCheck = [
    //   "cno",
    //   "diffAbled",
    //   "dob",
    //   "edq.2nd.degree",
    //   "edq.2nd.institution",
    //   "edq.2nd.percentage",
    //   "edq.2nd.subject",
    //   "edq.2nd.year",
    //   "edq.3rd.degree",
    //   "edq.3rd.institution",
    //   "edq.3rd.percentage",
    //   "edq.3rd.subject",
    //   "edq.3rd.year",
    //   "edq.4th.degree",
    //   "edq.4th.institution",
    //   "edq.4th.percentage",
    //   "edq.4th.subject",
    //   "edq.4th.year",
    //   "edq.first.degree",
    //   "edq.first.institution",
    //   "edq.first.percentage",
    //   "edq.first.subject",
    //   "edq.first.year",
    //   "email",
    // ];
  
    // const emptyFields = keysToCheck.filter((key) => !values[key]);
    // if (emptyFields.length > 0) {
    //   alert(`Fields ${emptyFields.join(", ")} cannot be empty.`);
    //   return; 
    // }

    //   allInput = form.querySelectorAll(".first .input");
  
      // for (let i = 0; i < allInput.length; i++) {
      //   const input = allInput[i];

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

        setfirstForm(values);
        form.classList.add("secActive");
      // }
      
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formEntries, setFormEntries] = useState({});

  //first form submit
  // const firstFormHandler = async(values) => {
  //   console.log(values);
  // }

  //form submit
  const submitHandler = async (values) => {
    console.log(values);
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

      for (let i = 0; i < 13; i++) {
        const input = allInput[i];

        formPrototype[input.name] = input.value;
      }

      for (let i = 0; i < 13; i++) {
        const input = allInput[ allInput.length - i - 1];
  
        formPrototype[input.name] = input.value;
      }
    
      // formPrototype["PIedQualif"] = rows;
      console.log(formPrototype);

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

  // const [form] = Form.useForm(); 

  return (
    <Layout>
      {loading && <Spinner />}
      <div className='body'>
        <div className='container'>
          <header>Registration</header>

          {loading && <Spinner />}
           <div className='form'>
           <Form onFinish={handleNextButtonClick}>
              <div className='form first'>
                  <div className='details user'>
                    <span className='title'> PI BioData</span>

                    <div className='fields'>
                      <Form.Item className='input-field' name='fullname'>
                        <div>
                          <label> Full Name </label> 
                          {/* required*/}
                          <Input className='input' type='text' placeholder='Enter your name' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='dob'>
                        <div>
                          <label> Date of Birth </label>
                          <Input className='input' type='date' placeholder='Enter DOB' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='orgAddress'>
                      <div>
                        <label> Organization Address </label>
                        <Input className='input' type='text' placeholder='Enter your address' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='email'>
                      <div>
                        <label> Email </label>
                        <Input className='input' type='text' placeholder='Enter your email' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='cno'>
                      <div>
                        <label> Contact Number </label>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='gender'>
                      <div>
                        <label> Gender </label>
                        <Input className='input' type='text' placeholder='(Male/Female/Trans)' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='orgName'>
                      <div>
                        <label> Organization Name </label>
                        <Input className='input' type='text' placeholder='Enter your institution' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='diffAbled'>
                      <div>
                        <label> Whether differently abled </label>
                        <Input className='input' type='text' placeholder='(Yes/No)' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                    </div>
                  </div>

                  <div className='details identity'>
                    <span className='title'> Project details</span>

                    <div className='fields'>
                      <Form.Item className='input-field' name='pTitle'>
                        <div>
                        <label> Project Title </label>
                        <Input className='input' type='text' placeholder='Enter ID Type' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='pStartDate'>
                      <div>
                        <label> Planned start date </label>
                        <Input className='input' type='date' placeholder='Enter start date' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='pEndDate'>
                      <div>
                        <label> Planned end date </label>
                        <Input className='input' type='date' placeholder='Enter end date'  ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='pSummary'>
                      <div>
                        <label> Project Summary </label>
                        <Input className='input' type='text' maxLength={250} placeholder='Max length 250 words' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='orgCno'>
                      <div>
                        <label> Organization Contact Details </label>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                      <div className='input-table'>
                        <span className='title'>PI Educational Qualifications (First Row is required)</span>
                        <table>
                          <thead>
                            <tr>
                              <th>Degree</th>
                              <th>Year</th>
                              <th>Subject</th>
                              <th>University/Institution</th>
                              <th>%/CGPA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> <Form.Item className='input-field' name='edq.first.degree'><Input className='input' type='text' placeholder='Enter degree' required></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.first.year'><Input className='input' type='text' placeholder='Enter year' required ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.first.subject'><Input className='input' type='text' placeholder='Enter subject' required ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.first.institution' ><Input className='input' type='text' placeholder='Enter university/institution' required ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.first.percentage' ><Input className='input' type='text' placeholder='Enter %/CGPA' required ></Input></Form.Item></td>
                            </tr>
                            <tr>
                              <td> <Form.Item className='input-field' name='edq.2nd.degree'><Input className='input' type='text' placeholder='Enter degree'></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.2nd.year'><Input className='input' type='text' placeholder='Enter year' ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.2nd.subject'><Input className='input' type='text' placeholder='Enter subject' ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.2nd.institution'><Input className='input' type='text' placeholder='Enter university/institution'  ></Input></Form.Item> </td>
                              <td> <Form.Item className='input-field' name='edq.2nd.percentage'><Input className='input' type='text' placeholder='Enter %/CGPA' ></Input> </Form.Item></td>
                            </tr>
                            <tr>
                              <td> <Form.Item className='input-field' name='edq.3rd.degree'><Input className='input' type='text' placeholder='Enter degree'></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.3rd.year'><Input className='input' type='text' placeholder='Enter year' ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.3rd.subject'><Input className='input' type='text' placeholder='Enter subject' ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.3rd.institution'><Input className='input' type='text' placeholder='Enter university/institution'  ></Input></Form.Item> </td>
                              <td> <Form.Item className='input-field' name='edq.3rd.percentage'><Input className='input' type='text' placeholder='Enter %/CGPA' ></Input> </Form.Item></td>
                            </tr>                            
                            <tr>
                              <td> <Form.Item className='input-field' name='edq.4th.degree'><Input className='input' type='text' placeholder='Enter degree'></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.4th.year'><Input className='input' type='text' placeholder='Enter year' ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.4th.subject'><Input className='input' type='text' placeholder='Enter subject' ></Input> </Form.Item></td>
                              <td> <Form.Item className='input-field' name='edq.4th.institution'><Input className='input' type='text' placeholder='Enter university/institution'  ></Input></Form.Item> </td>
                              <td> <Form.Item className='input-field' name='edq.4th.percentage'><Input className='input' type='text' placeholder='Enter %/CGPA' ></Input> </Form.Item></td>
                            </tr>
                          </tbody>
                        </table>
                      </div> 
                      {/* <Form.Item className='input-table' name='rows' label='PI Educational Qualifications'>
                        <span className='title'>PI Educational Qualifications</span>
                        <table>
                          <thead>
                          </thead>
                          <tbody>
                            {values.rows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <Input
                                    className='input'
                                    type='text'
                                    name={`degree[${index}]`}
                                    value={row.degree}
                                    onChange={(e) => form.setFieldsValue({ [`rows[${index}].degree`]: e.target.value })}
                                    placeholder='Enter degree'
                                    required
                                  />
                                </td>
                                <td>
                                  <button onClick={() => values.rows.length > 1 && form.setFieldsValue({ rows: values.rows.filter((_, i) => i !== index) })}>
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <button onClick={() => values.rows.length < 4 && form.setFieldsValue({ rows: [...values.rows, {}] })}>
                          Add Row
                        </button>
                            </Form.Item>*/}

                      <Form.Item className='input-field'></Form.Item>
                      <Form.Item className='input-field'></Form.Item>

                      <button className="nextBtn"> 
                        <span className="btnText">Next</span> 
                      </button>

                    </div>
                  </div>
              </div>
              </Form>

              <Form>
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
                              <th>%/CGPA</th>
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
                                    placeholder='Enter %/CGPA'
                                    
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
          </Form>
          </div>
        </div>
      </div>

      <div className="App">
        <div className="title">Upload file</div>
        <FileUpload files={files} setFiles={setFiles}
          removeFile={removeFile} />
        <FileList files={files} removeFile={removeFile} />
      </div>
      </Layout>
    // <Layout>
    //   {loading && <Spinner />}
    //   <div className='body'>
    //     <div className='container'>
    //       <header>Registration</header>

    //       <Form>
    //       {loading && <Spinner />}
    //        <div className='form'>
    //           <div className='form first'>
    //               <div className='details user'>
    //                 <span className='title'> PI BioData</span>

    //                 <div className='fields'>
    //                   <Form.Item className='input-field'>
    //                     <label> Full Name </label>
    //                     <Input className='input' name='fullname' type='text' placeholder='Enter your name' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Date of Birth </label>
    //                     <Input className='input' name='dob' type='date' placeholder='Enter DOB' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Organization Address </label>
    //                     <Input className='input' name='orgAddress' type='text' placeholder='Enter your address' required ></Input>
    //                   </Form.Item>

    //                   <Form.Item className='input-field'>
    //                     <label> Email </label>
    //                     <Input className='input' name='email' type='text' placeholder='Enter your email' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Contact Number </label>
    //                     <Input className='input' name='cno' type='number' placeholder='Enter Mobile no.' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Gender </label>
    //                     <Input className='input' name='gender' type='text' placeholder='(Male/Female/Trans)' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Organization Name </label>
    //                     <Input className='input' name='orgName' type='text' placeholder='Enter your institution' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Whether differently abled </label>
    //                     <Input className='input' name='diffAbled' type='text' placeholder='(Yes/No)' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'></Form.Item>
    //                 </div>
    //               </div>

    //               <div className='details identity'>
    //                 <span className='title'> Project details</span>

    //                 <div className='fields'>
    //                   <Form.Item className='input-field'>
    //                     <label> Project Title </label>
    //                     <Input className='input' name='pTitle' type='text' placeholder='Enter ID Type' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Planned start date </label>
    //                     <Input className='input' name='pStartDate' type='date' placeholder='Enter start date'required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Planned end date </label>
    //                     <Input className='input' name='pEndDate' type='date' placeholder='Enter end date' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Project Summary </label>
    //                     <Input className='input' name='pSummary' type='text' maxLength={250} placeholder='Max length 250 words' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Organization Contact Details </label>
    //                     <Input className='input' name='orgCno' type='number' placeholder='Enter Mobile no.' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'></Form.Item>
    //                   <Form.Item className='input-table'>
    //                     <span className='title'>PI Educational Qualifications</span>
    //                     <table>
    //                       <thead>
    //                         <tr>
    //                           <th>Degree</th>
    //                           <th>Year</th>
    //                           <th>Subject</th>
    //                           <th>University/Institution</th>
    //                           <th>%/CGPA</th>
    //                         </tr>
    //                       </thead>
    //                       <tbody>
    //                         {rows.map((row, index) => (
    //                           <tr key={index}>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='degree'
    //                                 value={row.degree}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter degree'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='year'
    //                                 value={row.year}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter year'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='subject'
    //                                 value={row.subject}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter subject'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='institution'
    //                                 value={row.institution}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter university/institution'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='percentage'
    //                                 value={row.percentage}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter %/CGPA'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <button onClick={() => handleDeleteRow(index)}>Delete</button>
    //                             </td>
    //                           </tr>
    //                         ))}
    //                       </tbody>
    //                     </table>
    //                     <button onClick={handleAddRow}>Add Row</button>

    //                   </Form.Item>

    //                   {/* <Form.Item className='input-field'>
    //                     <label> Contact Number </label>
    //                     <Input className='input' type='number' placeholder='Enter Mobile no.' required ></Input>
    //                   </Form.Item>                  */}
    //                     {/* <button onClick={handleDeleteRow}>Delete Row</button> */}
    //                   <Form.Item className='input-field'></Form.Item>
    //                   <Form.Item className='input-field'></Form.Item>

    //                   <button onClick={handleNextButtonClick} className="nextBtn"> 
    //                     <span className="btnText">Next</span> 
    //                   </button>

    //                 </div>
    //               </div>
    //           </div>

    //           <div className='form second'>
    //               <div className='details project'>
    //                 <span className='title'> Budget Details</span>

    //                 <div className='fields'>
    //                   <Form.Item className='input-field'>
    //                     <label> Budget Requested </label>
    //                     <Input className='input' name='budget' type='number' placeholder='Enter your budget' required ></Input>
    //                   </Form.Item>
    //                   {/* show hem the allocated jury, yaha nahi toh kahi aur.. maybe final proposal mein */}
    //                   <Form.Item className='input-field'>
    //                     <label> Jury allocated </label>
    //                     <Input className='input' name='jury' type='text' placeholder='Will show jury allocated' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Budget Summary </label>
    //                     <Input className='input' name='budgetSummary' type='text' placeholder='Evaluate your budget request' required ></Input>
    //                   </Form.Item>

    //                   <Form.Item className='input-field'>
    //                     <label> Extra Entry 1 </label>
    //                     <Input className='input' name='ee1' type='text' placeholder='Enter your email' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 2 </label>
    //                     <Input className='input' name='ee2' type='number' placeholder='Enter Mobile no.' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 3 </label>
    //                     <Input className='input' name='ee3' type='text' placeholder='Enter entry 1' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 4 </label>
    //                     <Input className='input' name='ee4' type='text' placeholder='Enter entry 2' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 5 </label>
    //                     <Input className='input' name='ee5' type='text' placeholder='Enter entry 3' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'></Form.Item>
    //                 </div>
    //               </div>

    //               <div className='details identity'>
    //                 <span className='title'> Identity details</span>

    //                 <div className='fields'>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 6 </label>
    //                     <Input className='input' name='ee6' type='text' placeholder='Enter ID Type' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 7 </label>
    //                     <Input className='input' name='ee7' type='number' placeholder='Enter ID no.' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 8 </label>
    //                     <Input className='input' name='ee8' type='text' placeholder='Enter your address' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 9 </label>
    //                     <Input className='input' name='ee9' type='text' placeholder='Enter your email' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'>
    //                     <label> Extra entry 10 </label>
    //                     <Input className='input' name='ee10' type='number' placeholder='Enter Mobile no.' required ></Input>
    //                   </Form.Item>
    //                   <Form.Item className='input-field'></Form.Item>
    //                   {/*<div className='input-table'>
    //                     <span className='title'>Partner Names</span>
    //                     <table>
    //                       <thead>
    //                         <tr>
    //                           <th>Name</th>
    //                           <th>Year</th>
    //                           <th>Subject</th>
    //                           <th>University/Institution</th>
    //                           <th>%/CGPA</th>
    //                         </tr>
    //                       </thead>
    //                       <tbody>
    //                         {rows.map((row, index) => (
    //                           <tr key={index}>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='degree'
    //                                 value={row.degree}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter degree'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='year'
    //                                 value={row.year}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter year'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='subject'
    //                                 value={row.subject}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter subject'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='institution'
    //                                 value={row.institution}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter university/institution'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <Input className='input'
    //                                 type='text'
    //                                 name='percentage'
    //                                 value={row.percentage}
    //                                 onChange={(e) => handleInputChange(index, e)}
    //                                 placeholder='Enter %/CGPA'
                                    
    //                               required ></Input>
    //                             </td>
    //                             <td>
    //                               <button onClick={() => handleDeleteRow(index)}>Delete</button>
    //                             </td>
    //                           </tr>
    //                         ))}
    //                       </tbody>
    //                     </table>
    //                     <button onClick={handleAddRow}>Add Row</button>
    //                   </div> */}

    //                   {/* <Form.Item className='input-field'>
    //                     <label> Contact Number </label>
    //                     <Input className='input' type='number' placeholder='Enter Mobile no.' required ></Input>
    //                   </Form.Item>                  */}
                      
    //                   {/* <Form.Item className='input-field'></Form.Item>
    //                   <Form.Item className='input-field'></Form.Item> */}
    //                 </div>

    //                 <div className='buttons'>

    //                   <div onClick={handleBackButtonClick} className="backBtn"> 
    //                     <span className="btnText">Back</span> 
    //                   </div>
                      

    //                   {/* <Form.Item> */}
    //                   <button onClick={submitHandler} className="nextBtn"> 
    //                     <span className="btnText">Submit</span> 
    //                   </button>
    //                   {/* </Form.Item> */}
    //                 </div>
    //               </div>
    //           </div>
    //         </div>
    //       </Form>
    //     </div>
    //   </div>

    //   <div className="App">
    //     <div className="title">Upload file</div>
    //     <FileUpload files={files} setFiles={setFiles}
    //       removeFile={removeFile} />
    //     <FileList files={files} removeFile={removeFile} />
    //   </div>
    //   </Layout>
  );
}

export default ProposalPage