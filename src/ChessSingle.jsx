import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

export const ChessSingle = () =>{
    const params = useParams();
    const id = params.chessId;
    /*VAGY
    const {chessId} = useParams();
     */
    const [chess,setChess] = useState([]);
    const [isPending,setPending] = useState([]);
    useEffect(() => {
        {(async () =>{
            setPending(true)
            try {
                const response = await fetch(`https://chess.sulla.hu/chess/${id}`)
                const result = await response.json();
                setChess(result);
            } 
            catch (error) {
                console.log(error);
            }
            finally{
                setPending(false);
            }
        
        })();
    }
    },[]);

    return(
        <div>
            {isPending || !chess.id ? (
                <div className='spinner-border text-danger'/>
                ) : (
                    <div className='card p-3'>
                        <h5 className='card-title'>Sakkozó neve: {chess.name}</h5>
                        <div className='lead'>Születési év: {chess.birth_date}</div>
                        <div className='lead'> Nyert vb-k száma: {chess.world_ch_won}</div>
                        <Link to={chess.profile_url ? chess.image_url : 'https://via.placeholder.com/150'} alt={chess.name} className='img-fluid' style={{maxHeight:200}}></Link>
                    </div>
                )}
        </div>
    );
}