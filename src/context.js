import React , {useContext,useReducer} from 'react'
import { reducer } from './reducer'

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const initialState = {
        user:null,
        token:null
    }

    const setUser = (authUser) => {
        dispatch({type:"SET_USER", payload:authUser})
    }

    const setToken = (authToken) => {
        dispatch({type:"SET_TOKEN", payload:authToken})
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <AppContext.Provider value={{...state, setUser,setToken}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return(
        useContext(AppContext)
    )
}

export {AppProvider}