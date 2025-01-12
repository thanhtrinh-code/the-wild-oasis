import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
export default function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter filterField='discount' options={[
        { value: 'all', label: 'All' },
        { value: 'no-discount', label: 'No discount' },
        { value: 'with-discount', label: 'Discount' },
      ]}/>
    <SortBy options={[
      {value: 'name-asc', label: 'Sort by name (A-Z)'},
      {value: 'name-desc', label: 'Sort by name (Z-A)'},
      {value: 'regularPrice-asc', label: 'Sort by price (Low-High)'},
      {value: 'regularPrice-dsc', label: 'Sort by price (High-Low)'},
      {value: 'maxCapacity-asc', label: 'Sort by capacity (Low-High)'},
      {value: 'maxCapacity-desc', label: 'Sort by capacity (High-Low)'},
    ]}/>
    </TableOperations>
  )
}
