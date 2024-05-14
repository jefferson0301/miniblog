import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery(){
    const {search} = useLocation()

    //pega o parametro da URL
    return useMemo(() => new URLSearchParams(search), [search] )
}