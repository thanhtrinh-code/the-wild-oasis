import { useSearchParams } from "react-router-dom";
import Select from "./Select";


export default function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || '' // get the current value from the url

    function handleChange(e){
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);  // update the state in the url 
    }
    return (
        <Select options={options} 
        type='white'
        value={sortBy}
        onChange={handleChange}/>
    )
}
