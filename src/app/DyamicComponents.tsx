import React, { lazy, Suspense } from 'react'
// import Spinner from '../../ui/spinner/Spinner' // Some Spinner
import config from './config/config'
import inputtext from './appComponents/inputtext';
import button from './appComponents/button'

const props:any = {};

const ENUM_STATES  = {
  inputtext: inputtext,
   button: button
};

// const importedComponents = () => {
//   const components = {}
//   for(let i = 0; i < config.length; i++) {
//     components[config[i].name] = (() => import(`${config[i].path}`)
//   }
//   return components
// }

const DynamicComponent = ({type, theme}) => {
  // const Components = importedComponents()

  
  const components = config.filter(c => c.type === type).map(c => {
    const Component = ENUM_STATES[type]
  return <Suspense key={c.name} fallback={"loading"}><Component key={c.name} {...c.props} /></Suspense>
  })
  return <div style={{width: '100%', display: 'grid'}}>{components}</div>
}

export default DynamicComponent