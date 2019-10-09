import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

const Container = styled.div`
  .search-field {
    position: absolute;
    top: 15%;
    right: 3%;
    input {
      color: #0c0663;
      padding: 8px;
      outline: none;
      cursor: pointer;
      border-radius: 5px;
      font-size: 20px;
      background-color: Transparent;
    }
  }
  @media (max-width: 1200px) and (min-width: 768px) {
  }
  @media (max-width: 768px) and (min-width: 560px) {
  }
  @media (max-width: 560px) {
  }
  @media (max-width: 330px) {
  }
`;
interface IProps {
  items: Array<any> | null;
  search(any): void;
}

function SearchBar(props: IProps) {
  const [filter, setFilter] = useState("");

  const filtered = props.items
    ? props.items.filter((item: any) => {
        return item.name.includes(filter);
      })
    : null;

  const handleChange = e => {
    setFilter(e.target.value);
    props.search(filtered);
  };

  return (
    <Container>
      <div className="search-field">
        <input type="text" placeholder="Search" onChange={handleChange}></input>
      </div>
    </Container>
  );
}
export default SearchBar;
