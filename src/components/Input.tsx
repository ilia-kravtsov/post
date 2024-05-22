import React, {ChangeEvent, useState} from 'react';
import s from '../style/components/Input.module.scss'
import {Alert, Snackbar} from "@mui/material";
import {ReactTyped} from "react-typed";

type InputType = {
    dataCB: (startData: { time: string, pressure: string , volume: string}) => void
}

type Validation = {
    success: string
    error: string
}

export const Input: React.FC<InputType> = ({dataCB}) => {

    let [startData, setStartData] = useState<{time: string, pressure: string, volume: string}>({time: '', pressure: '', volume: ''});

    let [validation, setValidation] = useState<Validation>({
        error: '',
        success: '',
    })

    const timeChanger = (e: ChangeEvent<HTMLInputElement>) => {
        setStartData({...startData, time: e.currentTarget.value});
    }
    const pressureChanger = (e: ChangeEvent<HTMLInputElement>) => setStartData({...startData, pressure: e.currentTarget.value});
    const volumeChanger = (e: ChangeEvent<HTMLInputElement>) => setStartData({...startData, volume: e.currentTarget.value});

    const emptyError = (errorText: string) => {
        setValidation({...validation, error: errorText})
        setTimeout(() => {
            setValidation({...validation, error: ''})
        }, 3000)
    }

    const onCountClick = () => {
        if (startData.time === '' && startData.pressure === '' && startData.volume === '') {
            emptyError('Заполните все поля')
        } else if (startData.time === '' || startData.pressure === '' && startData.volume === '') {
            emptyError('Заполните все поля')
        } else {
            const pattern = /^([01]\d|2[0-3])[:\s][0-5]\d$/;

            if (pattern.test(startData.time)) {
                if (+startData.pressure < 260 || +startData.pressure > 300) {
                    emptyError('260 > P < 300')
                } else {
                    if (+startData.volume <= 0 || +startData.volume >= 50) {
                        emptyError('Не верно указан объём баллона')
                    } else {
                        dataCB(startData);
                        setValidation({error: '', success: 'расчёт произведён'})
                        setStartData({time: '', pressure: '', volume: ''})
                        setTimeout(() => {
                            setValidation({...validation, success: ''})
                        }, 2500)
                    }
                }
            } else {
                emptyError('Формат времени - 10:00 или 10 00')
            }
        }
    }

    return (
        <div className={s.input}>
            <h1 className={s.input__header}>
                <ReactTyped strings={["Ввод данных"]} typeSpeed={100} loop={true} backDelay={5000} />
            </h1>
            <div className={s.input__data}>
                <div className={s.input__entering}>
                    <input value={startData.time}
                           onChange={timeChanger}
                           className={s.input__timeField}
                           type={'text'}
                           maxLength={5}
                           required/>
                    <span>T вкл. формат: 10:00</span>
                </div>
                <div className={s.input__entering}>
                    <input value={startData.pressure}
                           onChange={pressureChanger}
                           className={`${s.input__timeField} ${s.input__timeField__pressure}`}
                           type={'number'}
                           min={0}
                           max={500}
                           required/>
                    <span>P min. кг/см<sup>2</sup></span>
                </div>
                <div className={s.input__entering}>
                    <input value={startData.volume}
                           onChange={volumeChanger}
                           className={s.input__timeField}
                           type={'number'}
                           min={0}
                           max={100}
                           required/>
                    <span>V<sub>б</sub> л</span>
                </div>
            </div>
            <button type={'submit'} className={s.countClick} onClick={onCountClick}>
                <span>Расчёт</span>
                <div className={s.liquid}></div>
            </button>
            <div className={s.infoBlock}>
                {<Snackbar open={!!validation.success} autoHideDuration={6000}
                           onClose={() => setValidation({...validation, success: ''})} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={() => setValidation({...validation, success: ''})} severity="success">
                        {validation.success}
                    </Alert>
                </Snackbar>}
                {<Snackbar open={!!validation.error} autoHideDuration={6000} onClose={() => setValidation({...validation, error: ''})} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <Alert onClose={() => setValidation({...validation, error: ''})} severity="error">
                        {validation.error}
                    </Alert>
                </Snackbar>}
            </div>
        </div>
    );
};

