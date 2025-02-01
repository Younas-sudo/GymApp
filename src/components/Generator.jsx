
import SectionWrapper from './SectionWrapper'
import { WORKOUTS } from '../utils/swolder'
import { SCHEMES } from '../utils/swolder'
import { useState } from 'react'

const Header = ({ index, title, description }) => {
  return (
    <div className='flex flex-col gap-2 '>
      <div className='flex items-center gap-2 justify-center'>
        <p className='text-3xl sm:text-4xl md:text-5xl lg:5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl section-2xl md:text-3xl '>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )
}

const Generator = () => {
  const [showModel, setShowModel] = useState(false);
  const [poison, setPoison] = useState('individual')

  const [muscles, setMuscles] = useState([])

  const [goals, setGoals] = useState('strength_power')

  const updateMuscles = (muscleGroup) => {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val != muscleGroup))
      return
    }

    if(muscles.length > 2){
      return
    }

    if(poison !== 'individual'){
      setMuscles([muscleGroup])
      setShowModel(false)
      return
    }



    const newMuscles = [...muscles, muscleGroup]
    setMuscles(newMuscles)

    if (newMuscles.length === 3) {
      setShowModel(false) 
    }
  }

  const toggleModal = () => {
    setShowModel(prev => !prev); // Toggle state properly
  }

  return (
    <SectionWrapper header="Generate Your Workout" title={["It's", "Huge", "O'Clock"]}>
      <Header index="01" title="Pick Your Poison" description="Select the workout you wish to endure" />
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button onClick={() => { 
              setMuscles([])
              setPoison(type) 
              } } key={typeIndex} className={'bg-slate-950 border border-blue-400 py-3 rounded-lg duration-200 hover:border-blue-600' + (type === poison ? ' border-blue-600' : ' border-blue-400')} >
              <p className='capitalize ' >{type.replaceAll('_', ' ')}</p>
            </button>
          )
        })}
      </div>
      <Header index="02" title="Lock on targets" description="Select the muscles jedged for annihalation." />
      <div className='bg-slate-950  border border-solid border-blue-400 rounded-lg flex flex-col'>
        <button onClick={toggleModal} className='relative flex p-3 items-center  w-full'>
          <p className='flex-1 text-center capitalize' >{muscles.length == 0 ? 'Select muscle groups: ' : muscles.join(' || ')} <i className="fa-solid fa-arrow-right pb-1 "></i>  Select muscle groups</p>
          <i className='fa-solid fa-caret-down'></i>
        </button>

        {showModel && (
          <div className='flex flex-col px-3 pb-3'>
            {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => updateMuscles(muscleGroup)}  
                  key={muscleGroupIndex}
                  className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? 'text-blue-400' : '')} 
                >
                  <p className='uppercase'>{muscleGroup.replaceAll('_', ' ')}</p>
                </button>
              )
            })}
          </div>

        )}
      </div>
      <Header index="03" title="Become Juggernaut" description="Select your ultimate objective." />
      <div className='grid grid-cols-3 gap-4'>
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button onClick={(e) => { setGoals(scheme) }} key={schemeIndex} className={'bg-slate-950 border border-blue-400 py-3 rounded-lg duration-200 hover:border-blue-600' + (scheme === goals ? ' border-blue-600' : ' border-blue-400')} >
              <p className='capitalize ' >{scheme.replaceAll('_', ' ')}</p>
            </button>
          )
        })}
      </div>



    </SectionWrapper>
  )
}

export default Generator
