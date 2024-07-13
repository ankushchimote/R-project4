import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/SearchResult/SearchResult';


export const BASE_URL ="http://localhost:9000"  //export word was not there before, due to in searchresult.jsx line15 

const App = () => {

  const [data,setData] =useState({})
  const [filterData,setFilterData] = useState(); //for search functionality,check line24    //before it was null
  const [selectedBtn, setSelectedBtn] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  

  useEffect(() => {
    const fetchFoodData =async () =>{
      setLoading(true)
  
      try {
        const response =await fetch(BASE_URL)
        const json = await response.json()   //learn the meaning of async await again
        
       setData(json)
        
        setFilterData(json)
        setLoading(false)
      } catch (error) {
        setError("Unable to fetch data")
      }
      
     }
     fetchFoodData() 
  },[]) // if u just kept it empty it will load page only 1 time
 



  const searchFood =(e) => {
    const searchValue =e.target.value;
    console.log(searchValue); //try to write in searchbox and see console

    if(searchValue === ""){
      setFilterData(null)
    }

    const filter = data?.filter((food) => {  ///here filter is a function just like tolowercase
     return food.name.toLowerCase().includes(searchValue.toLowerCase())  ///here we wrote return but in video without return working fine
    })
    setFilterData(filter) //the data of filter function will be set in setFilterData
  }

  const filterFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

 

 

  return(
      <>
           <Container>
           <TopContainer>
              <div className="logo">
                <img src="./Foody Zone.png" alt="" />
              </div>
              <div className='search'>
                <input
                onChange={searchFood}
                placeholder='Search Food'
                />
              </div>
           </TopContainer>

           <FilterContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>

         
        
     </Container>
     <SearchResult data={filterData}/>
      </>
  )
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const TopContainer =styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search{
    input{
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`
const FilterContainer =styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 40px;
`
export const Button =styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`

