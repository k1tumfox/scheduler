import React from 'react'
import './Tweet.css'

export const Tweet = props => {
  const {name, handle, text, profile_image, date} = props

  return(
    <>
      {name && handle && text && profile_image && date && 
      (
    <article className="tweet">
      <header className="tweet--header">
        <img className="tweet--avatar" src={profile_image} />
        <h2 className="tweet--name">{name}</h2>
        <small className="tweet--handle">{handle}</small>
      </header>
      <div className="tweet--body">
        <p>{text}</p>
      </div>
      <footer className="tweet--footer">
        <small className="footer--age">{date}</small>
        <span className="footer--actions">
          <a href='#'><i className="fa fa-flag"></i></a>
          <a href='#'><i className="fa fa-retweet"></i></a>
          <a href='#'><i className="fa fa-heart"></i></a>
        </span>
        <small></small>
      </footer>
    </article>
      )
    }
    </>
  )

}