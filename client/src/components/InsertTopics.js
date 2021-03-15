import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
//import TopicsList from './TopicsList'
//import SkipButton from './SkipButton'

const InsertTopics = () => {

  const history = useHistory();
  // const location = useLocation();

  useEffect(() => {
    //addTopic();
    getTopics();

    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    console.log(token);
  }, []);


  //! PARENT TOPIC AREA

  const [ newTopic, setNewTopic ] = useState({
    topic_name: '',
    priority: false,
    parent: null, // got to stay null by default otherwise does not pass on to db
  });

  console.log(newTopic)

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setNewTopic((state) => ({
      ...state,
      // [user_id]: 1,
      [name]: value
    }));
  };

  const addTopic = async () => {
    try {
      await axios.post("/topics", newTopic, {
        headers: {
          "Content-Type": "application/json",
					"x-access-token": localStorage.getItem("token"),
				},
    });   
      console.log("New Topic added", newTopic);
      //console.log(newTopic)
    } catch (error) {
			console.log(error);
		}
};

  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic();
    getTopics();
  };

  //! CREATE PARENT DROPDOWN


  const [ topicList, setTopicList] = useState([]);
  console.log(topicList)

  const filterParent = topicList.filter(function(topic) {
    return topic.parent === null ? topic.topic_name : null // to prevent bug due to form sent to db without data
    // return topic.parent === null 
  })
  
  console.log(filterParent)

    //   /*
  // GET exverything to display in the dropdown menu
  // */
  const getTopics = async () => {
    try {
      const listing = await axios.get("/topics", {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});

      console.log(listing.data)
      setTopicList(listing.data);
      
    } catch (error) {
      console.log(error);
    }
    
  };

  //! SUBTOPIC AREA

  const [ subtopic, setSubtopic ] = useState({
    topic_name: '',
    priority: false,
    // parent: 0,
  })



  const handleSubtopicSubmit = (e) => {
    e.preventDefault();
    addSubtopics();

  }

  const handleSubtopicChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setSubtopic((state) => ({
      ...state,
      // [user_id]: 1,
      [name]: value
    }));
  };

  const addSubtopics = async () => {
    try {
      await axios.post("/:id/subtopics", subtopic, {
        headers: {
          "Content-Type": "application/json",
					"x-access-token": localStorage.getItem("token"),
				},
    });   
      console.log("New subtopic added", subtopic);
      console.log(subtopic)
    } catch (error) {
			console.log(error);
		}
  };



  return (

    <div>
      
      <di>
      <h1>Add A topic</h1>


      <form onSubmit={handleSubmit}>
				<label htmlFor="topic">
					Topic name
					<input
            type="text"
						name="topic_name"
						value={newTopic.topic_name}
            onChange={handleChange}
						id="topic"
					/>
				</label>
          
        <label htmlFor="priority">
          Set it as a priority
          <input
            type="checkbox"
            checked={newTopic.priority}
            name="priority"
            onChange={handleChange}
            value={newTopic.priority}
            id="priority"
          />
        </label>

				<input type="submit" value="Add Topic" />
			</form>
      </di>

    <div>

    {/* SEPARATION */}

      <h1> Add a subtopic </h1>


    <form onSubmit={handleSubtopicSubmit}>
				<label htmlFor="subtopic">
					Subtopic name
					<input
            type="text"
						name="topic_name"
						value={subtopic.topic_name}
            onChange={handleSubtopicChange}
						id="subtopic"
					/>
				</label>

        <label htmlFor="parent-dropdown">
        Which topic does it belong to?
        <select id={topicList.id}>
      {filterParent.map((topicName) => (         
              <option key={topicName.id} value={topicName.id}> {topicName.topic_name} </option>
        ))}
        </select>
      </label>
          
        <label htmlFor="priority">
          Set it as a priority
          <input
            type="checkbox"
            checked={subtopic.priority}
            name="priority"
            onChange={handleSubtopicChange}
            value={subtopic.priority}
            id="priority"
          />
        </label>
      


      <input type="submit" value="Add subtopic" />

</form>

    </div>


      

    </div>

  )

}

export default InsertTopics
