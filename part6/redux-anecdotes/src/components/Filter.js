import { filterChange } from './../reducers/filterReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const condition = event.target.value
    dispatch(filterChange(condition))
    dispatch(setNotification(`Showing results containing ${condition}`, 10))
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
