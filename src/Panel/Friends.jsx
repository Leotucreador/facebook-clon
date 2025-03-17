import React from 'react'
import { Header } from '../Componentes/Header'

export const Friends = () => {
  return (
    <>
        <Header/>
        <div class="card text-start">
            <img class="card-img-top" src="holder.js/100px180/" alt="Title" />
            <div class="card-body">
                <h4 class="card-title">Title</h4>
                <p class="card-text">Body</p>
            </div>
        </div>
        
    </>
  )
}
