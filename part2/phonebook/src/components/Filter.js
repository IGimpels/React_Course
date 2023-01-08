const Filter = ({ searchValue, onSearchValueChanged }) => {
    return (<div>filter shown with <input value={searchValue} onChange={onSearchValueChanged} /></div>)
}

export default Filter