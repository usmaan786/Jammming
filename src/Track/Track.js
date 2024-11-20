import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Track = ({track, onAdd, onRemove, isRemoval}) => {
    const handleClick = () => {
        isRemoval ? onRemove(track) : onAdd(track);
    }

    return(
        <div className="Track">
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
            <button className="btn btn-light btn-sm" onClick={handleClick}>{isRemoval ? '-' : '+'}</button>
        </div>
    )
}

export default Track;