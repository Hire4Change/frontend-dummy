import React,{ useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const base_url = `https://us-central1-hire4change.cloudfunctions.net/recommendation`;

const PostTitle = ({title}) => {
  return(
    <div style={{display: 'flex', justifyContent: "center"}}>
        <h1>{title}</h1>
    </div>
  )
}

const PostDate = ({ date }) => {
  return (
    <div style={{ color: '#6c757d', fontSize: '0.875rem', fontStyle: 'italic' }}>
      {date}
    </div>
  );
};

const PriceQuote = ({ price }) => {
  return (
    <div style={{ fontWeight: '600', fontSize: '1.25rem' }}>
      ₹ {price} / hour
    </div>
  );
};

const PostHeader = ({ date, price }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <PostDate date={date} />
      <PriceQuote price={price} />
    </div>
  );
};

const SkillButton = ({ skill }) => {
  return (
    <div 
      style={{ 
        width : 'fit-content',
        border: '2px solid black', 
        borderRadius: '20px',      
        display: 'inline-flex',   
        alignItems: 'center',     
        padding: '0.25rem 0.5rem', // Reduced padding for a smaller button
        marginLeft: '1rem',
        textAlign: 'center',      
        whiteSpace: 'nowrap',     
        boxSizing: 'border-box',  
        backgroundColor: '#f0f0f0', 
        cursor: 'pointer',
        fontSize: '0.875rem'       // Smaller font size for a compact look
      }}
    >
      {skill}
    </div>
  );
};

const Skills = ({ skills }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
      {skills.map((skill, index) => (
        <SkillButton key={index} skill={skill} />
      ))}
    </div>
  );
};

const Description = ({ description }) => {
  const truncatedDescription = description.length > 300
    ? description.slice(0, 300) + '...'
    : description;

  return (
    <div style={{ 
      textAlign: 'center', 
      color: '#888', 
      fontSize: '0.875rem', 
      margin: '1rem 0'
    }}>
      <p>{truncatedDescription}</p>
    </div>
  );
};

const ViewJob = ({ link }) => {
  return (
    <div style={{ textAlign: 'center', margin: '1rem 0' }}>
      <hr style={{ margin: '1rem 0', border: '1px solid #ddd' }} />
      <a 
        href={link} 
        style={{ 
          color: '#007bff', 
          textDecoration: 'none', 
          fontSize: '0.875rem', 
          fontWeight: 'bold' 
        }}
      >
        View Job
      </a>
    </div>
  );
};

// Example Card component that receives a JSON object as a prop
const Post = ({ data }) => {
  const price = data?.priceQuote?.amount?.$numberInt;
  console.log(price);
  if(price == null || price == 0){
    return null;
  }
  console.log(data["_id"])
  return (
    <div style={{height:'10vh', width: '25rem', margin: '2rem', padding : '2rem', 
                  border: '2px solid black', display: "flex", height : 'fit-content',
                  flexDirection : 'column', justifyContent: "center"}}>
      
      <PostHeader date={data["postedDate"]} price={price}></PostHeader>
      <PostTitle title={data.title}/>
      <Skills skills={data.skillsRequired}/>
      <Description description={data.description}/>
      <ViewJob link={data.link}/>
    </div>
  );
};

const Group = ({data}) => {
  // console.log(data);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', 
                                  alignItems: 'center', width: 'fit-content' }}>
      <Post data={data[0]} />
      <Post data={data[1]} />
      <Post data={data[2]} />
    </div>
  );
}

const GetData = (props) => {
  const jsonData1 = { title: "Plumber", 
    description: "Experienced in fixing leaks and installations. Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.", 
    postedDate:"14/10/2004", price:"2000",
    skillsRequired:["UI/UX", "cleaning", "cooking"],
    link: "www.youtube.com"};

  const jsonData2 = { title: "Gardner", 
      description: "Experienced in fixing leaks and installations. Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.", 
      postedDate:"14/10/2004", price:"2000",
      skillsRequired:["UI/UX", "cleaning", "cooking"],
      link: "www.youtube.com"};

  const data = [jsonData1, jsonData1, jsonData2]

  return data;
}


const FetchData = async (i) => {
    try {
      // Replace with your API endpoint
      const num = 3; 
      const response = await fetch(base_url + `/get_content?num=${num}&i=${i}`);
      const data = await response.json(); // Assuming the response is in JSON format
      // console.log(data[0]["title"]);
      return data; // Return the JSON data
    } 
    catch (error) {
      console.error('Error fetching data from API:', error);
      return []; // Return an empty array in case of error
    }
  };

// const ScrollComponent = () => {
//   const [postCount, setPostCount] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Increment the post count
//       setPostCount(prevCount => prevCount + 1);

//       // Create a new div element to contain the Post component
//       const postContainer = document.createElement('div');
//       document.body.appendChild(postContainer);
    
//       // Create data object
      
//       const jsonData1 = { title: "Plumber", 
//         description: "Experienced in fixing leaks and installations. Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.", 
//         postedDate:"14/10/2004", price:"2000",
//         skillsRequired:["UI/UX", "cleaning", "cooking"],
//         link: "www.youtube.com"};

//       // const data = [jsonData1, jsonData1, jsonData1];

//       const data = FetchData();
//       console.log(data["title"]);

//       // Render the Post component with data object into the newly created div
//       ReactDOM.render(<Group data={data} />, postContainer);
//     };

//     // Add event listener for scroll
//     window.addEventListener('scroll', handleScroll);

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [postCount]); // Dependency array includes postCount

//   return null; // No UI is returned from this component
// };

const ScrollComponent = () => {
  const [data, setData] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const handleScroll = async () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        // Fetch data when user reaches the bottom
        const newData = await FetchData(postCount);
        setData(prevData => [...prevData, ...newData]);

        // Create a new div element to contain the Post component
        const postContainer = document.createElement('div');
        document.body.appendChild(postContainer);

        // Render the Group component with new data into the newly created div
        ReactDOM.render(<Group data={newData} />, postContainer);

        // Update post count to prevent redundant fetches
        setPostCount(prevCount => prevCount + 1);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postCount]); // Dependency array includes postCount to trigger fetch

  return null; // No UI is returned from this component
};


function App() {
  // Define the JSON object you want to pass as a prop
  const jsonData1 = { title: "Plumber", 
                      description: "Experienced in fixing leaks and installations. Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.Experienced in fixing leaks and installations.", 
                      postedDate:"14/10/2004", price:"2000",
                      skillsRequired:["UI/UX", "cleaning", "cooking"],
                      faltu : "Radhika"
                    };
  // const jsonData2 = { title: "Gardener", description: "Experienced in fixing leaks and installations", date:"14/10/2004", price:"2000" };

  const data = [jsonData1, jsonData1, jsonData1];

  return (
    <div>
      <Group data = {data}/>
      <Group data = {data}/>
      <Group data = {data}/>
      <ScrollComponent />
    </div>
  );
}

export default App;