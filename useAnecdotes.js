import { createContext, useContext, useState, useEffect } from "react";
import anecdoteService from '../services/anecdotes'
const AnecdoteContext = createContext();
export const AnecdoteProvider = ({children}) => {
    const [anecdotes, setAnecdotes] = useState([])
    useEffect(() => {
        anecdoteService.getAll().then(initialAnecdotes => {
            setAnecdotes(initialAnecdotes)
        })
    }, [])
    const addNew = async (anecdote) => {
        const newAnecdote = {
            ...anecdote,
            id: Math.round(Math.random() * 100000)
        }
        setAnecdotes(anecdotes.concat(newAnecdote))
    }
    const deleteAnecdote = async (id) => {
        if (anecdoteService.remove) {
            await anecdoteService.remove(id)
        } else if (anecdoteService.delete) {
            await anecdoteService.delete(id)
        }
        setAnecdotes(anecdotes.filter(a => a.id !== id))
    }

    return(
        <AnecdoteContext.Provider value={{anecdotes, addNew, deleteAnecdote}}>
            {children}
        </AnecdoteContext.Provider>
    )
}
export const useAnecdotees = () => {
    return useContext(AnecdoteContext)
}