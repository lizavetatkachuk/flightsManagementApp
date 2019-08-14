import React from 'react'
import './SearchForm.scss'
class SearchForm extends React.Component{
    render(){
        return(
<div className="search-form">
        <div className="search-form__search-field" >
          <div className="search-form__search-field_component">
          <p> From</p> 
          </div>
          <div className="search-form__search-field_component">
          <p> Shift</p> 
          </div>
          <div className="search-form__search-field_component">
          <p> To</p> 
          </div>
        </div>
        <div className="search-form__search-field" >
        <div className="search-form__search-field_component">
          <p> One way</p> 
          </div>
          <div className="search-form__search-field_component">
          <p> Return</p> 
          </div>
        </div>
        <div className="search-form__search-field" >
        <div className="search-form__search-field_component">
          <p> Fly there</p> 
          </div>
          <div className="search-form__search-field_component">
          <p> Fly back</p> 
          </div>
        </div>
      </div>
        )
    }
}
export default SearchForm;