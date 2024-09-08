// import React, { useEffect, useState, memo } from 'react';
// import ReactDOM from 'react-dom';

// // Constants
// const BASE_URL = `https://us-central1-hire4change.cloudfunctions.net/recommendation`;

// // Reusable Components
// const PostTitle = memo(({ title }) => (
//   <div style={{display: 'flex', justifyContent: "center"}}>
//       <h1>{title}</h1>
//   </div>
// ));

// const PostDate = memo(({ date }) => (
//   <div style={{ color: '#6c757d', fontSize: '0.875rem', fontStyle: 'italic' }}>
//       {date}
//   </div>
// ));

// const PriceQuote = memo(({ price }) => (
//   <div style={{ fontWeight: '600', fontSize: '1.25rem' }}>
//       ₹ {price} / hour
//   </div>
// ));

// const PostHeader = memo(({ date, price }) => (
//   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//       <PostDate date={date} />
//       <PriceQuote price={price} />
//   </div>
// ));

// const SkillButton = memo(({ skill }) => (
//   <div 
//       style={{ 
//         width : 'fit-content',
//         border: '2px solid black', 
//         borderRadius: '20px',      
//         display: 'inline-flex',   
//         alignItems: 'center',     
//         padding: '0.25rem 0.5rem', // Reduced padding for a smaller button
//         marginLeft: '1rem',
//         textAlign: 'center',      
//         whiteSpace: 'nowrap',     
//         boxSizing: 'border-box',  
//         backgroundColor: '#f0f0f0', 
//         cursor: 'pointer',
//         fontSize: '0.875rem'       // Smaller font size for a compact look
//       }}
//     >
//       {skill}
//     </div>
// ));

// const Skills = memo(({ skills }) => (
//   <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
//       {skills.map((skill, index) => (
//         <SkillButton key={index} skill={skill} />
//       ))}
//   </div>
// ));

// const Description = memo(({ description }) => {
//   const truncatedDescription = description.length > 300
//     ? description.slice(0, 300) + '...'
//     : description;

//   return (
//     <div style={{ 
//       textAlign: 'center', 
//       color: '#888', 
//       fontSize: '0.875rem', 
//       margin: '1rem 0'
//     }}>
//       <p>{truncatedDescription}</p>
//     </div>
//   );
// });

// const ViewJob = memo(({ link }) => (
//   <div style={{ textAlign: 'center', margin: '1rem 0' }}>
//       <hr style={{ margin: '1rem 0', border: '1px solid #ddd' }} />
//       <a 
//         href={link} 
//         style={{ 
//           color: '#007bff', 
//           textDecoration: 'none', 
//           fontSize: '0.875rem', 
//           fontWeight: 'bold' 
//         }}
//       >
//         View Job
//       </a>
//     </div>
// ));

// // Main Post Component
// const Post = memo(({ data }) => {
//   const price = data?.priceQuote?.amount?.$numberInt;
//   console.log(price);
//   if(price == null || price == 0){
//     return null;
//   }
//   console.log(data["_id"])
//   return (
//     <div style={{height:'10vh', width: '25rem', margin: '2rem', padding : '2rem', 
//                   border: '2px solid black', display: "flex", height : 'fit-content',
//                   flexDirection : 'column', justifyContent: "center"}}>
      
//       <PostHeader date={data["postedDate"]} price={price}></PostHeader>
//       <PostTitle title={data.title}/>
//       <Skills skills={data.skillsRequired}/>
//       <Description description={data.description}/>
//       <ViewJob link={data.link}/>
//     </div>
//   );
// });

// // Group Component
// const Group = memo(({ data }) => (
//   <div style={{ display: 'flex', flexDirection: 'row', 
//     alignItems: 'center', width: 'fit-content' }}>
//   <Post data={data[0]} />
//   <Post data={data[1]} />
//   <Post data={data[2]} />
//   </div>
// ));

// // Fetch Data Function
// const fetchData = async (i) => {
//   try {
//     const response = await fetch(`${BASE_URL}/get_content?num=3&i=${i}`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching data from API:', error);
//     return [];
//   }
// };

// // ScrollComponent
// const ScrollComponent = () => {
//   const [data, setData] = useState([]);
//   const [postCount, setPostCount] = useState(0);

//   useEffect(() => {
//     const handleScroll = async () => {
//       if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
//         const newData = await fetchData(postCount);
//         setData(prevData => [...prevData, ...newData]);
//         setPostCount(prevCount => prevCount + 1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [postCount]);

//   return <Group data={data} />;
// };

// // Main App Component
// function App() {
//   const jsonData1 = {
//     title: "Plumber",
//     description: "Experienced in fixing leaks and installations...",
//     postedDate: "14/10/2004",
//     priceQuote: { amount: { $numberInt: 2000 } },
//     skillsRequired: ["UI/UX", "cleaning", "cooking"],
//     link: "www.youtube.com"
//   };

//   const data = [jsonData1, jsonData1, jsonData1];

//   return (
//     <div>
//       <Group data={data} />
//       <Group data={data} />
//       <ScrollComponent />
//     </div>
//   );
// }

// export default App;

import React, { createContext, useContext, useEffect, useState, useRef, memo } from 'react';
import ReactDOM from 'react-dom';
import './App.css'

// Constants
const BASE_URL = `https://us-central1-hire4change.cloudfunctions.net/recommendation`;
var size;

// Reusable Components
const PostTitle = memo(({ title }) => (
  <div className="post-title">
    <h1>{title}</h1>
  </div>
));

const PostDate = memo(({ date }) => (
  <div className="post-date">
    {date}
  </div>
));

const PriceQuote = memo(({ price }) => (
  <div className="price-quote">
    ₹ {price} / hour
  </div>
));

const PostHeader = memo(({ date, price }) => (
  <div className="post-header">
    <PostDate date={date} />
    <PriceQuote price={price} />
  </div>
));

const SkillButton = memo(({ skill }) => (
  <div className="skill-button">
    {skill}
  </div>
));

const Skills = memo(({ skills }) => (
  <div className="skills">
    {skills.map((skill, index) => (
      <SkillButton key={index} skill={skill} />
    ))}
  </div>
));

const Description = memo(({ description }) => {
  const truncatedDescription = description.length > 300
    ? description.slice(0, 300) + '...'
    : description;

  return (
    <div className="description">
      <p>{truncatedDescription}</p>
    </div>
  );
});

const ViewJob = memo(({ link }) => (
  <div className="view-job">
    <hr />
    <a href={link} className="view-job-link">
      View Job
    </a>
  </div>
));

// Main Post Component
const Post = memo(({ data }) => {
  const price = data?.priceQuote?.amount?.$numberInt;
  console.log(data["_id"]);
  if (price == null || price == 0) {
    return null;
  }

  return (
    <div className="post">
      <PostHeader date={data.postedDate} price={price} />
      <PostTitle title={data.title} />
      <Skills skills={data.skillsRequired} />
      <Description description={data.description} />
      <ViewJob link={data.link} />
    </div>
  );
});

// Group Component
const Group = memo(({ data }) => (
  <div className="group flex-container">
    {data.map((item, index) => (
      <Post key={index} data={item} className = "flex-item"/>
    ))}
  </div>
));

// Fetch Data Function
const fetchData = async (i) => {
  try {
    const response = await fetch(`${BASE_URL}/get_content?num=${3}&i=${i}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return [];
  }
};

const ScrollComponent = () => {
  const [data, setData] = useState([]);
  const [postCount, setPostCount] = useState(2);
  const containerRef = useRef(null);

  useEffect(() => {

    const handleScroll = async () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        // Fetch data when user reaches the bottom
        const newData = await fetchData(postCount);
        setData(prevData => [...prevData, ...newData]);

        // Append new Group components to the container
        if (containerRef.current) {
          const newGroupContainer = document.createElement('div');
          newGroupContainer.style.display = 'flex';
          newGroupContainer.style.flexDirection = 'row';
          containerRef.current.appendChild(newGroupContainer);

          ReactDOM.render(<Group data={newData} />, newGroupContainer);

          // Update post count to prevent redundant fetches
          setPostCount(prevCount => prevCount + 1);
        }
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postCount]);

  return <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column' }}></div>;
};

const InitialComponent = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
    const fetchDataAsync = async () => {
      try {
        const data1 = await fetchData(0); // Pass initial count as 1
        const data2 = await fetchData(1);
        const data3 = await fetchData(2);

        const groupData = [
          { id: 1, items: data1 },
          { id: 2, items: data2 },
          { id: 3, items: data3}
        ];

        setGroups(groupData); // Update state with fetched data for both groups
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <div className="initial-component">
      {groups.map((group) => (
          <Group data={group.items} />
      ))}
    </div>
  );
};

// Main App Component
function App() {
  console.log("Size is " + size);

  const jsonData1 = {
    title: "Plumber",
    description: "Experienced in fixing leaks and installations...",
    postedDate: "14/10/2004",
    priceQuote: { amount: { $numberInt: 2000 } },
    skillsRequired: ["UI/UX", "cleaning", "cooking"],
    link: "www.youtube.com"
  };

  const data = [jsonData1, jsonData1, jsonData1];

  return (
    <div style = {{display : 'flex', flexDirection : 'column', 
                  height : '100vh', width : '100vw'}}>
      <div><InitialComponent /></div>
      <div><ScrollComponent /></div>
    </div>
  );
}

export default App;
