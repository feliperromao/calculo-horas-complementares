import { useMemo, useState } from "react"
import Head from 'next/head'

import ThemeToggle from '../components/ThemeToggle'

function Home() {
    const [proventos, setProventos] = useState('');
    const [complementares, setComplementares] = useState('');
    const [horas, setHoras] = useState(190);
    const [multiplicador, setMultiplicador] = useState(2.5);

    const valorHora = useMemo(() => {
        const value = (proventos / horas) * multiplicador
        return value || 0;
    }, [proventos, horas, multiplicador])

    const totalComplementares = useMemo(() => {
        let value = 0

        if (complementares % 1 === 0) {
            value = valorHora * complementares
        } else {
            const complementaresFloat = parseFloat(complementares).toFixed(2)
            const [horas, minutos] = complementaresFloat.split('.')
            value = (valorHora * horas) + (valorHora * minutos / 60)
        }
    
        return value || 0
    }, [valorHora, complementares])

    const totalGeral = useMemo(() => {
        const value = parseFloat(totalComplementares) + parseFloat(proventos)
        return value || 0;
    }, [totalComplementares, proventos])

    return (
        <>
            <Head>
                <title>Cálculo de Horas Complementares</title>
            </Head>
            <div className="wrapper">
                <header>
                    <h1>
                        <img src="/clock-regular.svg" alt="Relógio"/>
                        Horas Complementares
                    </h1>

                    <ThemeToggle />
                </header>

                <section className="example-section">
                    <h4>Modo de uso</h4>
                    <div>
                        <p><strong>Proventos:</strong> R$ 1.500 = 1500</p>
                        <p><strong>Horas complementares:</strong> 2 horas e 43 minutos = 2,43</p>
                    </div>
                </section>

                <form noValidate autoComplete="off" className="form">
                    <section>
                        <label htmlFor="proventos">
                            Proventos:
                            <input
                                type="number"
                                value={proventos}
                                id="proventos"
                                onChange={(e) => setProventos(e.target.value)}
                            />
                        </label>
                        <label htmlFor="complementares">
                            Horas complementares:
                            <input
                                type="number"
                                value={complementares}
                                id="complementares"
                                onChange={(e) => setComplementares(e.target.value)}
                            />
                        </label>
                        <label htmlFor="horas">
                            Carga horária:
                            <input
                                type="number"
                                value={horas}
                                id="horas"
                                onChange={(e) => setHoras(e.target.value)}
                            />
                        </label>
                        <label htmlFor="multiplicador">
                            Multiplicador:
                            <input
                                type="number"
                                value={multiplicador}
                                id="multiplicador"
                                onChange={(e) => setMultiplicador(e.target.value)}
                            />
                        </label>
                    </section>
                </form>

                <section className="results">
                    <div>
                        <h4>Valor da hora</h4>
                        <h5>R$ {valorHora.toFixed(2)}</h5>
                    </div>
                    <div>
                        <h4>Valor complementares</h4>
                        <h5>R$ {totalComplementares.toFixed(2)}</h5>
                    </div>
                    <div>
                        <h4>Valor a receber</h4>
                        <h5>R$ {totalGeral.toFixed(2)}</h5>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home