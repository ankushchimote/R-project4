import React from 'react'
import styled from 'styled-components'
import { BASE_URL } from '../../App'
import { Button, Container } from '../../App' //this comming from app.jsx css

const SearchResult = ({data}) => {  ///here we just changed name of data into food to avoid confusion
  return (
    <FoodCardContainer>
    <Container>
    <FoodCards>
        {
            data?.map(({name, image, text, price}) => 
            <FoodCard     ///try to remove "?" and see console,   this ? check if we got data then render data and if we didnt get data then show nothing(null)
            key={name}      //////try to understand this code from line 7 to 17
            >
                <div className="food_image">
                    {/* uncomment the line 15 to see error */}
                    {/* //<img src={food.image} />  if we run this and see console it will show error that image is on 9000 and u r on 5173 :::: to overcome this we exported BASE_URL */}
                    <img src={BASE_URL + image} />
                    </div>

                    <div className="food_info">
                        <div className="info">
                            <h3>{name}</h3>
                            <p>{text}</p>
                        </div>
                        <Button>${price.toFixed(2)}</Button>
                        </div>    
            </FoodCard>)

            
        }
    </FoodCards>
    </Container>
  </FoodCardContainer>
  )
}

export default SearchResult

const FoodCardContainer =styled.section`
  height: calc(100vh - 210px); // we use calc to eliminate scroll by subtracting
  background-image: url('./bg.png');
  background-size: cover;
  padding: 40px;
`
const FoodCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 32px;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`
const FoodCard = styled.div`
   width: 340px;
  height: 167px;
  border: 0.66px solid;

  border-image-source: radial-gradient(
      80.69% 208.78% at 108.28% 112.58%,
      #eabfff 0%,
      rgba(135, 38, 183, 0) 100%
    ),
    radial-gradient(
      80.38% 222.5% at -13.75% -12.36%,
      #98f9ff 0%,
      rgba(255, 255, 255, 0) 100%
    );

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);

  border-radius: 20px;

  display: flex;
  padding: 8px;

  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
    button {
      font-size: 12px;
    }
  }
`
