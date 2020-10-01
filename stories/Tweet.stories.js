//Francis' example
import React from 'react'
import { Tweet } from '../components/Tweet'

export default { title: "Singular Tweet" }

export const emptyTweet = () => <Tweet />

export const populatedTweet = () => {
  const singleTweet = {
    name:"Tenyson Kwon",
    handle:"@k1tumfox",
    profile_image:"https://stuff.png",
    text:"What do you think about muffins?",
    date: "10 days ago"
  }

  // return <Tweet name={singleTweet.name} handle={singleTweet.handle} profile_image={singleTweet.profile_image} />
  return <Tweet {...singleTweet} /> //does the same as above


}