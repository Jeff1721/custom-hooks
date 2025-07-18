import { useEffect, useState } from "react"

const localCache ={}

export const useFetch = (url) => {
 
    const [state, setState] = useState({
        data: null,
        isLoanding: true,
        hasError: false,
        error: null,
    });

    useEffect(() => {
      getFecth()
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoanding: true,
            hasError: false,
            error: null,
        })
    }

    const getFecth =  async( ) =>{

        if(localCache[url]){
            setState({
                data: localCache[url],
                isLoanding: false,
                hasError: false,
                error: null,
            })

            return;
        }


       setLoadingState(); 
       const resp = await fetch(url);

        await new Promise(resolve => setTimeout(resolve, 1500));

        //si la respuesta no se cumple
       if(!resp.ok){
        setState({
            data:null,
            isLoanding:false,
            hasError:true,
            error:{
                code: resp.status,
                message: resp.statusText
            }
            
        })
        return;
       }

       const data = await resp.json()
       setState({
        data: data,
        isLoanding: false,
        hasError:false,
        error: null,
       })

       //Manejo del cache
       localCache[url] = data;
    }
    


     return {
        data: state.data,
        isLoanding: state.isLoanding,
        hasError: state.hasError,
    }
}
