import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ChessList = () => {
    const [loading, setLoading] = useState(true);
    const [chesses, setChesses] = useState([]);

    useEffect(() => {
        const fetchdata = async() => {
            
        
        setLoading(true);
        try{
            const response = await axios.get('http://chess.sulla.hu/chess/')
            setChesses(response.data);
        }
        catch (error){
            console.log("Hiba:",error)
        }
        finally{
            setLoading(false);
        }
    }
    fetchdata();
    },[])

    return(
        <div>
            {loading ? (
                <div className="spinner-border text-danger"></div>
            ) : (
                <div className="p-5 m-auto text-center content bg-ivory">
                    <h2>Sakkozók</h2>
                    {chesses.map((chess,index)=>(
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Sakkozó neve: {chess.name}</p>
                            <p className="text-dark">Születési éve: {chess.birth_date}</p>
                            <p className="text-dark">Nyert világbajnokságai: {chess.world_ch_won}</p>
                            <div className="card-body">
                                <Link to={chess.profile_url} target="_blank">Profil Link</Link><br/>
                                <img src={chess.image_url ? chess.image_url : 'https://via.placeholder.com/150'} alt={chess.name} className="img-fluid" style={{maxHeight: 200}}/>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}