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
  const firstFormRef = React.createRef();
  const secondFormRef = React.createRef();
  const [files, setFiles] = useState([])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

    // const [PIinfo, setPIinfo] = useState([{ fname: '', dob: '', orgAdd: '', email: '', contactNo: '', gender: '',
    //                                         orgName: '', diffAbled: '', pTitle: '', pstartDt: '', pendDt: '', psumm: '', orgcdt: ''}]);
    // const [rows, setRows] = useState([{ degree: '', year: '', subject: '', institution: '', percentage: '' }]);
    const [firstformEntries, setfirstformEntries] = useState({});
    const [secondformEntries, setsecondformEntries] = useState({});
    const sampleDate = "0098-04-05T00:00:00.000Z";

    // const keysToCheck = [

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
  const handleNextButtonClick = () => {
    const form = document.querySelector (".form");
    const firstFormValues = firstFormRef.current.getFieldsValue();
    console.log(firstFormValues);
    // const keys = Object.keys(values);  

    // const isEmptyValuePresent = Object.entries(values).some(([key, value]) => {
    //   if (key.startsWith("edq2nd") || key.startsWith("edq3rd") || key.startsWith("edq4th")) {
    //     return false;
    //   }
    
    //   // Check if the value is empty, null, or undefined
    //   if (value === null || value === undefined || value.trim() === '') {
    //     return true;
    //   }
    
    //   return false;
    // });
    
    // if (isEmptyValuePresent) {
    //   alert("Some fields are not filled yet.");
    // } else {
      setfirstformEntries(firstFormValues);
      form.classList.add("secActive");
    // } 
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saveProgress = async() => {
    const firstFormValues = firstFormRef.current.getFieldsValue();
    const secondFormValues = secondFormRef.current.getFieldsValue();
    console.log('First Form Values:', firstFormValues);
    console.log('Second Form Values:', secondFormValues);
    setfirstformEntries(firstFormValues);
    setsecondformEntries(secondFormValues);

      if(firstFormValues["fullname"] === '' || firstFormValues["pTitle"] === '' 
      || firstFormValues["fullname"] === undefined || firstFormValues["pTitle"] === undefined) {
        message.error("Fill Full Name and Project Title to save progress.");
      }

      else {
        const combinedEntries = { ...firstFormValues, ...secondFormValues };
        console.log("combined Entries", combinedEntries);
        combinedEntries["status"] = "Incomplete";
        console.log("haa");
    
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          setLoading(true);
          const response = await axios.post('/proposals/getdraftproposals', {userid: user._id})
          console.log("Response data", response.data);
          if(response.data === null) {
            console.log("paa");
              await axios.post("/proposals/newproposal", {...combinedEntries, userid:user._id});
              message.success("Progress Saved!");
          } else {
            const updatedData = {
              ...response.data,
              ...combinedEntries,
            };
            console.log("Updated data", updatedData);
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
    console.log("submit called");
    // const firstFormValues = firstFormRef.current.getFieldsValue();
    const secondFormValues = secondFormRef.current.getFieldsValue();
    setsecondformEntries(secondFormValues);
    console.log(secondFormValues);
    // console.log("second", values);

    const isEmptyValuePresent = Object.entries(secondFormValues).some(([key, value]) => {
      // Check if the value is empty, null, or undefined
      if (value === null || value === undefined || value.trim() === '') {
        return true;
      }
    
      return false;
    });
    
    if (isEmptyValuePresent) {
      alert("Some fields are not filled yet.");
    } else {
      const combinedEntries = { ...firstformEntries, ...secondformEntries };
      combinedEntries["status"] = "Submitted";
      setsecondformEntries(secondFormValues);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        console.log("submit karne wala hu", combinedEntries);
        await axios.post("/proposals/newproposal", {...combinedEntries, userid:user._id});
        message.success("Proposal sent successfully!");
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
        message.error("Something went wrong");
      }
    }
    // const form = document.querySelector (".form"); 
      // var flag = 1;

    //   for (let i = 0; i < secondFormInput.length; i++) {
    //     const input = secondFormInput[i];

    //     if (input.value === "") {
    //       flag = 0;
    //       alert( "\"" + input.placeholder + "\" is empty");
    //       break; // Exit the loop
    //     }
    //   }

    // if(flag) {
    //   const allInput = form.querySelectorAll(".input");
    //   var formPrototype = {};

    //   for (let i = 0; i < allInput.length; i++) {
    //     const input = allInput[i];

    //     formPrototype[input.name] = input.value;
    //   }

      // for (let i = 0; i < 13; i++) {
      //   const input = allInput[ allInput.length - i - 1];
  
      //   formPrototype[input.name] = input.value;
      // }
    
      // formPrototype["PIedQualif"] = rows;
      // formPrototype["status"] = "Submitted";
      // setformEntries(formPrototype);
    // }
  };

  const handleBackButtonClick = () => {
    const form = document.querySelector (".form");
    form.classList.remove('secActive');
  }

  useEffect(() => {
    const fetchSavedProgress = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.post('/proposals/getdraftproposals', {userid: user._id})
        if(response.data !== null) {
          console.log("fetch saved response data", response.data);

          // const firstFormValues = {};
          // const firstFormKeys = Object.keys(firstformEntries);
          // Format date if 'pStartDate' key is present and not null or empty string in response.data
          if (response.data.hasOwnProperty('pStartDate') && response.data['pStartDate']) {
            // Convert the date to "yyyy-MM-dd" format
            const originalDate = response.data['pStartDate'];
            const formattedDate = new Date(originalDate).toISOString().split('T')[0];
            response.data['pStartDate'] = formattedDate;
          }

          if (response.data.hasOwnProperty('pEndDate') && response.data['pEndDate']) {
            // Convert the date to "yyyy-MM-dd" format
            const originalDate = response.data['pEndDate'];
            const formattedDate = new Date(originalDate).toISOString().split('T')[0];
            response.data['pEndDate'] = formattedDate;
          }

          if (response.data.hasOwnProperty('dob') && response.data['dob']) {
            // Convert the date to "yyyy-MM-dd" format
            const originalDate = response.data['dob'];
            const formattedDate = new Date(originalDate).toISOString().split('T')[0];
            response.data['dob'] = formattedDate;
          }

          const firstFormValues = firstFormRef.current.getFieldsValue();
          console.log("firstFormValues after ref", firstFormValues);
          const firstFormKeys = Object.keys(firstFormValues);
          for (const key of firstFormKeys) {
            firstFormValues[key] = response.data[key] || undefined;
          }
    
          // Map response data to the second form
          // const secondFormValues = {};
          // const secondFormKeys = Object.keys(secondformEntries);
          const secondFormValues = secondFormRef.current.getFieldsValue();
          const secondFormKeys = Object.keys(secondFormValues);
          for (const key of secondFormKeys) {
            secondFormValues[key] = response.data[key] || undefined;
          }

          console.log("firstFormValues after loop", firstFormValues);
          // console.log("secondFormValues", secondFormValues);

          // Set the values in the forms and update formEntries states
          // if (Object.keys(firstFormValues).length > 0) {
            console.log("si si");
            firstFormRef.current.setFieldsValue(firstFormValues);
            setfirstformEntries(firstFormValues);
          // }
          // if (Object.keys(secondFormValues).length > 0) {
            secondFormRef.current.setFieldsValue(secondFormValues);
            setsecondformEntries(secondFormValues);
          // }

          console.log("first form entries:", firstformEntries);
          message.success("Saved Progress Loaded.");
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

          {loading && <Spinner />}
           <div className='form'>
           <Form ref={firstFormRef} initialValues={firstformEntries}>
              <div className='form first'>
                  <div className='details user'>
                    <span className='title'> PI BioData</span>

                    <div className='fields'>
                      <Form.Item className='input-field' name='fullname' label="Full Name">
                        {/* <div> */}
                          {/* <label> Full Name </label>  */}
                          {/* required*/}
                          <Input className='input' type='text' placeholder='Enter your name' ></Input>
                        {/* </div> */}
                      </Form.Item>

                      {/* <Form.Item className='input-field' name='dob'>
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
                      </Form.Item> */}

                      <Form.Item className='input-field' name='dob' label='Date of Birth'>
                        <Input className='input' type='date' placeholder='Enter DOB' />
                      </Form.Item>

                      <Form.Item className='input-field' name='orgAddress' label='Organization Address'>
                        <Input className='input' type='text' placeholder='Enter your address' />
                      </Form.Item>

                      <Form.Item className='input-field' name='email' label='Email'>
                        <Input className='input' type='text' placeholder='Enter your email' />
                      </Form.Item>

                      <Form.Item className='input-field' name='cno' label='Contact Number'>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' />
                      </Form.Item>

                      <Form.Item className='input-field' name='gender' label='Gender'>
                        <Input className='input' type='text' placeholder='(Male/Female/Trans)' />
                      </Form.Item>

                      <Form.Item className='input-field' name='orgName' label='Organization Name'>
                        <Input className='input' type='text' placeholder='Enter your institution' />
                      </Form.Item>

                      <Form.Item className='input-field' name='diffAbled' label='Whether differently abled'>
                        <Input className='input' type='text' placeholder='(Yes/No)' />
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                    </div>
                  </div>

                  <div className='details identity'>
                    <span className='title'> Project details</span>

                    <div className='fields'>
                    {/* <Form.Item className='input-field' name='pTitle'>
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
                      </Form.Item> */}

                    <Form.Item className='input-field' name='pTitle' label='Project Title'>
                      <Input className='input' type='text' placeholder='Enter ID Type' />
                    </Form.Item>

                    <Form.Item className='input-field' name='pStartDate' label='Planned start date'>
                      <Input className='input' type='date' placeholder='Enter start date' />
                    </Form.Item>

                    <Form.Item className='input-field' name='pEndDate' label='Planned end date'>
                      <Input className='input' type='date' placeholder='Enter end date' />
                    </Form.Item>

                    <Form.Item className='input-field' name='pSummary' label='Project Summary'>
                      <Input className='input' type='text' maxLength={250} placeholder='Max length 250 words' />
                    </Form.Item>

                    <Form.Item className='input-field' name='orgCno' label='Organization Contact Details'>
                      <Input className='input' type='number' placeholder='Enter Mobile no.' />
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
                              <td>
                                <Form.Item className='input-field' name='edqfirstdegree'>
                                  <Input className='input' type='text' placeholder='Enter degree' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edqfirstyear'>
                                  <Input className='input' type='text' placeholder='Enter year' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edqfirstsubject'>
                                  <Input className='input' type='text' placeholder='Enter subject' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edqfirstinstitution'>
                                  <Input className='input' type='text' placeholder='Enter university/institution' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edqfirstpercentage'>
                                  <Input className='input' type='text' placeholder='Enter %/CGPA' />
                                </Form.Item>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Form.Item className='input-field' name='edq2nddegree'>
                                  <Input className='input' type='text' placeholder='Enter degree' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq2ndyear'>
                                  <Input className='input' type='text' placeholder='Enter year' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq2ndsubject'>
                                  <Input className='input' type='text' placeholder='Enter subject' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq2ndinstitution'>
                                  <Input className='input' type='text' placeholder='Enter university/institution' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq2ndpercentage'>
                                  <Input className='input' type='text' placeholder='Enter %/CGPA'/>
                                </Form.Item>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Form.Item className='input-field' name='edq3rddegree'>
                                  <Input className='input' type='text' placeholder='Enter degree' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq3rdyear'>
                                  <Input className='input' type='text' placeholder='Enter year'  />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq3rdsubject'>
                                  <Input className='input' type='text' placeholder='Enter subject' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq3rdinstitution'>
                                  <Input className='input' type='text' placeholder='Enter university/institution' />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq3rdpercentage'>
                                  <Input className='input' type='text' placeholder='Enter %/CGPA' />
                                </Form.Item>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Form.Item className='input-field' name='edq4thdegree'>
                                  <Input className='input' type='text' placeholder='Enter degree'  />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq4thyear'>
                                  <Input className='input' type='text' placeholder='Enter year'  />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq4thsubject'>
                                  <Input className='input' type='text' placeholder='Enter subject'  />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq4thinstitution'>
                                  <Input className='input' type='text' placeholder='Enter university/institution'  />
                                </Form.Item>
                              </td>
                              <td>
                                <Form.Item className='input-field' name='edq4thpercentage'>
                                  <Input className='input' type='text' placeholder='Enter %/CGPA'  />
                                </Form.Item>
                              </td>
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
                      {/* <Form.Item className='input-field'></Form.Item> */}

                      <button onClick={saveProgress} className="nextBtn"> 
                        <span className="btnText">Save Progress</span> 
                      </button>


                      <button onClick={handleNextButtonClick} className="nextBtn"> 
                        <span className="btnText">Next</span> 
                      </button>

                    </div>
                  </div>
              </div>
              </Form>

              <Form ref={secondFormRef} initialValues={secondformEntries}>
              <div className='form second'>
                  <div className='details project'>
                    <span className='title'> Budget Details</span>

                    <div className='fields'>
                      <Form.Item className='input-field' name='budget' label='Budget Requested'>
                        <Input className='input' type='number' placeholder='Enter your budget' />
                      </Form.Item>
                      
                      <Form.Item className='input-field' name='jury' label='Jury allocated'>
                        <Input className='input' type='text' placeholder='Will show jury allocated' />
                      </Form.Item>

                      <Form.Item className='input-field' name='budgetSummary' label='Budget Summary'>
                        <Input className='input' type='text' placeholder='Evaluate your budget request' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee1' label='Extra Entry 1'>
                        <Input className='input' type='text' placeholder='Enter your email' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee2' label='Extra Entry 2'>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee3' label='Extra Entry 3'>
                        <Input className='input' type='text' placeholder='Enter entry 1' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee4' label='Extra Entry 4'>
                        <Input className='input' type='text' placeholder='Enter entry 2' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee5' label='Extra Entry 5'>
                        <Input className='input' type='text' placeholder='Enter entry 3' />
                      </Form.Item>

                      <Form.Item className='input-field'></Form.Item>

                      <Form.Item className='input-field' name='ee6' label='Extra Entry 6'>
                        <Input className='input' type='text' placeholder='Enter ID Type' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee7' label='Extra Entry 7'>
                        <Input className='input' type='number' placeholder='Enter ID no.' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee8' label='Extra Entry 8'>
                        <Input className='input' type='text' placeholder='Enter your address' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee9' label='Extra Entry 9'>
                        <Input className='input' type='text' placeholder='Enter your email' />
                      </Form.Item>

                      <Form.Item className='input-field' name='ee10' label='Extra Entry 10'>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' />
                      </Form.Item>

                      <Form.Item className='input-field'></Form.Item>
                    </div>



                    {/* <div className='fields'>
                      <Form.Item className='input-field' name='budget'>
                        <div>
                        <label> Budget Requested </label>
                        <Input className='input' type='number' placeholder='Enter your budget' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='jury'>
                      <div>
                        <label> Jury allocated </label>
                        <Input className='input' type='text' placeholder='Will show jury allocated' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='budgetSummary'>
                      <div>
                        <label> Budget Summary </label>
                        <Input className='input' type='text' placeholder='Evaluate your budget request' ></Input>
                        </div>
                      </Form.Item>

                      <Form.Item className='input-field' name='ee1' >
                      <div>
                        <label> Extra Entry 1 </label>
                        <Input className='input' type='text' placeholder='Enter your email' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee2'>
                      <div>
                        <label> Extra entry 2 </label>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee3'>
                      <div>
                        <label> Extra entry 3 </label>
                        <Input className='input' type='text' placeholder='Enter entry 1' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee4'>
                      <div>
                        <label> Extra entry 4 </label>
                        <Input className='input' type='text' placeholder='Enter entry 2' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee5'>
                      <div>
                        <label> Extra entry 5 </label>
                        <Input className='input' type='text' placeholder='Enter entry 3' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                    </div>
                  </div>

                  <div className='details identity'>
                    <span className='title'> Identity details</span>

                    <div className='fields'>
                      <Form.Item className='input-field' name='ee6'>
                      <div>
                        <label> Extra entry 6 </label>
                        <Input className='input' type='text' placeholder='Enter ID Type' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee7'>
                      <div>
                        <label> Extra entry 7 </label>
                        <Input className='input' type='number' placeholder='Enter ID no.' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee8'>
                      <div>
                        <label> Extra entry 8 </label>
                        <Input className='input' type='text' placeholder='Enter your address' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee9'>
                      <div>
                        <label> Extra entry 9 </label>
                        <Input className='input' type='text' placeholder='Enter your email' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field' name='ee10'>
                        <div>
                        <label> Extra entry 10 </label>
                        <Input className='input' type='number' placeholder='Enter Mobile no.' ></Input>
                        </div>
                      </Form.Item>
                      <Form.Item className='input-field'></Form.Item>
                    </div> */}

                    <div className='buttons'>
                      <div onClick={handleBackButtonClick} className="backBtn"> 
                        <span className="btnText">Back</span> 
                      </div>
                      
                      <button onClick={saveProgress} className="nextBtn"> 
                        <span className="btnText">Save Progress</span> 
                      </button>


                      {/* <Form.Item> */}
                      {/* onClick={() => secondFormRef.current.submit()}  */}
                      <button onClick={submitHandler} className="nextBtn"> 
                        <span className="btnText">Submit</span> 
                      </button>
                      {/* </Form.Item> */}
                    </div>
                  </div>
              </div>
          </Form>
          </div>
          {/* <button onClick={saveProgress} className="nextBtn"> 
                        <span className="btnText">Save Progress</span> 
                      </button> */}
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