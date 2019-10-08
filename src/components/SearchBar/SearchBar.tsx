import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { api } from "./../../helpers/apiHeler";
import { object } from "prop-types";

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

function SearchBar(Props: IProps) {
  const [filter, setFilter] = useState("");

  const filtered = Props.items
    ? Props.items.filter((item: any) => {
        return item.name.includes(filter);
      })
    : null;

  return (
    <Container>
      <div className="search-field">
        <input
          type="text"
          placeholder="Search"
          onChange={e => {
            setFilter(e.target.value);
            Props.search(filtered);
          }}
        ></input>
      </div>
    </Container>
  );
}
export default SearchBar;
