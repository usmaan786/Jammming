import React from "react";

const Track = ({track, onAdd, onRemove, isRemoval}) => {
    const handleClick = () => {
        isRemoval ? onRemove(track) : onAdd(track);
    }

    return(
        <div className="Track">
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
            <button onClick={handleClick}>{isRemoval ? '-' : '+'}</button>
        </div>
    )
}

export default Track;