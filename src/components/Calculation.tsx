import s from '../style/components/QuickReport.module.scss';
import {ResultBlock} from "./ResultBlock";
import {Input} from "./Input";
import {timeCount} from "../utils/timeCount";
import {Fade} from "react-awesome-reveal";
import {useEffect, useState} from "react";
import {ReactTyped} from "react-typed";
import {ReportsAndTime} from "./ReportsAndTime.tsx";

type Calculation = {
    dasv: boolean
}

function Calculation(props: Calculation) {

    let installPrompt: any = null;
    const installButton = document.querySelector("#install");

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
        installButton?.removeAttribute("hidden");
    });

    function disableInAppInstallPrompt() {
        installPrompt = null;
        installButton?.setAttribute("hidden", "");
    }

    if (installPrompt) {

        installButton?.addEventListener("click", async () => {
            if (!installPrompt) {
                return;
            }
            const result = await installPrompt.prompt();
            console.log(`Install prompt was: ${result.outcome}`);
            disableInAppInstallPrompt();
        });

    }

    window.addEventListener("appinstalled", () => {
        disableInAppInstallPrompt();
    });

    let [data, setData] = useState<{ time: string, pressure: string, volume: string }>({time: '', pressure: '', volume: ''})

    useEffect(() => {
        let oldStartTime = localStorage.getItem('startTime')
        let oldStartPressure = localStorage.getItem('startPressure')
        let oldStartVolume = localStorage.getItem('startVolume')
        if (oldStartTime && oldStartPressure && oldStartVolume) {
            setData({time: oldStartTime, pressure: oldStartPressure, volume: oldStartVolume})
        }
    }, [])

    const dataCB = (startData: { time: string, pressure: string, volume: string }) => {
        localStorage.setItem('startTime', startData.time)
        localStorage.setItem('startPressure', startData.pressure)
        localStorage.setItem('startVolume', startData.volume)
        setData(startData);
    }

    const P_Max_Falling = Math.floor(+data.pressure / 3);
    const P_Exit = Math.floor(+data.pressure - P_Max_Falling);
    const Delta_T = props.dasv ? Math.floor(P_Max_Falling * +data.volume / 45) : Math.floor(P_Max_Falling * +data.volume / 2);
    const T_Exit = timeCount(data.time, `00:${Delta_T.toString()}`)
    const T_General = props.dasv ? Math.floor(+data.pressure * +data.volume / 45) : Math.floor(+data.pressure * +data.volume / 2);
    const T_Returning = timeCount(data.time, `00:${T_General.toString()}`)
    const T_Fact_Returning = timeCount(data.time, `00:30`)

    return (
        <div className={s.quickReport}>
            <Fade direction={'down'}>
                <Input dataCB={dataCB}/>
            </Fade>
            <section className={s.quickReport__output}>
                <h1 className={s.quickReport__header}>
                    <ReactTyped strings={["Вывод данных"]} typeSpeed={100} loop={true} backDelay={3000}/>
                </h1>
                <div className={s.quickReport__container}>
                    <ResultBlock title={'T вкл.'} columNumber={1} timeOn={data.time}/>
                    <ResultBlock title={'P max.пад.'} columNumber={2} P_Max_Falling={P_Max_Falling}/>
                    <ResultBlock title={'P к.вых.'} columNumber={3} P_Exit={P_Exit}/>
                    <ResultBlock title={'ΔT'} columNumber={4} Delta_T={Delta_T}/>
                    <ResultBlock title={'T вых.'} columNumber={5} T_Exit={T_Exit}/>
                    <ResultBlock title={'T общ.'} columNumber={6} T_General={T_General}/>
                    <ResultBlock title={'T возвр.'} columNumber={7} T_Returning={T_Returning}/>
                    <ResultBlock title={'T ф.возвр.'} columNumber={8} T_Fact_Returning={T_Fact_Returning}/>
                </div>
            </section>
            <Fade direction={'left'}>
                <ReportsAndTime timeOn={data.time}/>
            </Fade>
        </div>
    );
}

export default Calculation;
