import { useState, useEffect }  from 'react';
import Switch from '@mui/material/Switch';

const AlarmSwitch= ({onAlarmClick, alarmOn, itemsCounter}) => {
  const [checked, setChecked] = useState(false);
   
   const handleChange = (event) => {
   	if(!itemsCounter) return
    setChecked(event.target.checked);
    onAlarmClick();
  };

  useEffect(() => {
    setChecked(alarmOn);
  }, [alarmOn]);

	return(
		<div className="w-16 border-2 border-violet-600 rounded-full bg-stone-700">
			<Switch
				checked={checked}
      	inputProps={{ 'aria-label': 'controlled' }}
    		onChange={handleChange}
    	/>
		</div>
	)
}

export default AlarmSwitch