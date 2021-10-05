import { useRef, useState } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    
    const [numero, setNumero] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('0');

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = (numeroTexto:string) => {

        if(numero.includes('.') && numeroTexto === '.')  return; 

        if( numero.startsWith('0') || numero.startsWith('-0')){
            
        //     // punto decimal
            if(numeroTexto === '.'){
                setNumero( numero + numeroTexto);

                // Evaluar si es otro cero, y hay un punto
            }else if(numeroTexto === '0' && numero.includes('.')){
                setNumero( numero + numeroTexto )

                // Evaluar si es diferente cero y no tiene un punto
            }else if(numeroTexto !== '0' && !numero.includes('.')){
                setNumero( numeroTexto )

                // Evitar 0000.0
            }else if(numeroTexto === '0' && !numero.includes('.')){
                setNumero( numeroTexto )
            }else{
                setNumero( numero + numeroTexto )
            }

        }else{
            setNumero(numero + numeroTexto)
        }
        
    }

    const btnEliminar = () => {

        let negativo = '';
        let numeroTemp = numero;
        if(numero.includes('-')){
            negativo = '-';
            numeroTemp = numero.substr(1);
        }

        if(numeroTemp.length > 1){          
            setNumero(negativo+numeroTemp.slice(0, -1)); 
        }else{
            setNumero('0');
        }
        
    }

    const positivoNegativo = () => {
        if( numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        }else{
            setNumero('-'+numero)
        }
    }

    const cambiarNumPorAnterior = () => {
        setNumeroAnterior(numero)
        setNumero('0')
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const calcular = () => {
        const num = Number(numero);
        const num2 = Number(numeroAnterior);
        

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${num + num2}`);
                break;
            case Operadores.restar:
                setNumero(`${num2 - num}`);
                break;
            case Operadores.multiplicar:
                setNumero(`${num * num2}`);
                break;    
            case Operadores.dividir:
                if(num === 0){
                    setNumero('No se puede divir entre cero')
                }else{
                    setNumero(`${num2 / num}`);
                }
                break;
        }
        setNumeroAnterior('0');
    }


    return{
        numero,
        numeroAnterior,
        calcular,
        armarNumero,
        btnSumar,
        btnRestar,
        btnMultiplicar,
        btnDividir,
        btnEliminar,
        limpiar,
        positivoNegativo,
    }

}
