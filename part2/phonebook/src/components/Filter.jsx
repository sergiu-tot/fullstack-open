const Filter = ({value, setNewFilter}) => <div>filter shown with: <input value={value} onChange={(event) => setNewFilter(event.target.value)} /></div>

export default Filter