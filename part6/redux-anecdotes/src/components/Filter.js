import { filterChange } from './../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const condition = event.target.value
    dispatch(filterChange(condition))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input
      name="filter"
      onChange={handleChange} />
    </div>
  )
}

export default Filter
