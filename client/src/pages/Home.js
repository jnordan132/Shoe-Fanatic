import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";


const Home = () => {
  return (
    <div className="container">
      <div className="headerImgDiv" style={{ width: '100vw', height: '60vh', objectFit:'contain'}}>
      {/* <h1 style={{position:'relative',zIndex:'1',fontSize:'180px',fontFamily:'sans-serif'}}> SHOE FANATIC </h1> */}
        <img src="../images/MJ-header.jpg" style={{width:'inherit',height:'inherit',objectFit:'cover', objectPosition:"50% 90%", filter:"contrast(1.09)"}} ></img>
      </div>
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;
