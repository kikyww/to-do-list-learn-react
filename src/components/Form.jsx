import { useState, useEffect } from 'react'
import AlarmSwitch from './AlarmSwitch'
import Button from './Button'
import Header from './Header'
import Input from './Input'
import Footer from './Footer'
import List from './List'

	const getFromLocalStorage = (key) => {
  	const storedData = localStorage.getItem(key)
  	return storedData ? JSON.parse(storedData) : null
	}

const Form = () => {
	const getCurrentTime = () => {
	  const currentTime = new Date()
	  const currentHours = currentTime.getHours()
	  const currentMinutes = currentTime.getMinutes()
	
	  const addLeadingZero = (number) => {
	    return number < 10 ? `0${number}` : number
	  }
	
	  const formattedHours = addLeadingZero(currentHours)
	  const formattedMinutes = addLeadingZero(currentMinutes)
	
	  return `${formattedHours}:${formattedMinutes}`
	}


	const [items, setItems] = useState(getFromLocalStorage('myItems') || [])
	const [isAlarmActive, setIsAlarmActive] = useState(true)
	const [currentDeviceTime, setCurrentDeviceTime] = useState(getCurrentTime())

	useEffect(() => {
		saveToLocalStorage('myItems', items)
	}, [items])

	useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentDeviceTime(getCurrentTime())
    if (alarmOn()) {
      showNotification()
    }

    if (currentDeviceTime === '00:00') {
      clearAllTasks()
    }
  }, 1000)
  	return () => clearInterval(intervalId)
	}, [currentDeviceTime, items])

	const handleAddItem = (newItem) => {
		setItems([...items, newItem])
	}

	const handleDeleteItem = (id) => {
		setItems((items) => items.filter((item) => item.id !== id))
	}

	const handleToggleItem = (id) => {
		setIsAlarmActive(!isAlarmActive)
	}

	const handleCheckedItem = (id) => {
		setItems((items) => items.map((item) => item.id === id ? {...item, checked: !item.checked} : item))
	}

	const handleClearItems = () => {
		setItems([])
	}

	const itemsCounter = () => {
    return items.length
  }

  const completedCounter = () => {
  	return items.filter((item) => item.checked).length
  }

	const saveToLocalStorage = (key, items) => {
		localStorage.setItem(key,JSON.stringify(items))
	}

	const alarmOn = () => {
		return items.some((item) => item.alarm)
	}

	const showNotification = () => {
	  const currentDeviceTime = getCurrentTime()
	  // const audio = new Audio('/assets/sound/alarm.wav')
	  items.forEach((item) => {
	    if (item.alarm && item.time === currentDeviceTime) {
	      if ('Notification' in window) {
	        Notification.requestPermission().then((permission) => {
	          if (permission === 'granted') {
	          	// audio.play()
	            new Notification('Notifikasi!', {
	              body: `Segera Kerjakan ${item.task}`,
	            })
	          }
	        })
	      }
	    }
	  })
	}


	const handleAlarm = () => {
		const updateItems = items.map((item) => (item.alarm === false ? {...item, alarm : true} : {...item, alarm : false}))

		setItems(updateItems)
		saveToLocalStorage('myItems', updateItems)
		
	}
  	
	return(
		<div className="flex flex-col mx-auto my-6 w-[350px] lg:w-[480px] w-max gap-3 bg-neutral-400 p-3 rounded-xl border-2 border-stone-700">
			<Header />
			<Input onAddItem={handleAddItem} />
			<div>
				<ul>
					{items.map((item) => (
						<List item={item} key={item.id} onDeleteItem={handleDeleteItem} onToggleItem={handleCheckedItem} />
					))}
				</ul>
			</div>
			<div className="flex justify-between gap-2 items-center">
				<AlarmSwitch onAlarmClick={() => handleAlarm()} alarmOn={alarmOn()} itemsCounter={itemsCounter()} />
				<Button onButtonClick={handleClearItems} />
			</div>
			<Footer itemsCounter={itemsCounter()} completedCounter={completedCounter()} alarmOn={alarmOn()} />
		</div>
	)
}

export default Form