import Dropdown from 'react-bootstrap/Dropdown';
import "./FilterAndSort.css"

interface Props {
  onOptionSelected: (option: number) => void;
}

const DropdownBtn: React.FC<Props> = ({ onOptionSelected }) => {
  return (
    <Dropdown onSelect={(eventKey: any) => onOptionSelected(Number(eventKey))}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="0">All Rows</Dropdown.Item>
        <Dropdown.Item eventKey="1">ALLSKY_KT Row</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownBtn;
