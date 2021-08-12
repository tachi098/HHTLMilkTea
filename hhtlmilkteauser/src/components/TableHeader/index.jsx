import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

const TableHeader = ({
  valueToOrderBy,
  valueToSortDir,
  handleRequestSort,
  fields,
}) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {fields.map((field, index) => (
          <TableCell key={index}>
            {field.name ? (
              <TableSortLabel
                active={Object.is(valueToOrderBy, field.name)}
                direction={
                  Object.is(valueToOrderBy, field.name)
                    ? valueToSortDir
                    : field.dir
                }
                onClick={createSortHandler(field.name)}
              >
                {field.lable}
              </TableSortLabel>
            ) : (
              field.lable
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
