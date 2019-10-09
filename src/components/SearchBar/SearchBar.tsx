import React from "react";
import styled from "styled-components";

const SearchField = styled.input`
  position: absolute;
  top: 15%;
  right: 3%;
  color: #0c0663;
  padding: 8px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
  background-color: Transparent;

  @media (max-width: 1200px) and (min-width: 768px) {
    right: 2%;
  }
  @media (max-width: 768px) and (min-width: 560px) {
    position: static;
    width: 23%;
    margin-right: 5px;
  }
  @media (max-width: 560px) {
    position: static;
    width: 27%;
    margin-right: 5px;
    font-size: 18px;
  }
  @media (max-width: 330px) {
    position: static;
    width: 30%;
    margin-right: 5px;
    font-size: 18px;
  }
`;

interface IProps {
  items: Array<any> | null;
  search(any): void;
}

function SearchBar(props: IProps) {
  const handleChange = e => {
    props.search(e.target.value);
  };

  return (
    <React.Fragment>
      <SearchField
        type="text"
        placeholder="Search"
        onChange={handleChange}
      ></SearchField>
    </React.Fragment>
  );
}
export default SearchBar;
