import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true){
    const ref = useRef();
  // Click outside of the modal to close it
  useEffect(function(){
    function handleClick(event){
      if(ref.current && !ref.current.contains(event.target)){
        handler();
      }
    }
    document.addEventListener('click', handleClick, listenCapturing);
    return () => removeEventListener('click', handleClick, listenCapturing);
  },[handler]);
  return {ref};
}