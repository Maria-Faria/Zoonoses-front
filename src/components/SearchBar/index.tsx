import React from "react";

interface SearchBarInterface {
  placeholder: string
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => void
}

//(event) => setFilterValue(event.target.value)

function SearchBar({ placeholder, onKeyUp, onChange, onClick }: SearchBarInterface) {
  return (
    <div className="searchbar" style={{display: 'flex', alignSelf: 'start'}}>
      <input placeholder={placeholder} onKeyUp={onKeyUp} onChange={onChange} style={{width: '500px'}}></input>
      <img src="/search.svg" alt="search" width={30} height={30} style={{cursor: 'pointer'}} onClick={onClick}/>
    </div>
  )
}

export default SearchBar;