import { useState, useEffect } from "react"


const localCache = {

}


export const useFetch = (url) => {


    const [state, setState] = useState({
        data:null,
        isLoading: true,
        hasError: false,
        error: null
    })

    useEffect(() => {
        getFetch()
        

    }, [url])

    const setLoadingState = () => { 
        setState({
            data:null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    

    const getFetch = async () => { 

        //* si la info solicitada esta en el cache

        if (localCache[url]){
            console.log('usando cache')
            setState({
                data: localCache[url],
                isLoading:false,
                hasError:false,
                error:null
            })
            return;
        }

        setLoadingState()


        //* simulando que tarda en traer datos
        //sleep 
        await new Promise( resolve => setTimeout(resolve,1500))

        const resp = await fetch(url)
        
        //* En el caso de que algo falle en la peticion 

        if( !resp.ok) {
            setState({
                data:null,
                isLoading: false,
                hasError: true,
                error: resp.statusText
            })
            return;
        }
        
        //* si es que no hay ningun fallo return data
        const data = await resp.json()
        
        setState({
            data:data,
            isLoading: false,
            hasError: false,
            error: null
        })

        //*manejo del cache, guardamos la data solicitada
        localCache[url] = data;

    }


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}

