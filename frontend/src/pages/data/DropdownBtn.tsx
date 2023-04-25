import Dropdown from 'react-bootstrap/Dropdown';
import "./buttons.css"

interface Props {
  onOptionSelected: (option: number) => void;
}

const DropdownBtn: React.FC<Props> = ({ onOptionSelected }) => {
  return (
    <Dropdown onSelect={(eventKey: any) => onOptionSelected(Number(eventKey))} className='FilterButton' color="#ff5c5c">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter Reuslts
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="0">All Rows</Dropdown.Item>
        <Dropdown.Item eventKey="1">ALLSKY_KT</Dropdown.Item>
        <Dropdown.Item eventKey="2">CLOUD_AMT</Dropdown.Item>
        <Dropdown.Item eventKey="3">TOA_SW_DWN</Dropdown.Item>
        <Dropdown.Item eventKey="4">ALLSKY_SRF_ALB</Dropdown.Item>
        <Dropdown.Item eventKey="5">ALLSKY_SFC_SW_DNI</Dropdown.Item>
        <Dropdown.Item eventKey="6">ALLSKY_SFC_SW_DWN</Dropdown.Item>
        <Dropdown.Item eventKey="7">CLRSKY_SFC_SW_DWN	</Dropdown.Item>
        <Dropdown.Item eventKey="8">ALLSKY_SFC_PAR_TOT</Dropdown.Item>
        <Dropdown.Item eventKey="9">ALLSKY_SFC_SW_DIFF</Dropdown.Item>
        <Dropdown.Item eventKey="10">SI_EF_TILTED_SURFACE_HORIZONTAL</Dropdown.Item>
        <Dropdown.Item eventKey="11">SI_EF_TILTED_SURFACE_LAT_MINUS15</Dropdown.Item>
        <Dropdown.Item eventKey="12">SI_EF_TILTED_SURFACE_LATITUDE</Dropdown.Item>
        <Dropdown.Item eventKey="13">SI_EF_TILTED_SURFACE_LAT_PLUS15</Dropdown.Item>
        <Dropdown.Item eventKey="14">SI_EF_TILTED_SURFACE_VERTICAL</Dropdown.Item>
        <Dropdown.Item eventKey="15">SI_EF_TILTED_SURFACE_OPTIMAL</Dropdown.Item>
        <Dropdown.Item eventKey="16">SI_EF_TILTED_SURFACE_OPTIMAL_ANG</Dropdown.Item>
        <Dropdown.Item eventKey="17">SI_EF_TILTED_SURFACE_OPTIMAL_ANG_ORT</Dropdown.Item>
        <Dropdown.Item eventKey="18">ALLSKY_SFC_SW_DWN_00</Dropdown.Item>
        <Dropdown.Item eventKey="19">ALLSKY_SFC_SW_DWN_01</Dropdown.Item>
        <Dropdown.Item eventKey="20">ALLSKY_SFC_SW_DWN_02</Dropdown.Item>
        <Dropdown.Item eventKey="21">ALLSKY_SFC_SW_DWN_03</Dropdown.Item>
        <Dropdown.Item eventKey="22">ALLSKY_SFC_SW_DWN_04</Dropdown.Item>
        <Dropdown.Item eventKey="23">ALLSKY_SFC_SW_DWN_05</Dropdown.Item>
        <Dropdown.Item eventKey="24">ALLSKY_SFC_SW_DWN_06</Dropdown.Item>
        <Dropdown.Item eventKey="25">ALLSKY_SFC_SW_DWN_07</Dropdown.Item>
        <Dropdown.Item eventKey="26">ALLSKY_SFC_SW_DWN_08</Dropdown.Item>
        <Dropdown.Item eventKey="27">ALLSKY_SFC_SW_DWN_09</Dropdown.Item>
        <Dropdown.Item eventKey="28">ALLSKY_SFC_SW_DWN_10</Dropdown.Item>
        <Dropdown.Item eventKey="29">ALLSKY_SFC_SW_DWN_11</Dropdown.Item>
        <Dropdown.Item eventKey="30">ALLSKY_SFC_SW_DWN_12</Dropdown.Item>
        <Dropdown.Item eventKey="31">ALLSKY_SFC_SW_DWN_13</Dropdown.Item>
        <Dropdown.Item eventKey="32">ALLSKY_SFC_SW_DWN_14</Dropdown.Item>
        <Dropdown.Item eventKey="33">ALLSKY_SFC_SW_DWN_15</Dropdown.Item>
        <Dropdown.Item eventKey="34">ALLSKY_SFC_SW_DWN_16</Dropdown.Item>
        <Dropdown.Item eventKey="35">ALLSKY_SFC_SW_DWN_17</Dropdown.Item>
        <Dropdown.Item eventKey="36">ALLSKY_SFC_SW_DWN_18</Dropdown.Item>
        <Dropdown.Item eventKey="37">ALLSKY_SFC_SW_DWN_19</Dropdown.Item>
        <Dropdown.Item eventKey="38">ALLSKY_SFC_SW_DWN_20</Dropdown.Item>
        <Dropdown.Item eventKey="39">ALLSKY_SFC_SW_DWN_21</Dropdown.Item>
        <Dropdown.Item eventKey="40">ALLSKY_SFC_SW_DWN_22</Dropdown.Item>
        <Dropdown.Item eventKey="41">ALLSKY_SFC_SW_DWN_23</Dropdown.Item>
        <Dropdown.Item eventKey="42">TS</Dropdown.Item>
        <Dropdown.Item eventKey="43">T2M</Dropdown.Item>
        <Dropdown.Item eventKey="44">QV2M</Dropdown.Item>
        <Dropdown.Item eventKey="45">RH2M</Dropdown.Item>
        <Dropdown.Item eventKey="46">SG_DEC</Dropdown.Item>
        <Dropdown.Item eventKey="47">T2MDEW</Dropdown.Item>
        <Dropdown.Item eventKey="48">T2MWET</Dropdown.Item>
        <Dropdown.Item eventKey="49">SG_NOON</Dropdown.Item>
        <Dropdown.Item eventKey="50">FROST_DAYS</Dropdown.Item>
        <Dropdown.Item eventKey="51">PRECTOTCORR</Dropdown.Item>
        <Dropdown.Item eventKey="52">SG_DAY_HOURS</Dropdown.Item>
        <Dropdown.Item eventKey="53">SG_HR_SET_ANG</Dropdown.Item>
        <Dropdown.Item eventKey="54">PRECTOTCORR_SUM</Dropdown.Item>
        <Dropdown.Item eventKey="55">SG_DAY_COZ_ZEN_AVG</Dropdown.Item> 
        <Dropdown.Item eventKey="56">SG_MID_COZ_ZEN_ANG</Dropdown.Item>
        <Dropdown.Item eventKey="57">SG_HRZ_00</Dropdown.Item>
        <Dropdown.Item eventKey="58">SG_HRZ_01</Dropdown.Item>
        <Dropdown.Item eventKey="59">SG_HRZ_02</Dropdown.Item>
        <Dropdown.Item eventKey="60">SG_HRZ_03</Dropdown.Item>
        <Dropdown.Item eventKey="61">SG_HRZ_04</Dropdown.Item>
        <Dropdown.Item eventKey="62">SG_HRZ_05</Dropdown.Item>
        <Dropdown.Item eventKey="63">SG_HRZ_06</Dropdown.Item>
        <Dropdown.Item eventKey="64">SG_HRZ_07</Dropdown.Item>
        <Dropdown.Item eventKey="65">SG_HRZ_08</Dropdown.Item>
        <Dropdown.Item eventKey="66">SG_HRZ_09</Dropdown.Item>
        <Dropdown.Item eventKey="67">SG_HRZ_10</Dropdown.Item>
        <Dropdown.Item eventKey="68">SG_HRZ_11</Dropdown.Item>
        <Dropdown.Item eventKey="69">SG_HRZ_12</Dropdown.Item>
        <Dropdown.Item eventKey="70">SG_HRZ_13</Dropdown.Item>
        <Dropdown.Item eventKey="71">SG_HRZ_14</Dropdown.Item>
        <Dropdown.Item eventKey="72">SG_HRZ_15</Dropdown.Item>
        <Dropdown.Item eventKey="73">SG_HRZ_16</Dropdown.Item>
        <Dropdown.Item eventKey="74">SG_HRZ_17</Dropdown.Item>
        <Dropdown.Item eventKey="75">SG_HRZ_18</Dropdown.Item>
        <Dropdown.Item eventKey="76">SG_HRZ_19</Dropdown.Item>
        <Dropdown.Item eventKey="77">SG_HRZ_20</Dropdown.Item>
        <Dropdown.Item eventKey="78">SG_HRZ_21</Dropdown.Item>
        <Dropdown.Item eventKey="79">SG_HRZ_22</Dropdown.Item>
        <Dropdown.Item eventKey="80">SG_HRZ_23</Dropdown.Item>
        <Dropdown.Item eventKey="81">PS</Dropdown.Item>
        <Dropdown.Item eventKey="82">WD10M</Dropdown.Item>
        <Dropdown.Item eventKey="83">WD50M</Dropdown.Item>
        <Dropdown.Item eventKey="84">WS10M</Dropdown.Item>
        <Dropdown.Item eventKey="85">WS50M</Dropdown.Item>
        <Dropdown.Item eventKey="86">MIDDAY_INSOL</Dropdown.Item>
        <Dropdown.Item eventKey="87">INSOL_CONSEC_MONTH</Dropdown.Item>
        <Dropdown.Item eventKey="88">EQUIV_NO_SUN_CONSEC_MONTH</Dropdown.Item>
        <Dropdown.Item eventKey="89">SOLAR_DEFICITS_CONSEC_MONTH</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownBtn;
