import React from 'react'

export const Menu = () => {
  return (
    <>
    <div
      class="card"
      style="
        background-color:$ {
          1: orangered;
        }
        border-color:$ {
          2: darkblue;
        }
      "
    >
      <img class="card-img-top" src="holder.js/100x180/" alt="Title" />
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Text</p>
      </div>
    </div>
    
    </>
  )
}
