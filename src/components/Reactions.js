import React from 'react'
import { useAddReactionMutation } from '../features/post/postsSlice'

const Reactions = (props) => {

    const reactions = {
        wow:"😮",
        fire:"🔥",
        clapps:"👏",
        lovely:"😍",
        heart:"❤️",
        coffee:"☕"
    }
    const [addreaction] = useAddReactionMutation()
    let content

    if(props){
      content = Object.entries(reactions).map(([name,emoji])=>{
        return (<button
        key={name}
        className="badge bg-primary mr-1"
        onClick={() =>{
          const newval = props.reactions[name]+1
          addreaction({reactions:{...props.reactions, [name]:newval},postId:props.id})
        }
        }
      >
       {emoji} {props.reactions[name]}
      </button>)
      })
    }


  return (
    <div>
      {content}
    </div>
  )
}

export default Reactions
