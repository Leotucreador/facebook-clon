import React from 'react'
import { Header } from '../Componentes/Header'

export const Gaming = () => {
  return (
    <div>
      <Header/>
      <h1><div class="card bg-dark text-white">
        <img class="card-img" src="holder.js/100x180/" alt="Title" />
        <div class="card-img-overlay">
          <h4 class="card-title">Title</h4>
          <p class="card-text">Text</p>
        </div>
      </div>
      </h1>
    </div>
  )
}
